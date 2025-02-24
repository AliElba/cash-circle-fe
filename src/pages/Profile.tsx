import "./payments/Payments.scss";
import React from "react";
import LogoutButton from "../components/logout/LogoutButton";
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";

const Profile: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h2>Welcome to your profile</h2>
        <LogoutButton />
      </IonContent>
    </IonPage>
  );
};

export default Profile;
