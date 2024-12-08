import { IonApp, isPlatform, setupIonicReact } from '@ionic/react';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */
/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import React, { FC } from 'react';
import { IonReactRouter } from '@ionic/react-router';
import MobileTabs from './_core/layout/MobileTabs';
import WebSidebar from './_core/layout/WebSidebar';

setupIonicReact();

const App: FC = () => {
  const isMobile = isPlatform('mobile');
  // const navigate = useNavigate();

  return (
    <IonApp>
      <IonReactRouter>
        {/*<IonRouterOutlet>
          <AppRoutes />
        </IonRouterOutlet>*/}

        {isMobile ?
          <MobileTabs />
        : <WebSidebar />}
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
