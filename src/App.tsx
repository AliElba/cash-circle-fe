import { IonApp, isPlatform, setupIonicReact } from "@ionic/react";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
import "@ionic/react/css/palettes/dark.system.css";

import "./theme/variables.scss";
import React, { FC } from "react";
import { IonReactRouter } from "@ionic/react-router";
import MobileTabs from "./_core/layout/MobileTabs";
import WebSidebar from "./_core/layout/WebSidebar";
import "./App.scss";

//import "bootstrap/scss/bootstrap-grid.scss";
//import "bootstrap/scss/bootstrap-utilities.scss";
import "./styles-bootstrap.reset.scss";
import { AuthProvider, useAuth } from "./_core/context/AuthContext";
import Login from "./pages/Login";

setupIonicReact();

const AppContent: React.FC = () => {
  const isMobile = isPlatform("mobile");
  const { isAuth } = useAuth(); // Safely access useAuth within AuthProvider

  const Layout = isMobile ? MobileTabs : WebSidebar;
  return <IonReactRouter>{isAuth ? <Layout /> : <Login />}</IonReactRouter>;
};

const App: FC = () => {
  return (
    <IonApp>
      <AuthProvider>
        <AppContent /> {/* Separate component to use useAuth */}
      </AuthProvider>
    </IonApp>
  );
};

export default App;
