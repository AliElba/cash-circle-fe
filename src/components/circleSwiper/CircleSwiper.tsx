import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { IonText } from "@ionic/react";
import CircleCard from "../CircleCard/CircleCard";
import { CircleService } from "../../services/circle.service";
import { CircleStatus } from "../../app/generated/api";
import useCurrentUserId from "../../app/hooks/useCurrentUserId";
import "./CircleSwiper.css";

interface CircleSwiperProps {
  circleStatus: CircleStatus;
}

const CircleSwiper: React.FC<CircleSwiperProps> = ({ circleStatus }) => {
  const currentUserId = useCurrentUserId();
  const [circles, setCircles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCircles = async () => {
      if (!currentUserId) return;

      try {
        const data = await CircleService.getUserCircles(currentUserId, circleStatus);
        setCircles(data);
      } catch (error) {
        console.error(`Error fetching ${circleStatus} circles:`, error);
      } finally {
        setLoading(false);
      }
    };

    fetchCircles().then();
  }, [currentUserId, circleStatus]);

  return (
    <div className="circle-swiper">
      {loading ? (
        <IonText>Loading...</IonText>
      ) : circles.length === 0 ? (
        <IonText>No circles found</IonText>
      ) : (
        <Swiper spaceBetween={30} slidesPerView={1} pagination={{ clickable: true }}>
          {circles.map(
            (circle) =>
              currentUserId && (
                <SwiperSlide key={circle.id}>
                  <CircleCard circle={circle} userId={currentUserId} />
                </SwiperSlide>
              ),
          )}
        </Swiper>
      )}
    </div>
  );
};

export default CircleSwiper;
