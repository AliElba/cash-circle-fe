import React from "react";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonIcon,
  IonRow,
  IonText,
} from "@ionic/react";
import { enterOutline, personCircle } from "ionicons/icons";
import "./CircleCard.scss";

interface CircleCardProps {
  totalAmount: string;
  monthlyAmount: string;
  adminFees: string;
  duration: number;
  startDate: string;
  endDate: string;
  yourTurn: number; // The user's turn (1-based index)
}

const CircleCard: React.FC<CircleCardProps> = ({
  totalAmount,
  monthlyAmount,
  adminFees,
  duration,
  startDate,
  endDate,
  yourTurn,
}) => {
  const renderTimeline = () => {
    return Array.from({ length: duration }).map((_, index) => (
      <div key={index} className={`timeline-box ${index + 1 === yourTurn ? "active" : ""}`}>
        {index + 1 === yourTurn && (
          <div className="timeline-indicator-container">
            <IonText className="text-secondary your-turn-text">Your turn (Feb)</IonText>
            <IonIcon icon={personCircle} size="medium" color="primary" />
          </div>
        )}
      </div>
    ));
  };

  return (
    <IonCard className="circle-card">
      <IonCardHeader>
        <IonRow className="ion-align-items-center">
          <IonCol size="7">
            <IonCardTitle>{totalAmount} EGP</IonCardTitle>
            <IonCardSubtitle>{monthlyAmount} EGP Monthly</IonCardSubtitle>
          </IonCol>
          <IonCol size="5" className="ion-text-end">
            <IonButton fill="clear" color="primary" size="small">
              Join Now <IonIcon slot="end" icon={enterOutline} />
            </IonButton>
          </IonCol>
        </IonRow>
      </IonCardHeader>
      <IonCardContent>
        <IonRow className="timeline">
          <IonCol size="12" className="ion-text-center">
            <div className="timeline-bar">{renderTimeline()}</div>
            <div className="timeline-labels">
              <span>{startDate}</span>
              <span className="timeline-duration">{duration} months</span>
              <span>{endDate}</span>
            </div>
          </IonCol>
        </IonRow>
        <IonRow className="admin-fees">
          <IonCol size="12" className="ion-text-start">
            <IonText>{adminFees} Admin Fees</IonText>
          </IonCol>
        </IonRow>
      </IonCardContent>
    </IonCard>
  );
};

export default CircleCard;
