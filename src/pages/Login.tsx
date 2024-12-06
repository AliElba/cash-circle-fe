import React, { useState } from 'react';
import { IonButton, IonCol, IonContent, IonGrid, IonIcon, IonInput, IonPage, IonRow, IonText } from '@ionic/react';
import { logoFacebook, logoGoogle, logoLinkedin, personCircle } from 'ionicons/icons';
import './Login.css';

interface LoginPageProps {
  onLogin: (mobileNumber: string, password: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  // Local state for form inputs
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');

  return (
    <IonPage>
      <IonContent className="ion-padding" fullscreen>
        <IonGrid className="login-grid">
          {/* User Icon */}
          <IonRow className="ion-justify-content-center">
            <IonIcon icon={personCircle} className="user-icon" />
          </IonRow>

          {/* Mobile Number Input */}
          <IonRow className="ion-justify-content-center">
            <IonCol size="12" sizeMd="8">
              <IonInput
                type="tel"
                placeholder="mobile number"
                className="login-input"
                value={mobileNumber}
                onIonChange={(e) => setMobileNumber(e.detail.value!)}
              />
            </IonCol>
          </IonRow>

          {/* Password Input */}
          <IonRow className="ion-justify-content-center">
            <IonCol size="12" sizeMd="8">
              <IonInput
                type="password"
                placeholder="password"
                className="login-input"
                value={password}
                onIonChange={(e) => setPassword(e.detail.value!)}
              />
            </IonCol>
          </IonRow>

          {/* Login Button */}
          <IonRow className="ion-justify-content-center">
            <IonCol size="12" sizeMd="8">
              <IonButton expand="block" color="primary" className="login-button" onClick={() => onLogin(mobileNumber, password)}>
                login
              </IonButton>
            </IonCol>
          </IonRow>

          {/* Social Media Login */}
          <IonRow className="ion-justify-content-center">
            <IonText className="divider-text">or</IonText>
          </IonRow>
          <IonRow className="ion-justify-content-center">
            <IonText className="social-text">use social accounts to fill data</IonText>
          </IonRow>

          <IonRow className="ion-justify-content-center">
            <IonIcon icon={logoFacebook} className="social-icon facebook" />
            <IonIcon icon={logoGoogle} className="social-icon google" />
            <IonIcon icon={logoLinkedin} className="social-icon linkedin" />
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
