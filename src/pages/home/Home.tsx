import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Home.scss";
import React, { useEffect, useState } from "react";
import { CircleService } from "../../services/circle.service";
import useCurrentUser from "../../app/hooks/useCurrentUser";
import { useHistory } from "react-router";
import { RouteConstants } from "../../constants/constants";
import { CircleStatus } from "../../app/generated/api";
import CircleSwiper from "../../components/circle-swiper/CircleSwiper";

const Home: React.FC = () => {
  const history = useHistory();
  const currentUser = useCurrentUser();
  const currentUserId = currentUser?.id;

  const [userCircles, setUserCircles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserCircles = async () => {
      if (!currentUserId) return; // Wait for user to be available

      try {
        // Fetch only active user circles
        const circles = await CircleService.getUserCircles(currentUserId, CircleStatus.Active);
        setUserCircles(circles);
      } catch (error) {
        console.error("Error fetching user circles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserCircles().then();
  }, [currentUserId]); // Re-fetch circles when the user changes

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div className="header">
          <IonText className="ion-text-subtitle">My Circles</IonText>

          <IonButton
            fill="clear"
            color="primary"
            size="small"
            onClick={() => history.push(RouteConstants.circleRelative)}>
            See all
          </IonButton>
        </div>

        <CircleSwiper circleStatus={CircleStatus.Active} />
      </IonContent>
    </IonPage>
  );
};

export default Home;
