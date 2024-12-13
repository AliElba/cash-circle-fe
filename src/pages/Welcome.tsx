import React from 'react';
import { IonButton, IonCol, IonContent, IonGrid, IonIcon, IonPage, IonRow, IonText } from '@ionic/react';
import { checkmarkCircle } from 'ionicons/icons';
import './Welcome.scss';

const Welcome: React.FC = () => {
  return (
    <IonPage>
      <IonContent className="ion-padding" fullscreen>
        <IonGrid className="welcome-grid">
          <IonRow className="ion-justify-content-center">
            <IonCol className="ion-text-center">
              <IonIcon icon={checkmarkCircle} className="welcome-icon" />
            </IonCol>
          </IonRow>

          <IonRow className="ion-justify-content-center">
            <IonCol className="ion-text-center">
              <IonText className="welcome-title">Welcome!</IonText>
              <IonText className="welcome-subtitle">You’re ready to go, let’s find you a circle!</IonText>
            </IonCol>
          </IonRow>

          <IonRow className="ion-justify-content-center">
            <IonCol className="ion-text-center">
              <img src="/assets/welcome-illustration.png" alt="Circle illustration" className="welcome-illustration" />
            </IonCol>
          </IonRow>

          <IonRow className="ion-justify-content-center">
            <IonCol className="ion-text-center">
              <IonButton expand="block" className="create-circle-button">
                Create A Circle
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Welcome;
