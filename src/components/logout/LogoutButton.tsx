import React, { useContext } from "react";
import { IonButton, IonIcon, useIonRouter } from "@ionic/react";
import { logOutOutline } from "ionicons/icons";
import { AuthContext } from "../../app/context/AuthContext";
import { RouteConstants } from "../../constants/constants";

const LogoutButton: React.FC = () => {
  const { logout } = useContext(AuthContext)!;

  const router = useIonRouter(); // Ionic Router for navigation

  const handleLogout = async () => {
    await logout();
    router.push(RouteConstants.loginRelative, "root"); // Navigate to login page and reset history
  };

  return (
    <IonButton onClick={handleLogout} expand="full" fill="outline">
      <IonIcon slot="start" icon={logOutOutline} />
      Logout
    </IonButton>
  );
};

export default LogoutButton;
