import React from 'react';
import {
  IonSplitPane,
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
} from '@ionic/react';
import { triangle, ellipse, square } from 'ionicons/icons';
import Routes from './Routes';
import { RouteConstants } from '../constants/routeConstants';

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
      <Routes />
    </IonRouterOutlet>
  </IonSplitPane>
);

export default WebSidebar;
