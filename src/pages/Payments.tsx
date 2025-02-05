import { IonButton, IonContent, IonPage } from "@ionic/react";
import "./Payments.scss";
import React from "react";
import PageHeader from "../components/back-button/PageHeader";

const Payments: React.FC = () => {
  return (
    <IonPage>
      <PageHeader title="Payments" />

      <IonContent>
        <div style={{ textAlign: "center", padding: "16px" }}>
          <h3>You don’t have any payments due yet</h3>
          <IonButton expand="block" color="primary">
            Join a Circle
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Payments;
