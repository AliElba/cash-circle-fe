import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import "./Home.scss";
import React from "react";
import CircleCard from "../../components/CircleCard/CircleCard";

const Home: React.FC = () => {
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
        <CircleCard
          totalAmount="24,000"
          monthlyAmount="2,000"
          adminFees="2,880 EGP"
          duration={12} // 12 months
          startDate="Dec 2024"
          endDate="Nov 2025"
          yourTurn={12} // 3rd turn
        />
      </IonContent>
    </IonPage>
  );
};

export default Home;
