import { IonContent, IonPage, useIonToast } from "@ionic/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useHistory, useParams } from "react-router";
import "./Circle.scss";
import { CircleService } from "../../services/circle.service";
import useCurrentUser from "../../app/hooks/useCurrentUser";
import {
  type CircleMemberPayload,
  CircleStatus,
  CreateCircleDto,
  MemberDto,
  MemberStatus,
  UpdateCircleDto,
} from "../../app/generated/api";
import { RouteConstants } from "../../constants/constants";
import CircleDetailsSlide from "./slides/CircleDetailsSlide/CircleDetailsSlide";
import SlotSelectionSlide from "./slides/SlotSelectionSlide/SlotSelectionSlide";
import PageHeader from "../../components/back-button/PageHeader";
import SlideIndicator from "./slides/SlideIndicator/SlideIndicator";
import MemberSelectionSlide from "./slides/MemberSelectionSlide/MemberSelectionSlide";
import ReviewCircleSlide from "./slides/ReviewCircleSlide/ReviewCircleSlide";
import { useEffect, useState } from "react";
import { calcAdminFees, getUserPayoutDate } from "../../app/helpers/circle-helper";

export type CircleForm = {
  id?: string;
  name: string;
  amount: number;
  duration: number;
  slotNumber?: number;
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
export const SLIDE_TITLES = ["Circle Details", "Payout Month", "Members Selection", "Review & Confirm"];

const Circle: React.FC = () => {
  const currentUser = useCurrentUser();
  const currentUserId = currentUser?.id;
  const history = useHistory();
  const [present] = useIonToast();

  const { circleId } = useParams<{ circleId?: string }>(); // Detect if edit mode and id exists
  const [activeIndex, setActiveIndex] = useState(0); // zero index steps
  const [swiper, setSwiper] = useState<any>(null);
  const [form, setForm] = useState<CircleForm>({
    // Circle details
    id: circleId,
    name: `Circle-${Date.now()}`,
    amount: MIN_AMOUNT,
    duration: DEFAULT_DURATION,
    startDate: TODAY_FORMATED,
    endDate: calculateEndDate(TODAY_FORMATED, DEFAULT_DURATION),
    status: CircleStatus.Pending,

    // member details
    slotNumber: 1,

    // relations
    members: [] as CircleMemberPayload[],
    ownerId: currentUserId || "", // Default to current user
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
            id: data.id,
            name: data.name,
            startDate: data.startDate,
            endDate: data.endDate,
            status: data.status,
            amount: data.amount,
            duration: data.duration,
            // Slot number of the current user
            slotNumber: data.members.find((member) => member.userId === currentUserId)?.slotNumber || undefined,
            members: data.members || [],
            ownerId: currentUserId || "",
          });
        } catch (error) {
          console.error("Error fetching circle:", error);
        }
      };
      fetchCircle().then();
    }
  }, [circleId]);

  const updateFormField = (field: string, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!form.ownerId) {
      console.error("Owner ID is missing!");
      return;
    }

    try {
      const currentMember = form.members.find((member) => member.userId === currentUserId)!;
      const currentMemberDto: MemberDto = {
        id: currentMember?.id,
        userId: currentMember?.userId,
        phone: currentMember.user.phone,
        // Current user can change the slot number for himself, so also payout date will be updated
        slotNumber: form.slotNumber!,
        payoutDate: getUserPayoutDate(form.startDate, form.slotNumber!).toISOString(), // Format YYYY-MM-DD,

        // Set the member status of the current user by default to Confirmed
        status: MemberStatus.Confirmed,

        // calculate the admin fees from the total circle amount
        adminFees: calcAdminFees(form.amount),

        paymentStatus: currentMember.paymentStatus,
      };

      if (circleId) {
        const updateCircleDto: UpdateCircleDto = {
          name: form.name,
          amount: form.amount,
          duration: form.duration,
          startDate: form.startDate,
          endDate: form.endDate,
          members: form.members.map((member) => {
            if (member.userId === currentUserId) {
              return currentMemberDto;
            }
            return {
              id: member?.id,
              userId: member?.userId,
              phone: member.user.phone,
              slotNumber: member.slotNumber,
              payoutDate: member.payoutDate,
              status: member.status,
              paymentStatus: member.paymentStatus,
              adminFees: calcAdminFees(form.amount),
            };
          }),
        };

        await CircleService.updateCircle(circleId, updateCircleDto);

        // Show success toast
        await present({
          message: "Circle updated successfully!",
          duration: 2000,
          position: "top",
          color: "success",
        });

        // ✅ Navigate to "My Circles" after a short delay
        setTimeout(() => {
          history.push(RouteConstants.circleRelative, "root");
        }, 2000);
      } else {
        const createCircleDto: CreateCircleDto = {
          name: form.name,
          amount: form.amount,
          duration: form.duration,
          startDate: form.startDate,
          endDate: form.endDate,
          status: form.status,
          ownerId: form.ownerId,
          members: form.members.map((member) => {
            if (member.userId === currentUserId) {
              return currentMemberDto;
            }
            return {
              id: member?.id,
              userId: member?.userId,
              phone: member.user.phone,
              slotNumber: member.slotNumber,
              payoutDate: member.payoutDate,
              status: member.status,
              paymentStatus: member.paymentStatus,
              adminFees: calcAdminFees(form.amount),
            };
          }),
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
            <SlideIndicator
              swiper={swiper}
              activeIndex={activeIndex}
              slideTitles={SLIDE_TITLES}
              disabledSteps={
                !form.amount || form.amount < 1000 || form.amount > 10000 || !form.startDate ? [1, 2, 3] : []
              }
            />
            <CircleDetailsSlide form={form} updateForm={updateFormField} swiper={swiper} />
          </SwiperSlide>
          <SwiperSlide>
            <SlideIndicator
              swiper={swiper}
              activeIndex={activeIndex}
              slideTitles={SLIDE_TITLES}
              disabledSteps={!form.slotNumber ? [2, 3] : []}
            />
            <SlotSelectionSlide form={form} updateForm={updateFormField} swiper={swiper} />
          </SwiperSlide>
          <SwiperSlide>
            <SlideIndicator swiper={swiper} activeIndex={activeIndex} slideTitles={SLIDE_TITLES} />
            <MemberSelectionSlide form={form} updateForm={updateFormField} swiper={swiper} />
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
