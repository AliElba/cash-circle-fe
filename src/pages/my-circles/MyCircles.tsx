import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./MyCircles.scss";
import React from "react";
import { CircleStatus } from "../../app/generated/api";
import { addCircle } from "ionicons/icons";
import { useHistory } from "react-router";
import CircleSwiper from "../../components/circle-swiper/CircleSwiper";

const MyCircles: React.FC = () => {
  const history = useHistory();
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>My Circles</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <div className="page-header-actions">
          <IonButton fill="solid" color="primary" size="small" onClick={() => history.push("/circle/create")}>
            Create Circle
            <IonIcon slot="end" icon={addCircle} />
          </IonButton>
        </div>

        <div className="header">
          <IonText className="ion-text-subtitle">Active Circles</IonText>
        </div>
        <CircleSwiper circleStatus={CircleStatus.Active} />

        <div className="header">
          <IonText className="ion-text-subtitle">Pending Circles</IonText>
        </div>
        <CircleSwiper circleStatus={CircleStatus.Pending} />

        <div className="header">
          <IonText className="ion-text-subtitle">Completed Circles</IonText>
        </div>
        <CircleSwiper circleStatus={CircleStatus.Completed} />
      </IonContent>
    </IonPage>
  );
};

export default MyCircles;
