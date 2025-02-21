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
import { CirclePayload, MemberStatus } from "../../app/generated/api";
import { formatAmount, getUserTurnMonth } from "../../app/helpers/circle-helper";
import { useHistory } from "react-router";
import { RouteConstants } from "../../constants/constants";

interface CircleCardProps {
  circle: CirclePayload;
  currentUserId: string;
}

const CircleCard: React.FC<CircleCardProps> = ({ circle, currentUserId }) => {
  const history = useHistory();

  // Find the current user's member in this circle members
  const currentCircleMember = circle.members.find((member) => member.userId === currentUserId);
  const currentCircleMemberSlot = currentCircleMember ? currentCircleMember.slotNumber : null;

  const renderTimeline = () => {
    return Array.from({ length: circle.duration }).map((_, index) => (
      <div key={index} className={`timeline-box ${index + 1 === currentCircleMemberSlot ? "active" : ""}`}>
        {index + 1 === currentCircleMemberSlot && (
          <div className="timeline-indicator-container">
            <IonText className="text-secondary your-turn-text">
              Your turn ({getUserTurnMonth(circle.startDate, currentCircleMemberSlot)})
            </IonText>
            <IonIcon icon={personCircle} size="medium" color="primary" />
          </div>
        )}
      </div>
    ));
  };

  const handleDetailsClick = () => {
    if (currentUserId === circle.ownerId) {
      history.push(`${RouteConstants.circleEditRelative}/${circle.id}`);
    } else {
      history.push(`${RouteConstants.circleDetailsRelative}/${circle.id}`);
    }
  };

  return (
    <IonCard className="circle-card">
      <IonCardHeader>
        <IonRow className="ion-align-items-center">
          <IonCol size="7">
            <IonCardTitle className="circle-card__title">{formatAmount(circle.amount)} CHF</IonCardTitle>
            <IonCardSubtitle className="circle-card__subtitle">
              {formatAmount(circle.amount / circle.duration)} CHF Monthly
            </IonCardSubtitle>
          </IonCol>
          <IonCol size="5" className="ion-text-end">
            <IonButton fill="clear" color="primary" size="small" onClick={handleDetailsClick}>
              {currentCircleMember?.status === MemberStatus.Pending ? "Join" : "Details"}
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
          <IonCol size="6" className="ion-text-start">
            <IonText>{currentCircleMember?.adminFees} Admin Fees</IonText>
          </IonCol>
          <IonCol size="6" className="ion-text-end">
            <IonText
              color={
                currentCircleMember?.status === MemberStatus.Confirmed
                  ? "success"
                  : currentCircleMember?.status === MemberStatus.Pending
                    ? "warning"
                    : "danger"
              }
              className={`ion-text-${currentCircleMember?.status === MemberStatus.Confirmed ? "success" : currentCircleMember?.status === MemberStatus.Pending ? "warning" : "danger"}`}
              style={{ fontSize: "0.7rem" }}>
              {currentCircleMember?.status.toUpperCase()}
              <div className="owner-member_text">
                {circle.ownerId === currentCircleMember?.userId && <IonText>(owner)</IonText>}
              </div>
            </IonText>
          </IonCol>
        </IonRow>
      </IonCardContent>
    </IonCard>
  );
};

export default CircleCard;
