import React, { useEffect, useState } from "react";
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
} from "@ionic/react";
import { logInOutline, logoFacebook, logoGoogle, logoLinkedin, personCircle } from "ionicons/icons";
import "./Login.scss";
import { RouteConstants, StorageConstants } from "../constants/constants";
import { Preferences } from "@capacitor/preferences";
import Intro from "../components/Intro";

interface ComponentProps {
  onLogin?: (mobileNumber: string, password: string) => void;
}

const Login: React.FC<ComponentProps> = ({ onLogin }) => {
  const ionRouter = useIonRouter();

  // Local state for form inputs
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");

  const [isIntroPageVisited, setIsIntroPageVisited] = useState(true);

  useEffect(() => {
    const checkIntroKeyVisitedInStorage = async () => {
      const isIntroPageVisited = await Preferences.get({ key: StorageConstants.isIntroPageVisited });
      setIsIntroPageVisited(isIntroPageVisited.value === "true");
    };

    checkIntroKeyVisitedInStorage().then();
  }, []);

  const handleLogin = () => {
    // Navigate to the home route
    ionRouter.push(RouteConstants.homeRelative);
    // Go back to the root of the navigation stack
    ionRouter.goBack();
    // Push the home route onto the navigation stack
    ionRouter.push(RouteConstants.homeRelative, "root");
  };

  const finishIntro = async () => {
    setIsIntroPageVisited(true);
    Preferences.set({ key: StorageConstants.isIntroPageVisited, value: "true" }).then();
  };

  const seeIntroAgain = () => {
    setIsIntroPageVisited(false);
    Preferences.remove({ key: StorageConstants.isIntroPageVisited }).then();
  };

  return (
    <>
      {!isIntroPageVisited ? (
        <Intro onFinish={finishIntro} />
      ) : (
        <IonPage>
          <IonContent className="ion-padding" fullscreen>
            <div className="row d-flex justify-content-center">
              <div className="col-12 text-center">ksaklmsamlksmalms</div>
            </div>

            <div className="row">
              <div className="col-12 col-md-6 mx-auto">
                <div className="p-3 bg-primary text-white text-center">Centered Horizontally</div>
              </div>
            </div>

            <div className="d-flex justify-content-center">
              <div className="p-3 bg-primary text-white">Centered Horizontally</div>
            </div>

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
                    <IonButton
                      routerLink={RouteConstants.homeRelative}
                      expand="block"
                      color="primary"
                      className="login-button">
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
      )}
    </>
  );
};

export default Login;
