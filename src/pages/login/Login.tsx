import React, { useContext, useEffect, useState } from "react";
import {
  IonButton,
  IonContent,
  IonGrid,
  IonIcon,
  IonInput,
  IonItem,
  IonList,
  IonPage,
  IonRow,
  IonText,
  useIonRouter,
  useIonToast,
} from "@ionic/react";
import { logInOutline, personCircle } from "ionicons/icons";
import "./Login.scss";
import { Preferences } from "@capacitor/preferences";
import { RouteConstants, StorageConstants } from "../../constants/constants";
import { AxiosError } from "axios";
import { AuthContext } from "../../app/context/AuthContext";

const Login: React.FC = () => {
  const { login } = useContext(AuthContext)!;
  const [present] = useIonToast();
  const ionRouter = useIonRouter();
  const [phone, setPhone] = useState("0111111");
  const [password, setPassword] = useState("123456");
  const [isIntroPageVisited, setIsIntroPageVisited] = useState<boolean | null>(null);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  // Check if the intro page has been visited
  useEffect(() => {
    console.log("[Login] rendered");
    const checkIntroPageVisited = async () => {
      const result = await Preferences.get({ key: StorageConstants.isIntroPageVisited });
      setIsIntroPageVisited(result.value === "true");
    };

    checkIntroPageVisited().then();
  }, []);

  // Render Intro page if it hasn't been visited
  useEffect(() => {
    if (isIntroPageVisited === false) {
      ionRouter.push(RouteConstants.introRelative, "forward");
    }
  }, [isIntroPageVisited, ionRouter]); // Runs when isIntroPageVisited changes

  const handleLogin = async () => {
    setErrorMessages([]); // Reset error messages state

    try {
      await login({ phone: phone, password });

      // Redirect to the home page after successful login
      ionRouter.push(RouteConstants.homeRelative, "forward");
    } catch (err: AxiosError | any) {
      // Handle errors from authService
      const errorMessage = err.response?.data?.message || "An error occurred during login.";
      setErrorMessages(Array.isArray(errorMessage) ? errorMessage : [errorMessage]);

      // show the error main message also using ion toast
      await present({ message: err.message, duration: 2000, position: "top", color: "danger" });
    }
  };

  const handleReSeeIntro = async () => {
    await Preferences.remove({ key: StorageConstants.isIntroPageVisited });
    setIsIntroPageVisited(false);
  };

  // Render login page if intro page has been visited
  return (
    <IonPage>
      <IonContent className="ion-padding" fullscreen>
        <IonGrid className="login-grid">
          {/* User Icon */}
          <IonRow className="ion-justify-content-center">
            <IonIcon icon={personCircle} className="user-icon" />
          </IonRow>

          <IonItem className="ion-justify-content-center ion-margin-vertical">
            <IonInput
              label="Phone"
              labelPlacement="floating"
              fill="solid"
              type="tel"
              placeholder="Enter your phone"
              value={phone}
              onIonChange={(e) => setPhone(e.detail.value!)} // Keep onIonChange for intermediate updates
              onBlur={(e) => setPhone((e.target as { value: string }).value)} // Ensure final value is captured
            />
          </IonItem>

          <IonItem className="ion-justify-content-center ion-margin-vertical">
            <IonInput
              label="Password"
              labelPlacement="floating"
              fill="solid"
              type="password"
              placeholder="Enter your password"
              value={password}
              onIonChange={(e) => setPassword(e.detail.value!)} // Keep onIonChange for intermediate updates
              onBlur={(e) => setPassword((e.target as { value: string }).value)} // Ensure final value is captured
            />
          </IonItem>

          <IonRow className="ion-justify-content-center ion-margin-bottom">
            <IonButton className="w-100" expand="block" color="primary" onClick={handleLogin}>
              Login
              <IonIcon icon={logInOutline} slot="end" />
            </IonButton>
          </IonRow>

          {/* Error Messages */}
          {errorMessages.length > 0 && (
            <>
              <IonList className="ion-no-padding">
                {errorMessages.map((message, index) => (
                  <IonItem lines="none" key={index} className="ion-text-small ion-no-padding">
                    <IonText color="danger">{message}</IonText>
                  </IonItem>
                ))}
              </IonList>
              <div className="separator" />
            </>
          )}

          {/* Register Link */}
          <IonRow className="ion-justify-content-center">
            <IonText>
              Don't have an account?{" "}
              <IonText
                color="primary"
                style={{ cursor: "pointer", fontWeight: "bold" }}
                onClick={() => ionRouter.push(RouteConstants.registerRelative)}>
                Register
              </IonText>
            </IonText>
          </IonRow>

          <div className="separator" />

          {/* Re-see Intro Link */}
          <IonRow className="ion-justify-content-center">
            <IonText>
              Want to see the intro again?{" "}
              <IonText color="primary" style={{ cursor: "pointer", fontWeight: "bold" }} onClick={handleReSeeIntro}>
                Click here
              </IonText>
            </IonText>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Login;
