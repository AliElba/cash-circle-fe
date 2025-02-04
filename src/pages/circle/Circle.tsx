import React, { useEffect, useState } from "react";
import {
  IonButton,
  IonContent,
  IonDatetime,
  IonDatetimeButton,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonModal,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useHistory, useParams } from "react-router";
import "./Circle.scss";
import { CircleService } from "../../services/circle.service";
import useCurrentUserId from "../../app/hooks/useCurrentUserId";
import { CircleStatus, MemberDto } from "../../app/generated/api";
import { RouteConstants } from "../../constants/constants";

const calculateEndDate = (startDate: string, duration: number) => {
  if (!startDate) return "";
  const start = new Date(startDate);
  start.setMonth(start.getMonth() + duration);
  return start.toISOString().split("T")[0]; // Format YYYY-MM-DD
};

const DEFAULT_DURATION = 6;
const MIN_AMOUNT = 1000;
const TODAY_FORMATED = new Date().toISOString().split("T")[0]; // Format YYYY-MM-DD

const CreateCircle: React.FC = () => {
  const currentUserId = useCurrentUserId();
  const history = useHistory();

  const { circleId } = useParams<{ circleId?: string }>(); // Detect if editing
  const [swiper, setSwiper] = useState<any>(null);
  const [form, setForm] = useState({
    name: "",
    amount: MIN_AMOUNT,
    duration: DEFAULT_DURATION,
    slotNumber: 1,
    startDate: TODAY_FORMATED,
    endDate: calculateEndDate(TODAY_FORMATED, DEFAULT_DURATION),
    status: CircleStatus.Pending as CircleStatus,
    ownerId: currentUserId || "", // Default to current user
    members: [] as MemberDto[],
  });

  // Fetch circle data if editing and url has circleId
  useEffect(() => {
    if (circleId) {
      const fetchCircle = async () => {
        try {
          const data = await CircleService.getCircleById(circleId);
          if (!data) {
            console.error("Circle not found");
            return;
          }
          setForm({
            name: data.name,
            startDate: data.startDate,
            endDate: data.endDate,
            status: data.status,
            ownerId: currentUserId as string,

            amount: data.amount,
            duration: data.duration,
            slotNumber: data.members[0].slotNumber,
            members: (data.members || []) as MemberDto[],
          });
        } catch (error) {
          console.error("Error fetching circle:", error);
        }
      };
      fetchCircle().then();
    }
  }, [circleId]);

  const updateForm = (field: string, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!form.ownerId) {
      console.error("Owner ID is missing!");
      return;
    }

    try {
      if (circleId) {
        await CircleService.updateCircle(circleId, form as any);
      } else {
        await CircleService.createCircle(form);
      }
      history.push(RouteConstants.circleRelative);
    } catch (error) {
      console.error("Error saving circle:", error);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{circleId ? "Edit Circle" : "Create Circle"}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <Swiper
          className="swiper__container"
          onSwiper={setSwiper}
          spaceBetween={50}
          slidesPerView={1}
          allowTouchMove={false}>
          <SwiperSlide>
            <div className="swiper__slide-container">
              <div className="swiper__slide-content">
                <IonItem lines="full">
                  <IonInput
                    type="text"
                    placeholder="Enter Circle Name"
                    value={form.name}
                    onIonChange={(e) => updateForm("name", e.detail.value!)}></IonInput>
                </IonItem>

                <h2 className="text-start">How much do you want?</h2>
                <p className="text-start fs-6">
                  Enter amount from <strong>1,000 CHF</strong> to <strong>10,000 CHF</strong>
                </p>

                <IonItem lines="full">
                  <IonInput
                    type="number"
                    placeholder="Enter Amount"
                    value={form.amount}
                    min={1000}
                    max={10000}
                    onIonChange={(e) => updateForm("amount", parseInt(e.detail.value!, 10))}
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
                    min={new Date().toISOString()} // Set minimum date to today
                    max={new Date(new Date().setFullYear(new Date().getFullYear() + 2)).toISOString()} // Set maximum date to 10 years from today
                    onIonChange={(e) => {
                      const selectedDate = e.detail.value! as string;
                      const date = new Date(selectedDate);
                      const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-01`; // Format YYYY-MM-01
                      updateForm("startDate", formattedDate);
                      updateForm("endDate", calculateEndDate(formattedDate, form.duration));
                    }}
                  />
                </IonModal>

                <div className="my-4">
                  <h4 className="text-start">Choose Duration</h4>
                  <div className="duration-options">
                    {[6, 10, 12].map((month) => (
                      <div
                        key={month}
                        className={`duration-card ${form.duration === month ? "selected" : ""}`}
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
                  disabled={!form.amount || form.amount < MIN_AMOUNT || !form.name || !form.startDate}>
                  Next: Select Payout Slot
                </IonButton>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="step">
              <h2>Choose Your Payout Slot</h2>
              <IonItem>
                <IonLabel>Slot</IonLabel>
                {/*<IonSelect value={form.slotNumber} onIonChange={(e) => updateForm("slotNumber", e.detail.value)}>*/}
                {/*  {[...Array(parseInt(form.duration))].map((_, index) => (*/}
                {/*    <IonSelectOption key={index} value={index + 1}>*/}
                {/*      Slot {index + 1}*/}
                {/*    </IonSelectOption>*/}
                {/*  ))}*/}
                {/*</IonSelect>*/}
              </IonItem>

              <IonButton onClick={() => swiper.slideNext()} expand="block">
                Next: Add Members
              </IonButton>
              <IonButton onClick={() => swiper.slidePrev()} expand="block" color="light">
                Back
              </IonButton>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            {/*<MemberSelectionSlide form={form} updateForm={updateForm} />*/}
            <IonButton onClick={() => swiper.slideNext()} expand="block">
              Next: Review & Confirm
            </IonButton>
          </SwiperSlide>

          <SwiperSlide>
            {/*<ReviewCircleSlide form={form} />*/}
            <IonButton onClick={handleSubmit} expand="block">
              {circleId ? "Update Circle" : "Confirm & Create Circle"}
            </IonButton>
          </SwiperSlide>
        </Swiper>
      </IonContent>
    </IonPage>
  );
};

export default CreateCircle;
