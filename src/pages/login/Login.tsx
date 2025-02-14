import React, { useContext, useEffect, useState } from "react";
import {
  IonButton,
  IonContent,
  IonGrid,
  IonIcon,
  IonInput,
  IonItem,
  IonPage,
  IonRow,
  IonText,
  useIonRouter,
} from "@ionic/react";
import { logInOutline, personCircle } from "ionicons/icons";
import "./Login.scss";
import { Preferences } from "@capacitor/preferences";
import Intro from "../intro/Intro";
import { RouteConstants, StorageConstants } from "../../constants/constants";
import { AxiosError } from "axios";
import { AuthContext } from "../../app/context/AuthContext";

const Login: React.FC = () => {
  const { login } = useContext(AuthContext)!;

  const ionRouter = useIonRouter();
  const [phone, setPhone] = useState("0111111");
  const [password, setPassword] = useState("123456");
  const [isIntroPageVisited, setIsIntroPageVisited] = useState<boolean | null>(null);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  // Check if the intro page has been visited
  useEffect(() => {
    const checkIntroPageVisited = async () => {
      const result = await Preferences.get({ key: StorageConstants.isIntroPageVisited });
      setIsIntroPageVisited(result.value === "true");
    };

    checkIntroPageVisited().then();
  }, []);

  const handleLogin = async () => {
    setErrorMessages([]); // Reset error messages state

    try {
      // await authService.login({ phone: phone, password });
      await login({ phone: phone, password });

      // Redirect to the home page after successful login
      ionRouter.push(RouteConstants.homeRelative, "forward");
    } catch (err: AxiosError | any) {
      // Handle errors from authService
      const errorMessage = err.response?.data?.message || "An error occurred during login.";
      setErrorMessages(Array.isArray(errorMessage) ? errorMessage : [errorMessage]);
    }
  };

  // Render Intro page if it hasn't been visited
  if (isIntroPageVisited === false) {
    return <Intro />;
  }

  // Render login page if intro page has been visited
  return (
    <IonPage>
      <IonContent className="ion-padding" fullscreen>
        <IonGrid className="login-grid">
          {/* User Icon */}
          <IonRow className="ion-justify-content-center">
            <IonIcon icon={personCircle} className="user-icon" />
          </IonRow>

          <IonItem className="ion-justify-content-center">
            <IonInput
              label="phone"
              labelPlacement="floating"
              fill="outline"
              type="tel"
              placeholder="Enter your phone"
              value={phone}
              onIonChange={(e) => setPhone(e.detail.value!)} // Keep onIonChange for intermediate updates
              onBlur={(e) => setPhone((e.target as { value: string }).value)} // Ensure final value is captured
            />
          </IonItem>

          <IonItem className="ion-justify-content-center ion-margin-bottom">
            <IonInput
              label="Password"
              labelPlacement="floating"
              fill="outline"
              type="password"
              placeholder="Enter your password"
              value={password}
              onIonChange={(e) => setPassword(e.detail.value!)} // Keep onIonChange for intermediate updates
              onBlur={(e) => setPassword((e.target as { value: string }).value)} // Ensure final value is captured
            />
          </IonItem>

          <IonRow className="ion-justify-content-center ion-margin-bottom">
            <IonButton expand="block" color="primary" onClick={handleLogin}>
              Login
              <IonIcon icon={logInOutline} slot="end" />
            </IonButton>
          </IonRow>

          {/* Error Messages */}
          {errorMessages.length > 0 && (
            <IonRow className="ion-justify-content-center">
              <IonText color="danger">
                <ul>
                  {errorMessages.map((message, index) => (
                    <li key={index}>{message}</li>
                  ))}
                </ul>
              </IonText>
            </IonRow>
          )}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Login;
