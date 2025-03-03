import React from "react";
import { IonAvatar, IonLabel, IonText } from "@ionic/react";
import { UserPayload } from "../../app/generated/api";
import { getNameInitials } from "../../app/helpers/user-helpers"; // Adjust the import path as needed
import "./user-info.scss";

interface UserInfoProps {
  user: UserPayload;
}

const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
  return (
    <div className="user-info-item">
      <div className="contact-avatar selected">
        <IonAvatar className="contact-avatar__content">
          {user?.avatar ? (
            <img src={user.avatar} alt="User Avatar" />
          ) : (
            <div className="contact-initials">{getNameInitials(user?.name || "User")}</div>
          )}
        </IonAvatar>
      </div>
      <div className="contact-info">
        <IonLabel className="contact-name">{user?.name || "Guest User"}</IonLabel>
        <IonText className="contact-phone">{user?.phone || "No phone number"}</IonText>
      </div>
    </div>
  );
};

export default UserInfo;
