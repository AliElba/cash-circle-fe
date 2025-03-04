import React from "react";
import {
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { cardOutline, homeOutline, personCircleOutline, syncCircleOutline } from "ionicons/icons";
import { RouteConstants } from "../../constants/constants";

const paths = [
  { path: RouteConstants.homeRelative, label: "Home", icon: homeOutline },
  { path: RouteConstants.circleRelative, label: "My Circles", icon: syncCircleOutline },
  { path: RouteConstants.paymentsRelative, label: "Payments", icon: cardOutline },
  { path: RouteConstants.profileRelative, label: "Profile", icon: personCircleOutline },
];

const SideBarMenu: React.FC = () => {
  return (
    <IonMenu contentId="main-content">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Cash Circle</IonTitle>
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
  );
};

export default SideBarMenu;
