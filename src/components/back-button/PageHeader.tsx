import { IonBackButton, IonButtons, IonHeader, IonTitle, IonToolbar } from "@ionic/react";
import { RouteConstants } from "../../constants/constants";

interface PageHeaderProps {
  title: string;
  backButtonText?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, backButtonText = "Back" }) => {
  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref={RouteConstants.homeRelative} text={backButtonText} />
          </IonButtons>

          <IonTitle>{title}</IonTitle>
        </IonToolbar>
      </IonHeader>
    </>
  );
};

export default PageHeader;
