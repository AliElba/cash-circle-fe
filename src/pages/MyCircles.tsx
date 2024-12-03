import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import './MyCircles.css';
import React from 'react';

const MyCircles: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>My Circles</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div style={{ padding: '16px' }}>
          <h2>Hello, Ali!</h2>
          <p>Your active circles will appear here.</p>
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Recommended for You</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <p>24,000 EGP</p>
              <p>2,000 EGP/month</p>
              <p>Duration: Dec 2023 - Nov 2025</p>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default MyCircles;
