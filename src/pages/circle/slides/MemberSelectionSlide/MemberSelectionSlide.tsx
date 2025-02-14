import {
  IonAvatar,
  IonButton,
  IonCol,
  IonGrid,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonRow,
  IonSegment,
  IonSegmentButton,
  IonText,
} from "@ionic/react";
import { closeOutline } from "ionicons/icons";
import "./MemberSelectionSlide.scss";
import { useFilteredContacts } from "../../../../app/hooks/useContacts";
import { CircleSlideProps } from "../CircleDetailsSlide/CircleDetailsSlide";
import { CircleMemberPayload, MemberStatus, UserPayload } from "../../../../app/generated/api";
import { getNameInitials } from "../../../../app/helpers/circle-helper";
import { useEffect, useState } from "react";

enum MemberSelectionMode {
  Contacts = "contacts",
  Phone = "phone",
}

const MemberSelectionSlide: React.FC<CircleSlideProps> = ({ form, updateForm, swiper }) => {
  const { filteredContacts, error } = useFilteredContacts();
  const [selectedTab, setSelectedTab] = useState<MemberSelectionMode>(MemberSelectionMode.Contacts);
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [phone, setPhone] = useState("");

  const maxMembers = form.duration; // Duration determines the max members
  const isMaxReached = form.members.length >= maxMembers;
  const ownerId = form.ownerId; // Owner ID (Current user ID)

  let ownerDetails: UserPayload | undefined;

  // 🛑 Exclude the current user from the contact list
  const availableContacts = filteredContacts.filter((contact) => contact.id !== ownerId);

  // useEffect(() => {
  //   if (!filteredContacts.length) return; // Wait until contacts are loaded
  //
  //   ownerDetails = filteredContacts.find((contact) => contact.id === ownerId);
  //   console.log("Owner Details:", ownerDetails);
  // }, [filteredContacts]); // 🔥 Add dependencies

  // ✅ Ensure the current user is always in the members list
  useEffect(() => {
    if (!filteredContacts.length) return; // Wait until contacts are loaded

    ownerDetails = filteredContacts.find((contact) => contact.id === ownerId);
    console.log("Owner Details:", ownerDetails);

    if (ownerDetails && !form.members.some((member) => member.userId === ownerId)) {
      updateForm("members", [
        {
          userId: ownerId,
          user: {
            name: ownerDetails.name,
            phone: ownerDetails.phone,
          },
          status: MemberStatus.Confirmed,
        } as Partial<CircleMemberPayload>,
        ...form.members,
      ]);
    }
  }, [ownerId, updateForm]); // 🔥 Add dependencies

  // Function to select/deselect a contact
  const toggleSelection = (contact: UserPayload) => {
    if (isMaxReached) return; // Prevent adding more members if limit reached

    const isSelected = selectedMembers.includes(contact.phone);

    let updatedSelection, updatedMembers: any[];

    if (isSelected) {
      // Remove from selected members
      updatedSelection = selectedMembers.filter((phone) => phone !== contact.phone);
      updatedMembers = form.members.filter((member) => member.user.phone !== contact.phone);
    } else {
      // Add new member
      updatedSelection = [...selectedMembers, contact.phone];
      updatedMembers = [
        ...form.members,
        {
          user: {
            name: contact.name,
            phone: contact.phone,
          },
          userId: contact.id,
          status: MemberStatus.Pending,
        },
      ];
    }

    // Update selected members & form
    setSelectedMembers(updatedSelection);
    updateForm("members", updatedMembers);
  };

  // Function to add an unregistered member by phone
  const addUnregisteredMemberByPhone = () => {
    if (isMaxReached || !phone || form.members.some((member: any) => member.phone === phone)) return;

    updateForm("members", [
      ...form.members,
      {
        name: "Unregistered Member",
        phone: phone,
        status: MemberStatus.Pending,
      },
    ]);
    setPhone("");
  };

  // Function to remove a member (excluding the owner)
  const removeMember = (phone: string) => {
    updateForm(
      "members",
      form.members.filter((member: any) => member.phone !== phone && member.userId !== ownerId),
    );
  };

  return (
    <div className="member-selection-slide swiper__slide-container">
      <div className="swiper__slide-content">
        <h2>Add Members</h2>
        <p className="text-start fs-6 ion-color-medium">
          Select from your contacts or enter a phone number for new members.
        </p>

        {/* Tabs: Contacts or Manual Phone Entry */}
        <IonSegment value={selectedTab} onIonChange={(e) => setSelectedTab(e.detail.value as MemberSelectionMode)}>
          <IonSegmentButton value={MemberSelectionMode.Contacts}>Contacts</IonSegmentButton>
          <IonSegmentButton value={MemberSelectionMode.Phone}>Add by Phone</IonSegmentButton>
        </IonSegment>

        {/* Contacts List */}
        {selectedTab === MemberSelectionMode.Contacts && (
          <div className="selection-card__container">
            {error ? (
              <p className="error">{error}</p>
            ) : (
              <IonGrid>
                <IonRow>
                  {availableContacts.map((contact, index) => (
                    <IonCol key={index} size="3" className={`contact-item ${isMaxReached ? "disabled" : ""}`}>
                      <div
                        className={`contact-avatar ${selectedMembers.includes(contact.phone) ? "selected" : ""}`}
                        onClick={() => toggleSelection(contact)}>
                        <IonAvatar className="contact-avatar__content">
                          <div className="contact-initials">{getNameInitials(contact.name)}</div>
                        </IonAvatar>
                      </div>
                      <IonLabel className="contact-name">{contact.name}</IonLabel>
                      <IonText className="contact-phone">{contact.phone}</IonText>
                    </IonCol>
                  ))}
                </IonRow>
              </IonGrid>
            )}
          </div>
        )}

        {/* Manual Phone Input */}
        {selectedTab === MemberSelectionMode.Phone && (
          <div className="phone-input-container">
            <IonInput placeholder="Enter phone" value={phone} onIonChange={(e) => setPhone(e.detail.value!)} />
            <IonButton onClick={addUnregisteredMemberByPhone} fill="outline" disabled={isMaxReached}>
              Add
            </IonButton>
          </div>
        )}

        {/* Added Members List (Vertical) */}
        <h4 className="mt-3">Added Members</h4>
        <IonList className="added-members-list">
          {form.members.map((member, index: number) => (
            <IonItem key={index}>
              <IonAvatar slot="start">
                <div className="contact-initials">{getNameInitials(member.user.name)}</div>
              </IonAvatar>
              <IonLabel>
                <h3>{member.user.name}</h3>
                <p>{member.user.phone}</p>
              </IonLabel>
              {member.userId !== form.ownerId && (
                <IonButton fill="clear" color="danger" onClick={() => removeMember(member.user.phone)}>
                  <IonIcon icon={closeOutline} />
                </IonButton>
              )}
            </IonItem>
          ))}
        </IonList>
      </div>

      {/* Footer with summary & navigation */}
      <div className="swiper__footer slot-footer">
        {/* Member Count Indicator */}
        <div className="footer-counter">
          <IonText color="medium">
            Members: <strong>{form.members.length}</strong> / <strong>{maxMembers}</strong>
          </IonText>
          <IonText color="medium">
            Remaining: <strong>{maxMembers - form.members.length}</strong>
          </IonText>
        </div>

        {/* Next Button */}
        <IonButton expand="block" onClick={() => swiper.slideNext()}>
          Next: Review Circle Details
        </IonButton>
      </div>
    </div>
  );
};

export default MemberSelectionSlide;
