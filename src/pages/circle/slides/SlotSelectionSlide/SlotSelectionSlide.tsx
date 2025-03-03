import React, { useEffect, useState } from "react";
import { IonButton, IonChip, IonSegment, IonSegmentButton, IonText } from "@ionic/react";
import "./SlotSelectionSlide.scss";
import { CircleSlideProps } from "../CircleDetailsSlide/CircleDetailsSlide";
import { calcAdminFees } from "../../../../app/helpers/circle-helpers";
import useCurrentUser from "../../../../app/hooks/useCurrentUser";

enum SlotCategory {
  FIRST = "First Slots",
  MIDDLE = "Middle Slots",
  LAST = "Last Slots",
}

const generateAvailableSlots = (startDate: string, duration: number, totalAmount: number) => {
  if (!startDate || duration <= 0)
    return { [SlotCategory.FIRST]: [], [SlotCategory.MIDDLE]: [], [SlotCategory.LAST]: [] };

  const start = new Date(startDate);
  let slots = [];

  for (let i = 0; i < duration; i++) {
    let slotDate = new Date(start);
    slotDate.setMonth(start.getMonth() + i);

    slots.push({
      id: i + 1,
      month: slotDate.toLocaleString("default", { month: "short" }),
      year: slotDate.getFullYear(),
      fees: calcAdminFees(totalAmount),
    });
  }

  const splitSize = Math.ceil(slots.length / 3);
  return {
    [SlotCategory.FIRST]: slots.slice(0, splitSize),
    [SlotCategory.MIDDLE]: slots.slice(splitSize, splitSize * 2),
    [SlotCategory.LAST]: slots.slice(splitSize * 2),
  };
};

const SlotSelectionSlide: React.FC<CircleSlideProps> = ({ form, updateForm, swiper }) => {
  const currentUser = useCurrentUser();
  const currentUserId = currentUser?.id;
  const [selectedCategory, setSelectedCategory] = useState<SlotCategory>(SlotCategory.FIRST);
  const [availableSlots, setAvailableSlots] = useState<Record<SlotCategory, any[]>>({
    [SlotCategory.FIRST]: [],
    [SlotCategory.MIDDLE]: [],
    [SlotCategory.LAST]: [],
  });

  /**
   * Generate available slots/Categories based on the form data.
   * It recalculates the slots whenever the startDate, duration, or amount changes.
   */
  useEffect(() => {
    const slotsByCategory = generateAvailableSlots(form.startDate, form.duration, form.amount);
    setAvailableSlots(slotsByCategory);
  }, [form.startDate, form.duration, form.amount]);

  /**
   * Automatically select the correct category if `form.slotNumber` exists
   */
  useEffect(() => {
    if (!form.slotNumber) return;

    // Determine which category contains the selected slotNumber
    let foundCategory: SlotCategory | null = null;
    for (const [category, slots] of Object.entries(availableSlots)) {
      if (slots.some((slot) => slot.id === form.slotNumber)) {
        foundCategory = category as SlotCategory;
        break;
      }
    }

    if (foundCategory) {
      setSelectedCategory(foundCategory);
    }
  }, [form.slotNumber, availableSlots]);

  /**
   * Handle slot selection, updating both `form.slotNumber` and the current user's `slotNumber`
   */
  const handleSlotSelection = (selectedSlotId: number) => {
    updateForm("slotNumber", selectedSlotId);

    // Update the current user's slot number in the members list
    const updatedMembers = form.members.map((member) =>
      member.userId === currentUserId ? { ...member, slotNumber: selectedSlotId } : member,
    );

    updateForm("members", updatedMembers);
  };

  return (
    <div className="slot-selection-slide swiper__slide-container">
      <div className="swiper__slide-content">
        <h2>Choose your payout month:</h2>
        <p className="text-start fs-6 ion-color-medium">
          Payouts are received <strong>between 15th and 30th</strong> of the payout month.
        </p>

        {/* Category Selection */}
        <IonSegment value={selectedCategory} onIonChange={(e) => setSelectedCategory(e.detail.value as SlotCategory)}>
          {Object.values(SlotCategory).map((category) => (
            <IonSegmentButton key={category} value={category}>
              {category}
            </IonSegmentButton>
          ))}
        </IonSegment>

        {/* Slot Cards */}
        <div className="selection-card__container">
          {availableSlots[selectedCategory]?.map((slot) => (
            <div
              key={slot.id}
              className={`selection-card ${form.slotNumber === slot.id ? "selected" : ""}`}
              onClick={() => handleSlotSelection(slot.id)}>
              <div>
                <IonChip color="dark">{slot.id}st</IonChip>{" "}
              </div>

              <IonText className="fw-bold">
                {slot.month} {slot.year}{" "}
              </IonText>

              <div className="separator"></div>
              <IonText color="primary" className="fee-amount d-flex">
                {`${slot.fees} CHF `} <span className="fee-label"> Fees</span>
              </IonText>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="member-selection-slide-footer">
        <div className="footer-summary">
          <div className="summary-item">
            <IonText color="medium">Total Payout</IonText>
            <IonText className="summary-value">{form.amount.toLocaleString()} EGP</IonText>
          </div>
          <div className="summary-item">
            <IonText color="medium">Installment</IonText>
            <IonText className="summary-value">{(form.amount / form.duration).toLocaleString()} EGP</IonText>
          </div>
          <div className="summary-item">
            <IonText color="medium">Duration</IonText>
            <IonText className="summary-value">{form.duration} Months</IonText>
          </div>
        </div>

        <IonButton expand="block" disabled={!form.slotNumber} onClick={() => swiper.slideNext()}>
          Next: Add members
        </IonButton>
      </div>
    </div>
  );
};

export default SlotSelectionSlide;
