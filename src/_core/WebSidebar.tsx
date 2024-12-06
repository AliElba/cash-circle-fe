import React from 'react';
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
} from '@ionic/react';
import { ellipse, square, triangle } from 'ionicons/icons';
import { RouteConstants } from '../constants/routeConstants';
import AppRoutes from './AppRoutes';

const WebSidebar: React.FC = () => (
  <IonSplitPane contentId="main">
    <IonMenu contentId="main">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Menu</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem button routerLink={RouteConstants.homeRelative}>
            <IonIcon aria-hidden="true" icon={triangle} slot="start" />
            <IonLabel>Home</IonLabel>
          </IonItem>
          <IonItem button routerLink={RouteConstants.myCirclesRelative}>
            <IonIcon aria-hidden="true" icon={ellipse} slot="start" />
            <IonLabel>My Circles</IonLabel>
          </IonItem>
          <IonItem button routerLink={RouteConstants.paymentsRelative}>
            <IonIcon aria-hidden="true" icon={square} slot="start" />
            <IonLabel>Payments</IonLabel>
          </IonItem>
          <IonItem button routerLink={RouteConstants.profileRelative}>
            <IonIcon aria-hidden="true" icon={square} slot="start" />
            <IonLabel>Profile</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonMenu>

    <IonRouterOutlet id="main">
      <AppRoutes />
    </IonRouterOutlet>
  </IonSplitPane>
);

export default WebSidebar;
