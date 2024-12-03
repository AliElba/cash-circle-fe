import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Payments.css';
import React from 'react';

const Payments: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Payments</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div style={{ textAlign: 'center', padding: '16px' }}>
          <h3>You don’t have any payments due yet</h3>
          <IonButton expand="block" color="primary">
            Join a Circle
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Payments;
