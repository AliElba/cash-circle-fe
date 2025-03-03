import "./Profile.scss";
import React, { useContext, useRef, useState } from "react";
import LogoutButton from "../components/logout/LogoutButton";
import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonModal,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { convertImageToBase64 } from "../app/helpers/user-helpers";
import { AuthContext } from "../app/context/AuthContext";
import UserInfo from "../components/user-info/user-info";

const defaultAvatars = [
  "/assets/avatars/avatar1.png",
  "/assets/avatars/avatar2.png",
  "/assets/avatars/avatar3.png",
  "/assets/avatars/avatar4.png",
  "/assets/avatars/avatar5.png",
  "/assets/avatars/army.png",
  "/assets/avatars/coding.png",
  "/assets/avatars/employee.png",
  "/assets/avatars/farmer.png",
  "/assets/avatars/teacher.png",
];

const Profile: React.FC = () => {
  const modal = useRef<HTMLIonModalElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, updateUser } = useContext(AuthContext)!;

  // Handle Avatar Selection
  const handleAvatarSelect = async (avatarUrl: string) => {
    if (!user) return;

    try {
      const base64Image = await convertImageToBase64(avatarUrl);

      const updatedUser = await updateUser({ avatar: base64Image });

      setIsModalOpen(false); // Close modal
    } catch (error) {
      console.error("Failed to update user avatar:", error);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle slot="start">Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding profile-page">
        <div onClick={() => setIsModalOpen(true)}>{user && <UserInfo user={user} />}</div>

        {/* Avatar Selection Modal */}
        <IonModal ref={modal} isOpen={isModalOpen} onDidDismiss={() => setIsModalOpen(false)}>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton onClick={() => modal.current?.dismiss()}>Cancel</IonButton>
              </IonButtons>
              <IonTitle>Welcome</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <div className="avatar-selection-modal">
              <h2>Select an Avatar</h2>
              <IonGrid>
                <IonRow>
                  {defaultAvatars.map((avatar, index) => (
                    <IonCol key={index} size="4">
                      <IonAvatar className="avatar-option" onClick={() => handleAvatarSelect(avatar)}>
                        <img src={avatar} alt={`Avatar ${index + 1}`} />
                      </IonAvatar>
                    </IonCol>
                  ))}
                </IonRow>
              </IonGrid>
            </div>
          </IonContent>
        </IonModal>

        {/* Logout Button */}
        <LogoutButton />
      </IonContent>
    </IonPage>
  );
};

export default Profile;
