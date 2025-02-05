import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import "./Payments.scss";
import PageHeader from "../components/back-button/PageHeader";
import React from "react";

const Profile: React.FC = () => {
  return (
    <IonPage>
      <PageHeader title="Profile" />

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Profile</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Profile page" />
      </IonContent>
    </IonPage>
  );
};

export default Profile;
