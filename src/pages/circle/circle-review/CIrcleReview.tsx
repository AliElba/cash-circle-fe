import { IonAvatar, IonCard, IonCardContent, IonItem, IonLabel, IonList, IonText } from "@ionic/react";
import "./CIrcleReview.scss";
import {
  calcAdminFees,
  formatAmount,
  getMonthYearString,
  getNameInitials,
  getUserTurnMonth,
} from "../../../app/helpers/circle-helper";
import { CirclePayload, MemberStatus } from "../../../app/generated/api";
import useCurrentUser from "../../../app/hooks/useCurrentUser";

interface CircleReviewProps {
  circle: CirclePayload;
}

const CircleReview: React.FC<CircleReviewProps> = ({ circle }) => {
  const currentUser = useCurrentUser();
  const currentCircleMember = circle.members.find((m) => m.userId === currentUser?.id)!;

  return (
    <div className="circle-review-card">
      <h2>Review Your Circle</h2>

      {/* Circle Summary */}
      <IonCard>
        <IonCardContent>
          <h3 className="review-title">Circle Details</h3>
          <IonText>
            <p>
              <strong>Name:</strong> {circle.name || "--"}
            </p>
            <p>
              <strong>Duration:</strong> {circle.duration} months
            </p>
            <p>
              <strong>Monthly Amount:</strong> {formatAmount(Math.round(circle.amount / circle.duration))} CHF
            </p>
            <p>
              <strong>Total Amount:</strong> {circle.amount} CHF
            </p>
            <p>
              <strong>Start Date:</strong> {getMonthYearString(new Date(circle.startDate))}
            </p>
            <p>
              <strong>End Date:</strong> {getMonthYearString(new Date(circle.endDate))}
            </p>
            <div className="separator" />
            <p>Admin Fees (10%): {calcAdminFees(circle.amount)} CHF</p>
          </IonText>
        </IonCardContent>
      </IonCard>

      {/* Selected Slot */}
      <IonCard>
        <IonCardContent>
          <h3 className="review-title">Payout Slot</h3>
          <IonText>
            <p>
              <strong>Slot Number:</strong> {currentCircleMember?.slotNumber}
            </p>
            <p>
              <strong>Payout Date:</strong> {getUserTurnMonth(circle.startDate, currentCircleMember?.slotNumber!)}
            </p>
          </IonText>
        </IonCardContent>
      </IonCard>

      {/* Members List */}
      <IonCard>
        <IonCardContent>
          <h3 className="review-title">
            Members ({circle.members.length}/{circle.duration})
          </h3>
          <IonList>
            {circle.members.length === 0 ? (
              <IonItem>
                <IonLabel>No members added yet.</IonLabel>
              </IonItem>
            ) : (
              circle.members.map((member, index: number) => (
                <IonItem key={index}>
                  <IonAvatar slot="start">
                    <div className="contact-initials">{getNameInitials(member.user.name)}</div>
                  </IonAvatar>
                  <IonLabel>
                    <h3>{member.user.name}</h3>
                    <p>{member.user.phone || "Email Invitation Pending"}</p>
                  </IonLabel>
                  <IonText
                    color={
                      member.status === MemberStatus.Confirmed
                        ? "success"
                        : member.status === MemberStatus.Pending
                          ? "warning"
                          : "danger"
                    }
                    className={`ion-text-${member.status === MemberStatus.Confirmed ? "success" : member.status === MemberStatus.Pending ? "warning" : "danger"}`}
                    style={{ fontSize: "0.7rem" }}>
                    {member.status.toUpperCase()}
                  </IonText>
                </IonItem>
              ))
            )}
          </IonList>
        </IonCardContent>
      </IonCard>
    </div>
  );
};

export default CircleReview;
