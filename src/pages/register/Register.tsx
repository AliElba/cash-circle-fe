import React, { useState } from "react";
import {
  IonButton,
  IonContent,
  IonGrid,
  IonIcon,
  IonInput,
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrorMessages([]); // Reset error messages state

    try {
      await authService.register({ email, password, firstName, lastName });

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

            {/* Email Input */}
            <IonRow className="ion-justify-content-center">
              <IonInput
                label="Email"
                labelPlacement="floating"
                fill="outline"
                type="email"
                placeholder="Enter your email"
                value={email}
                onIonChange={(e) => setEmail(e.detail.value!)}
                onBlur={(e) => setEmail((e.target as { value: string }).value)}
                required
              />
            </IonRow>

            {/* Password Input */}
            <IonRow className="ion-justify-content-center">
              <IonInput
                label="Password"
                labelPlacement="floating"
                fill="outline"
                type="password"
                placeholder="Enter your password"
                value={password}
                onIonChange={(e) => setPassword(e.detail.value!)}
                onBlur={(e) => setPassword((e.target as { value: string }).value)}
                required
              />
            </IonRow>

            {/* First Name Input */}
            <IonRow className="ion-justify-content-center">
              <IonInput
                label="First Name (Optional)"
                labelPlacement="floating"
                fill="outline"
                type="text"
                placeholder="Enter your first name"
                value={firstName}
                onIonChange={(e) => setFirstName(e.detail.value!)}
                onBlur={(e) => setFirstName((e.target as { value: string }).value)}
              />
            </IonRow>

            {/* Last Name Input */}
            <IonRow className="ion-justify-content-center">
              <IonInput
                label="Last Name (Optional)"
                labelPlacement="floating"
                fill="outline"
                type="text"
                placeholder="Enter your last name"
                value={lastName}
                onIonChange={(e) => setLastName(e.detail.value!)}
                onBlur={(e) => setLastName((e.target as { value: string }).value)}
              />
            </IonRow>

            {/* Register Button */}
            <IonRow className="ion-justify-content-center">
              <IonButton expand="block" color="primary" type="submit">
                Register
                <IonIcon icon={personAddOutline} slot="end" />
              </IonButton>
            </IonRow>
          </form>

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

export default Register;
