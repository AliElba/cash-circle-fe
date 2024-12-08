import React, { useState } from 'react';
import {
  IonButton,
  IonCard,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonInput,
  IonPage,
  IonRow,
  IonText,
  useIonRouter,
} from '@ionic/react';
import { logInOutline, logoFacebook, logoGoogle, logoLinkedin, personCircle } from 'ionicons/icons';
import './Login.css';
import { useHistory } from 'react-router-dom';
import { RouteConstants } from '../constants/routeConstants';

interface LoginPageProps {
  onLogin?: (mobileNumber: string, password: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const history = useHistory();
  const ionRouter = useIonRouter();

  // Local state for form inputs
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    history.push(RouteConstants.homeRelative);
    ionRouter.goBack();
    ionRouter.push(RouteConstants.homeRelative, 'root');
  };

  return (
    <IonPage>
      <IonContent className="ion-padding" fullscreen>
        <IonCard className="ion-align-items-center">
          <IonGrid className="login-grid">
            {/* User Icon */}
            <IonRow className="ion-justify-content-center">
              <IonIcon icon={personCircle} className="user-icon" />
            </IonRow>

            {/* Mobile Number Input */}
            <IonRow className="ion-justify-content-center">
              <IonCol size="12" sizeMd="8">
                <IonInput
                  label="Mobile number"
                  labelPlacement="floating"
                  fill="outline"
                  type="tel"
                  placeholder="+41 xx xxx xx xx"
                  value={mobileNumber}
                  onIonChange={(e) => setMobileNumber(e.detail.value!)}
                />
              </IonCol>
            </IonRow>

            {/* Password Input */}
            <IonRow className="ion-justify-content-center">
              <IonCol size="12" sizeMd="8">
                <IonInput
                  label="Password"
                  labelPlacement="floating"
                  fill="outline"
                  type="password"
                  placeholder=""
                  value={password}
                  onIonChange={(e) => setPassword(e.detail.value!)}
                />
              </IonCol>
            </IonRow>

            {/* Login Button */}
            <IonRow className="ion-justify-content-center">
              <IonCol>
                <IonButton routerLink={RouteConstants.homeRelative} expand="block" color="primary" className="login-button">
                  login
                  <IonIcon icon={logInOutline} slot="end" />
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
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
