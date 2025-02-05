import React, { useEffect, useState } from "react";
import { IonButton, IonContent, IonItem, IonLabel, IonPage } from "@ionic/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useHistory, useParams } from "react-router";
import "./Circle.scss";
import { CircleService } from "../../services/circle.service";
import useCurrentUserId from "../../app/hooks/useCurrentUserId";
import { CircleStatus, MemberDto } from "../../app/generated/api";
import { RouteConstants } from "../../constants/constants";
import CircleDetailsSlide from "./slides/CircleDetailsSlide";
import SlotSelectionSlide from "./slides/SlotSelectionSlide";
import PageHeader from "../../components/back-button/PageHeader";

const calculateEndDate = (startDate: string, duration: number) => {
  if (!startDate) return "";
  const start = new Date(startDate);
  start.setMonth(start.getMonth() + duration);
  return start.toISOString().split("T")[0]; // Format YYYY-MM-DD
};

const DEFAULT_DURATION = 6;
const MIN_AMOUNT = 1000;
const TODAY_FORMATED = new Date().toISOString().split("T")[0]; // Format YYYY-MM-DD

const Circle: React.FC = () => {
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
      <PageHeader title={circleId ? "Edit Circle" : "Create Circle"} />

      <IonContent>
        <Swiper
          className="swiper__container"
          onSwiper={setSwiper}
          spaceBetween={50}
          slidesPerView={1}
          allowTouchMove={false}>
          <SwiperSlide>
            <CircleDetailsSlide form={form} updateForm={updateForm} swiper={swiper} />
          </SwiperSlide>

          <SwiperSlide>
            <SlotSelectionSlide form={form} updateForm={updateForm} swiper={swiper} />
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

export default Circle;
