import { IonAvatar, IonButton, IonCard, IonCardContent, IonItem, IonLabel, IonList, IonText } from "@ionic/react";
import "./ReviewCircleSlide.scss";
import { CircleForm, SLIDE_TITLES } from "../../Circle";
import {
  calcAdminFees,
  formatAmount,
  getMonthYearString,
  getNameInitials,
  getUserTurnMonth,
} from "../../../../app/helpers/circle-helper";
import { MemberStatus } from "../../../../app/generated/api";
import SlideIndicator from "../SlideIndicator/SlideIndicator";

export interface ReviewCircleSlideProps {
  form: CircleForm;
  swiper: any;
  handleSubmit: () => Promise<void>;
}

const ReviewCircleSlide: React.FC<ReviewCircleSlideProps> = ({ form, swiper, handleSubmit }) => {
  return (
    <div className="review-circle-slide swiper__slide-container">
      <SlideIndicator swiper={swiper} activeIndex={4} slideTitles={SLIDE_TITLES} />
      {/* Scrollable Content */}
      <div className="swiper__slide-content">
        <h2>Review Your Circle</h2>

        {/* Circle Summary */}
        <IonCard>
          <IonCardContent>
            <h3 className="review-title">Circle Details</h3>
            <IonText>
              <p>
                <strong>Name:</strong> {form.name || "--"}
              </p>
              <p>
                <strong>Duration:</strong> {form.duration} months
              </p>
              <p>
                <strong>Monthly Amount:</strong> {formatAmount(Math.round(form.amount / form.duration))} CHF
              </p>
              <p>
                <strong>Total Amount:</strong> {form.amount} CHF
              </p>
              <p>
                <strong>Start Date:</strong> {getMonthYearString(new Date(form.startDate))}
              </p>
              <p>
                <strong>End Date:</strong> {getMonthYearString(new Date(form.endDate))}
              </p>
              <div className="separator" />
              <p>Admin Fees (10%): {calcAdminFees(form.amount)} CHF</p>
            </IonText>
          </IonCardContent>
        </IonCard>

        {/* Selected Slot */}
        <IonCard>
          <IonCardContent>
            <h3 className="review-title">Payout Slot</h3>
            <IonText>
              <p>
                <strong>Slot Number:</strong> {form.slotNumber}
              </p>
              <p>
                <strong>Payout Date:</strong> {getUserTurnMonth(form.startDate, form.slotNumber)}
              </p>
            </IonText>
          </IonCardContent>
        </IonCard>

        {/* Members List */}
        <IonCard>
          <IonCardContent>
            <h3 className="review-title">
              Members ({form.members.length}/{form.duration})
            </h3>
            <IonList>
              {form.members.length === 0 ? (
                <IonItem>
                  <IonLabel>No members added yet.</IonLabel>
                </IonItem>
              ) : (
                form.members.map((member, index: number) => (
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
      <div className="swiper__footer">
        <IonButton className="half-button" expand="block" fill="outline" onClick={() => swiper.slidePrev()}>
          Back
        </IonButton>

        <IonButton
          className="half-button"
          expand="block"
          disabled={!form.amount || form.amount < 1000 || form.amount > 10000 || !form.startDate}
          onClick={handleSubmit}>
          Submit Circle
        </IonButton>
      </div>
    </div>
  );
};

export default ReviewCircleSlide;
