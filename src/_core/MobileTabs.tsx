import React from 'react';
import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react';
import { triangle, ellipse, square } from 'ionicons/icons';
import Routes from './Routes';
import { RouteConstants } from '../constants/routeConstants';

const MobileTabs: React.FC = () => (
  <IonTabs>
    <IonRouterOutlet>
      <Routes />
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
