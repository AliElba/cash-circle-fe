import React, { useState } from "react";
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
} from "@ionic/react";
import { personAddOutline } from "ionicons/icons";
import "./Register.scss";
import { authService } from "../../services/auth.service";
import { AxiosError } from "axios";
import { RouteConstants } from "../../constants/constants";

const Register: React.FC = () => {
  const ionRouter = useIonRouter();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrorMessages([]); // Reset error messages state

    try {
      await authService.register({ phone, password, name });

      // Redirect to the login page after successful registration
      ionRouter.push(RouteConstants.loginRelative, "forward");
    } catch (err: AxiosError | any) {
      // Handle errors from authService
      const errorMessage = err.response?.data?.message || "An error occurred during registration.";
      setErrorMessages(Array.isArray(errorMessage) ? errorMessage : [errorMessage]);
    }
  };

  return (
    <IonPage>
      <IonContent className="ion-padding" fullscreen>
        <IonGrid className="register-grid">
          <form onSubmit={handleRegister}>
            {/* User Icon */}
            <IonRow className="ion-justify-content-center">
              <IonIcon icon={personAddOutline} className="user-icon" />
            </IonRow>

            {/* phone Input */}
            <IonRow className="ion-justify-content-center ion-margin-vertical">
              <IonInput
                label="Phone"
                labelPlacement="floating"
                fill="solid"
                type="tel"
                placeholder="Enter your phone"
                value={phone}
                onIonChange={(e) => setPhone(e.detail.value!)}
                onBlur={(e) => setPhone((e.target as { value: string }).value)}
                required
              />
            </IonRow>

            {/* Password Input */}
            <IonRow className="ion-justify-content-center ion-margin-vertical">
              <IonInput
                label="Password"
                labelPlacement="floating"
                fill="solid"
                type="password"
                placeholder="Enter your password"
                value={password}
                onIonChange={(e) => setPassword(e.detail.value!)}
                onBlur={(e) => setPassword((e.target as { value: string }).value)}
                required
              />
            </IonRow>

            <IonRow className="ion-justify-content-center ion-margin-vertical">
              <IonInput
                label="Name (Optional)"
                labelPlacement="floating"
                fill="solid"
                type="text"
                placeholder="Enter your name"
                value={name}
                onIonChange={(e) => setName(e.detail.value!)}
                onBlur={(e) => setName((e.target as { value: string }).value)}
              />
            </IonRow>

            <IonRow className="ion-justify-content-center ion-margin-bottom">
              <IonButton className="w-100" expand="block" color="primary" type="submit">
                Register
                <IonIcon icon={personAddOutline} slot="end" />
              </IonButton>
            </IonRow>
          </form>

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

          <div className="separator"></div>
          <IonRow className="ion-justify-content-center">
            <IonText>
              Already have an account?{" "}
              <IonText
                color="primary"
                style={{ cursor: "pointer", fontWeight: "bold" }}
                onClick={() => ionRouter.push(RouteConstants.loginRelative)}>
                Login
              </IonText>
            </IonText>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Register;
