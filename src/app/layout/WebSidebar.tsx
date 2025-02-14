import React from "react";
import {
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonRouterOutlet,
  IonSplitPane,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { ellipse, square, triangle } from "ionicons/icons";
import { RouteConstants } from "../../constants/constants";
import AppRoutes from "../routes/AppRoutes";

const WebSidebar: React.FC = () => {
  const paths = [
    { path: RouteConstants.homeRelative, label: "Home", icon: triangle },
    { path: RouteConstants.circleRelative, label: "My Circles", icon: ellipse },
    { path: RouteConstants.paymentsRelative, label: "Payments", icon: square },
    { path: RouteConstants.profileRelative, label: "Profile", icon: square },
  ];

  return (
    <IonSplitPane contentId="main">
      <IonMenu contentId="main">
        <IonHeader>
          <IonToolbar>
            <IonTitle>Menu</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            {paths.map(({ path, label, icon }) => (
              <IonItem button key={path} routerLink={path}>
                <IonIcon aria-hidden="true" icon={icon} slot="start" />
                <IonLabel>{label}</IonLabel>
              </IonItem>
            ))}
          </IonList>
        </IonContent>
      </IonMenu>

      <IonRouterOutlet id="main">
        <AppRoutes />
      </IonRouterOutlet>
    </IonSplitPane>
  );
};

export default WebSidebar;
