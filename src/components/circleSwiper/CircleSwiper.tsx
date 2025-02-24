import React, { useEffect, useState } from "react";
import { CircleService } from "../../services/circle.service";
import { CircleStatus } from "../../app/generated/api";
import useCurrentUser from "../../app/hooks/useCurrentUser";
import "./CircleSwiper.css";
import CircleCard from "../CircleCard/CircleCard";
import { IonImg, IonText } from "@ionic/react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "@ionic/react/css/ionic-swiper.css";
// Import Swiper modules
import { Pagination } from "swiper/modules";

interface CircleSwiperProps {
  circleStatus: CircleStatus;
}

const CircleSwiper: React.FC<CircleSwiperProps> = ({ circleStatus }) => {
  const currentUser = useCurrentUser();
  const [circles, setCircles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCircles = async () => {
      if (!currentUser) return;

      try {
        const data = await CircleService.getUserCircles(currentUser.id, circleStatus);
        setCircles(data);
      } catch (error) {
        console.error(`Error fetching ${circleStatus} circles:`, error);
      } finally {
        setLoading(false);
      }
    };

    fetchCircles().then();
  }, [currentUser, circleStatus]);

  if (loading) {
    return <IonText>Loading...</IonText>;
  }

  if (circles.length === 0) {
    return (
      <div className="ion-text-center">
        <IonImg src="/assets/cloud-trans.png" alt="No active circles" className="no-circles__image" />
        <IonText>Your {circleStatus.toLowerCase()} circles will appear here!</IonText>
      </div>
    );
  }

  return (
    <div className="circle-swiper">
      <Swiper spaceBetween={16} slidesPerView={1} navigation pagination={{ clickable: true }} modules={[Pagination]}>
        {circles.map(
          (circle) =>
            currentUser && (
              <SwiperSlide key={circle.id}>
                <CircleCard circle={circle} currentUserId={currentUser.id} />
              </SwiperSlide>
            ),
        )}
      </Swiper>
    </div>
  );
};

export default CircleSwiper;
