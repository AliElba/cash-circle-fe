import { IonApp, setupIonicReact } from "@ionic/react";

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

// Enable Dark Mode
// import "@ionic/react/css/palettes/dark.system.css";
import "./theme/variables.scss";
import React, { FC } from "react";
import "./App.scss";
import { AuthProvider } from "./app/context/AuthContext";
import AppContent from "./AppContent";
import { IonReactRouter } from "@ionic/react-router";

setupIonicReact();

const App: FC = () => {
  console.log("[App] rendered");
  return (
    <AuthProvider>
      <IonApp>
        <IonReactRouter>
          <AppContent />
        </IonReactRouter>
      </IonApp>
    </AuthProvider>
  );
};

export default App;
