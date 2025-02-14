import { IonContent, IonPage } from "@ionic/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useHistory, useParams } from "react-router";
import "./Circle.scss";
import { CircleService } from "../../services/circle.service";
import useCurrentUserId from "../../app/hooks/useCurrentUserId";
import { type CircleMemberPayload, CircleStatus, CreateCircleDto, MemberStatus } from "../../app/generated/api";
import { RouteConstants } from "../../constants/constants";
import CircleDetailsSlide from "./slides/CircleDetailsSlide/CircleDetailsSlide";
import SlotSelectionSlide from "./slides/SlotSelectionSlide/SlotSelectionSlide";
import PageHeader from "../../components/back-button/PageHeader";
import SlideIndicator from "./slides/SlideIndicator/SlideIndicator";
import MemberSelectionSlide from "./slides/MemberSelectionSlide/MemberSelectionSlide";
import ReviewCircleSlide from "./slides/ReviewCircleSlide/ReviewCircleSlide";
import { useEffect, useState } from "react";

export type CircleForm = {
  name: string;
  amount: number;
  duration: number;
  slotNumber: number;
  startDate: string;
  endDate: string;
  status: CircleStatus;
  ownerId: string;
  members: CircleMemberPayload[];
};

const calculateEndDate = (startDate: string, duration: number) => {
  if (!startDate) return "";
  const start = new Date(startDate);
  start.setMonth(start.getMonth() + duration);
  return start.toISOString().split("T")[0]; // Format YYYY-MM-DD
};

const DEFAULT_DURATION = 6;
const MIN_AMOUNT = 1000;
const TODAY_FORMATED = new Date().toISOString().split("T")[0]; // Format YYYY-MM-DD
export const SLIDE_TITLES = ["Circle Details", "Payout Month", "Add Members", "Review & Confirm"];

const Circle: React.FC = () => {
  const currentUserId = useCurrentUserId();
  const history = useHistory();

  const [activeIndex, setActiveIndex] = useState(0);
  const { circleId } = useParams<{ circleId?: string }>(); // Detect if editing
  const [swiper, setSwiper] = useState<any>(null);
  const [form, setForm] = useState<CircleForm>({
    name: `Circle-${Date.now()}`,
    amount: MIN_AMOUNT,
    duration: DEFAULT_DURATION,
    slotNumber: 1,
    startDate: TODAY_FORMATED,
    endDate: calculateEndDate(TODAY_FORMATED, DEFAULT_DURATION),
    status: CircleStatus.Pending as CircleStatus,
    ownerId: currentUserId || "", // Default to current user
    members: [] as CircleMemberPayload[],
  });

  useEffect(() => {
    if (!currentUserId) {
      console.log("Waiting for user ID...");
    } else {
      console.log("User ID set:", currentUserId);
    }
  }, [currentUserId]);

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
            members: (data.members || []) as CircleMemberPayload[],
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
        const createCircleDto: CreateCircleDto = {
          name: form.name,
          amount: form.amount,
          duration: form.duration,
          startDate: form.startDate,
          endDate: form.endDate,
          status: form.status,
          ownerId: form.ownerId,
          members: form.members.map((member) => ({
            id: member?.id,
            userId: member?.userId,
            phone: member.user.phone,
            slotNumber: member.slotNumber,
            status: member.status as MemberStatus,
            paymentStatus: member.paymentStatus,
            payoutDate: member.payoutDate,
            adminFees: member.adminFees,
          })),
        };
        const createdCircle = await CircleService.createCircle(createCircleDto);

        history.push({
          pathname: RouteConstants.circleCongratulationsRelative,
          state: { circle: createdCircle },
        });
      }
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
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)} // Ensures re-render
          spaceBetween={50}
          slidesPerView={1}
          allowTouchMove={false}>
          <SwiperSlide>
            <SlideIndicator swiper={swiper} activeIndex={activeIndex} slideTitles={SLIDE_TITLES} />
            <CircleDetailsSlide form={form} updateForm={updateForm} swiper={swiper} />
          </SwiperSlide>
          <SwiperSlide>
            <SlideIndicator swiper={swiper} activeIndex={activeIndex} slideTitles={SLIDE_TITLES} />
            <SlotSelectionSlide form={form} updateForm={updateForm} swiper={swiper} />
          </SwiperSlide>
          <SwiperSlide>
            <SlideIndicator swiper={swiper} activeIndex={activeIndex} slideTitles={SLIDE_TITLES} />
            <MemberSelectionSlide form={form} updateForm={updateForm} swiper={swiper} />
          </SwiperSlide>
          <SwiperSlide>
            <ReviewCircleSlide form={form} swiper={swiper} handleSubmit={handleSubmit} />
          </SwiperSlide>
        </Swiper>
      </IonContent>
    </IonPage>
  );
};

export default Circle;
