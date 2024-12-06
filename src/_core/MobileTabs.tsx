import React from 'react';
import { IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react';
import { ellipse, square, triangle } from 'ionicons/icons';
import { RouteConstants } from '../constants/routeConstants';
import AppRoutes from './AppRoutes';

const MobileTabs: React.FC = () => (
  <IonTabs>
    <IonRouterOutlet>
      <AppRoutes />
    </IonRouterOutlet>

    <IonTabBar slot="bottom">
      <IonTabButton tab={RouteConstants.home} href={RouteConstants.homeRelative}>
        <IonIcon aria-hidden="true" icon={triangle} />
        <IonLabel>Home</IonLabel>
      </IonTabButton>
      <IonTabButton tab={RouteConstants.myCircles} href={RouteConstants.myCirclesRelative}>
        <IonIcon aria-hidden="true" icon={ellipse} />
        <IonLabel>My Circles</IonLabel>
      </IonTabButton>
      <IonTabButton tab={RouteConstants.payments} href={RouteConstants.paymentsRelative}>
        <IonIcon aria-hidden="true" icon={square} />
        <IonLabel>Payments</IonLabel>
      </IonTabButton>
      <IonTabButton tab={RouteConstants.profile} href={RouteConstants.profileRelative}>
        <IonIcon aria-hidden="true" icon={square} />
        <IonLabel>Profile</IonLabel>
      </IonTabButton>
    </IonTabBar>
  </IonTabs>
);

export default MobileTabs;
