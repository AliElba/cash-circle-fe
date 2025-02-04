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
import { CirclePayload } from "../../app/generated/api";
import { formatAmount, getUserTurnMonth } from "../../app/helpers/circle-helper";
import { useHistory } from "react-router";

interface CircleCardProps {
  circle: CirclePayload;
  userId: string; // ✅ Pass the logged-in user ID
}

const CircleCard: React.FC<CircleCardProps> = ({ circle, userId }) => {
  const history = useHistory();

  // ✅ Find the logged-in user's membership info in this circle
  const circleMemberDetails = circle.members.find((member) => member.userId === userId);
  const userSlot = circleMemberDetails ? circleMemberDetails.slotNumber : null;

  console.log("User id:", userId);
  console.log("Circle Details:", circle);
  console.log("Circle Member Details:", circleMemberDetails);

  const renderTimeline = () => {
    return Array.from({ length: circle.duration }).map((_, index) => (
      <div key={index} className={`timeline-box ${index + 1 === userSlot ? "active" : ""}`}>
        {index + 1 === userSlot && (
          <div className="timeline-indicator-container">
            <IonText className="text-secondary your-turn-text">
              Your turn ({getUserTurnMonth(circle.startDate, userSlot)})
            </IonText>
            <IonIcon icon={personCircle} size="medium" color="primary" />
          </div>
        )}
      </div>
    ));
  };

  const handleCardClick = () => {
    history.push(`/circle/${circle.id}`);
  };

  return (
    <IonCard className="circle-card">
      <IonCardHeader>
        <IonRow className="ion-align-items-center">
          <IonCol size="7">
            <IonCardTitle className="circle-card__title">{formatAmount(circle.amount)} CHF</IonCardTitle>
            <IonCardSubtitle>{formatAmount(circle.amount / circle.duration)} CHF Monthly</IonCardSubtitle>
          </IonCol>
          <IonCol size="5" className="ion-text-end">
            <IonButton fill="clear" color="primary" size="small" onClick={handleCardClick}>
              Details
              <IonIcon slot="end" icon={enterOutline} />
            </IonButton>
          </IonCol>
        </IonRow>
      </IonCardHeader>
      <IonCardContent>
        <IonRow className="timeline">
          <IonCol size="12" className="ion-text-center">
            <div className="timeline-bar">{renderTimeline()}</div>
            <div className="timeline-labels">
              {<span>{new Date(circle.startDate).toLocaleString("en-US", { month: "short", year: "numeric" })}</span>}
              <span className="timeline-duration">{circle.duration} months</span>
              <span>{new Date(circle.endDate).toLocaleString("en-US", { month: "short", year: "numeric" })}</span>
            </div>
          </IonCol>
        </IonRow>
        <IonRow className="admin-fees">
          <IonCol size="12" className="ion-text-start">
            <IonText>{circleMemberDetails?.adminFees} Admin Fees</IonText>
          </IonCol>
        </IonRow>
      </IonCardContent>
    </IonCard>
  );
};

export default CircleCard;
