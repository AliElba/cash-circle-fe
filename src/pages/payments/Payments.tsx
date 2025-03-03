import React from "react";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonImg,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useHistory } from "react-router";
import "./Payments.scss";
import { RouteConstants } from "../../constants/constants";

const Payments: React.FC = () => {
  const history = useHistory();
  const hasPaymentsDue = false; // Replace with real condition

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>My Payments</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div className="payments-page ion-padding">
          {/* Empty State */}
          {!hasPaymentsDue && (
            <div className="empty-state">
              <IonImg src="/assets/not-found-person-trans.png" alt="No payments due" className="empty-state__image" />
              <div className="empty-state__title">
                <IonText color="dark">You don’t have any payments due yet</IonText>
              </div>
              <div className="empty-state__description">
                <IonText color="medium">
                  Your due payments and your balance will appear here after you join a circle.
                </IonText>
              </div>
              <div className="ion-text-center">
                <div style={{ width: "50%", margin: "0 auto" }}>
                  <IonButton expand="block" color="primary" onClick={() => history.push(RouteConstants.circleRelative)}>
                    Join a circle →
                  </IonButton>
                </div>
              </div>
            </div>
          )}

          {/* Other Payment Options */}
          <div className="payment-options">
            <IonText color="dark" className="section-title">
              Others
            </IonText>
            <IonGrid>
              <IonRow>
                <IonCol size="6">
                  <IonCard button onClick={() => history.push("/payout-eligibility")}>
                    <IonCardContent>Payout Eligibility</IonCardContent>
                  </IonCard>
                </IonCol>
                <IonCol size="6">
                  <IonCard button>
                    <IonCardContent color="medium">Payment Settings</IonCardContent>
                  </IonCard>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="6">
                  <IonCard button>
                    <IonCardContent color="medium">Payment History</IonCardContent>
                  </IonCard>
                </IonCol>
                <IonCol size="6">
                  <IonCard button onClick={() => history.push("/payment-policy")}>
                    <IonCardContent>Payment Policy</IonCardContent>
                  </IonCard>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="12">
                  <IonCard button>
                    <IonCardContent>Help</IonCardContent>
                  </IonCard>
                </IonCol>
              </IonRow>
            </IonGrid>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Payments;
