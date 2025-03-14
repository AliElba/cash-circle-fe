import React from "react";
import {
  IonIcon,
  IonLabel,
  IonPage,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  isPlatform,
} from "@ionic/react";
import { cardOutline, homeOutline, personCircleOutline, syncCircleOutline } from "ionicons/icons";
import { CONTENT_ID, RouteConstants } from "../../constants/constants";
import AppRoutes from "../routes/AppRoutes";
import { useLocation } from "react-router";
import SideBarMenu from "./SideBarMenu";

const MobileTabs: React.FC = () => {
  const location = useLocation();

  // Define routes where tabs should be hidden
  const hideTabsOnRoutes = [
    RouteConstants.loginRelative,
    RouteConstants.introRelative,
    "/",
    RouteConstants.registerRelative,
    RouteConstants.circleCreateRelative,
  ];

  // Check if the current route is in the hideTabsOnRoutes list
  const shouldHideTabs = hideTabsOnRoutes.includes(location.pathname) || isPlatform("desktop");

  return (
    <>
      <SideBarMenu />

      {/* Bottom Tabs Navigation */}
      <IonPage id={CONTENT_ID}>
        <IonTabs>
          <IonRouterOutlet>
            <AppRoutes />
          </IonRouterOutlet>

          {!shouldHideTabs && (
            <IonTabBar slot="bottom">
              <IonTabButton tab={RouteConstants.home} href={RouteConstants.homeRelative}>
                <IonIcon aria-hidden="true" icon={homeOutline} />
                <IonLabel>Home</IonLabel>
              </IonTabButton>
              <IonTabButton tab={RouteConstants.circleRelative} href={RouteConstants.circleRelative}>
                <IonIcon aria-hidden="true" icon={syncCircleOutline} />
                <IonLabel>My Circles</IonLabel>
              </IonTabButton>
              <IonTabButton tab={RouteConstants.payments} href={RouteConstants.paymentsRelative}>
                <IonIcon aria-hidden="true" icon={cardOutline} />
                <IonLabel>Payments</IonLabel>
              </IonTabButton>
              <IonTabButton tab={RouteConstants.profile} href={RouteConstants.profileRelative}>
                <IonIcon aria-hidden="true" icon={personCircleOutline} />
                <IonLabel>Profile</IonLabel>
              </IonTabButton>
            </IonTabBar>
          )}
        </IonTabs>
      </IonPage>
    </>
  );
};

export default MobileTabs;
