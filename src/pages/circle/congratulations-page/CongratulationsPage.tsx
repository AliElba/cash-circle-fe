import React from "react";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonContent,
  IonIcon,
  IonPage,
  IonText,
  IonTextarea,
  useIonToast,
} from "@ionic/react";
import { checkmarkCircleOutline, copyOutline } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import "./CongratulationsPage.scss";
import { CirclePayload } from "../../../app/generated/api";
import { formatAmount, getMonthYearString } from "../../../app/helpers/circle-helper";
import { RouteConstants } from "../../../constants/constants";
import { useLocation } from "react-router";

const CongratulationsPage: React.FC = () => {
  const history = useHistory();
  const [presentToast] = useIonToast();
  const location = useLocation<{ circle?: CirclePayload }>(); // Read state from history

  const circle = location.state?.circle; // Extract circle from state

  if (!circle) {
    // If no circle data, redirect to home or handle error
    history.replace(RouteConstants.circleRelative);
    return null;
  }

  const inviteMessage = `Join my savings circle
    🎉 "${circle.name}"! 🎉
    💰 Monthly Contribution: ${formatAmount(Math.round(circle.amount / circle.duration))} CHF
    📅 Duration: ${circle.duration} Months
    📆 Starts: ${getMonthYearString(new Date(circle.startDate))}
    
    Download the app now and join the circle! 🚀`;

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteMessage);
    presentToast({
      message: "Invite copied to clipboard!",
      duration: 2000,
      position: "top",
      color: "success",
    });
  };

  return (
    <IonPage>
      <IonContent className="congrats-content ion-padding">
        {/* Congratulations Icon */}
        <div className="congrats-header">
          <IonIcon icon={checkmarkCircleOutline} className="congrats-icon" />
          <IonText color="primary">
            <h1>Congratulations!</h1>
          </IonText>
          <IonText color="medium">
            <p>
              Your circle <strong>{circle.name}</strong> has been created successfully! 🎉
            </p>
          </IonText>
        </div>

        {/* Shareable Invitation */}
        <IonCard className="invite-card">
          <IonCardContent>
            <IonText color="dark">
              <h3>Invite Your Members</h3>
            </IonText>
            <IonTextarea value={inviteMessage} readonly className="invite-textarea" autoGrow />
            <IonButton expand="block" fill="outline" onClick={handleCopy}>
              <IonIcon slot="start" icon={copyOutline} />
              Copy Invitation
            </IonButton>
          </IonCardContent>
        </IonCard>

        {/* Navigation Button */}
        <IonButton expand="block" color="primary" onClick={() => history.push(RouteConstants.circleRelative)}>
          Go to My Circles
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default CongratulationsPage;
