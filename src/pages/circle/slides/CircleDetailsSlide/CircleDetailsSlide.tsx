import React from "react";
import { IonButton, IonDatetime, IonDatetimeButton, IonInput, IonItem, IonLabel, IonModal } from "@ionic/react";
import { CircleForm } from "../../Circle";

const calculateEndDate = (startDate: string, duration: number) => {
  if (!startDate) return "";
  const start = new Date(startDate);
  start.setMonth(start.getMonth() + duration);
  return start.toISOString().split("T")[0]; // Format YYYY-MM-DD
};

export interface CircleSlideProps {
  form: CircleForm;
  updateForm: (field: string, value: any) => void;
  swiper: any;
}

const CircleDetailsSlide: React.FC<CircleSlideProps> = ({ form, updateForm, swiper }) => {
  return (
    <div className="swiper__slide-container">
      <div className="swiper__slide-content">
        <IonItem lines="full">
          <IonInput
            label="Circle Name"
            labelPlacement="floating"
            fill="solid"
            type="text"
            placeholder="Enter Circle Name"
            required={true}
            value={form.name}
            onIonChange={(e) => updateForm("name", e.detail.value!)}></IonInput>
        </IonItem>

        <h2 className="text-start">How much do you want?</h2>
        <p className="text-start fs-6">
          Enter amount from <strong>1,000 CHF</strong> to <strong>10,000 CHF</strong>
        </p>

        <IonItem lines="full">
          <IonInput
            label="Amount"
            placeholder="Enter Amount"
            labelPlacement="floating"
            fill="solid"
            type="number"
            value={form.amount}
            min={1000}
            max={10000}
            onIonInput={(e) => updateForm("amount", parseInt(e.detail.value!, 10))}
          />
          <span className="currency">CHF</span>
        </IonItem>

        <IonItem lines="full">
          <IonLabel>Start Date</IonLabel>
          <IonDatetimeButton datetime="startDatePicker"></IonDatetimeButton>
        </IonItem>
        <IonModal keepContentsMounted={true}>
          <IonDatetime
            id="startDatePicker"
            presentation="month-year"
            value={form.startDate}
            onIonChange={(e) => {
              const selectedDate = e.detail.value! as string;
              const date = new Date(selectedDate);
              const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-01`; // YYYY-MM-01
              updateForm("startDate", formattedDate);
              updateForm("endDate", calculateEndDate(formattedDate, form.duration));
            }}
          />
        </IonModal>

        <div className="my-4">
          <h4 className="text-start">Choose Duration</h4>
          <div className="selection-card__container">
            {[6, 10, 12].map((month) => (
              <div
                key={month}
                className={`selection-card ${form.duration === month ? "selected" : ""}`}
                onClick={() => {
                  updateForm("duration", month);
                  updateForm("endDate", calculateEndDate(form.startDate, month));
                }}>
                <span className="duration-text">{month} Months</span>
                <span className="separator"></span>
                <span className="amount-text">
                  {(form.amount / month).toFixed(0)} <br /> CHF/mo
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* End date is disabled as it should be auto calculated from the start date and the duration */}
        <IonItem lines="full">
          <IonLabel>End Date</IonLabel>
          <IonDatetimeButton datetime="endDatePicker" />
        </IonItem>
        <IonModal keepContentsMounted={true}>
          <IonDatetime id="endDatePicker" presentation="month-year" value={form.endDate} disabled />
        </IonModal>
      </div>

      <div className="swiper__footer">
        <IonButton
          onClick={() => swiper.slideNext()}
          expand="block"
          disabled={!form.amount || form.amount < 1000 || form.amount > 10000 || !form.startDate}>
          Next: Select Payout Month
        </IonButton>
      </div>
    </div>
  );
};

export default CircleDetailsSlide;
