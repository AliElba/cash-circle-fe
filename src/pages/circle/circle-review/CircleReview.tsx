import { IonCard, IonCardContent, IonItem, IonLabel, IonList, IonText } from "@ionic/react";
import "./CircleReview.scss";
import { calcAdminFees, formatAmount, getMonthYearString, getUserTurnMonth } from "../../../app/helpers/circle-helpers";
import { CirclePayload, MemberStatus } from "../../../app/generated/api";
import useCurrentUser from "../../../app/hooks/useCurrentUser";
import React from "react";
import UserInfo from "../../../components/user-info/user-info";

interface CircleReviewProps {
  circle: CirclePayload;
}

const CircleReview: React.FC<CircleReviewProps> = ({ circle }) => {
  if (!circle) {
    return (
      <div className="circle-review-card">
        <h2>Review Your Circle</h2>
        <IonText>No circle found!</IonText>
      </div>
    );
  }
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
            <p className="admin-fees">Admin Fees (10%): {calcAdminFees(circle.amount)} CHF</p>
          </IonText>
        </IonCardContent>
      </IonCard>

      {/* Selected Slot */}
      <IonCard>
        <IonCardContent>
          <h3 className="review-title">Payout Slot</h3>
          <IonText>
            <p>
              <strong>Slot Number:</strong> {currentCircleMember?.slotNumber || "--"}
            </p>
            <p>
              <strong>Payout Date:</strong>
              <span className={currentCircleMember?.slotNumber ? "" : "text-danger"}>
                {"  "}
                {getUserTurnMonth(circle.startDate, currentCircleMember?.slotNumber!)}
              </span>
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
              circle.members
                .sort((a, b) => (a.slotNumber || 100) - (b.slotNumber || 100))
                .map((member, index: number) => (
                  <IonItem key={index} lines="full">
                    <UserInfo user={member.user} />

                    <IonText
                      slot="end"
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

                      <div className="ion-text-center">
                        <IonText className="member-status_text">
                          {circle.ownerId === member.userId && "(owner)"}
                          {!member.userId && "(unregistered)"}
                        </IonText>
                      </div>
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
