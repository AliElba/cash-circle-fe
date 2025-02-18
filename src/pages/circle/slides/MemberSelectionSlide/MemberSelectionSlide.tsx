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
import { closeOutline, searchOutline } from "ionicons/icons";
import "./MemberSelectionSlide.scss";
import { useFilteredContacts } from "../../../../app/hooks/useContacts";
import { CircleSlideProps } from "../CircleDetailsSlide/CircleDetailsSlide";
import { CircleMemberPayload, MemberStatus, UserPayload } from "../../../../app/generated/api";
import { getNameInitials } from "../../../../app/helpers/circle-helper";
import { useEffect, useState } from "react";

enum MemberSelectionMode {
  Frequent = "frequent",
  AllContacts = "all",
}

const mapUserToCircleMember = (contact: UserPayload): CircleMemberPayload =>
  ({
    userId: contact.id, // If the contact is not a registered user, this will be undefined
    user: { ...contact },
    status: MemberStatus.Pending,
  }) as CircleMemberPayload;

const MemberSelectionSlide: React.FC<CircleSlideProps> = ({ form, updateForm, swiper }) => {
  const { frequentContacts, allContacts, error } = useFilteredContacts();
  const [selectedTab, setSelectedTab] = useState<MemberSelectionMode>(MemberSelectionMode.Frequent);
  const [selectedMembers, setSelectedMembers] = useState<CircleMemberPayload[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const maxMembers = form.duration; // Max members based on duration
  const isMaxReached = selectedMembers.length >= maxMembers;
  const ownerId = form.ownerId; // Current user ID

  let ownerDetails: UserPayload | undefined;

  // Ensure the owner is always in the members list
  useEffect(() => {
    if (!frequentContacts.length) return;

    ownerDetails = frequentContacts.find((contact) => contact.id === ownerId);
    if (ownerDetails && !selectedMembers.some((member) => member.userId === ownerId)) {
      const ownerMember: CircleMemberPayload = {
        userId: ownerDetails.id,
        user: {
          name: ownerDetails.name,
          phone: ownerDetails.phone,
        },
        status: MemberStatus.Confirmed,
      } as CircleMemberPayload;

      const updatedMembers = [ownerMember, ...selectedMembers];
      setSelectedMembers(updatedMembers);
      updateForm("members", updatedMembers);
    }
  }, [ownerId, frequentContacts]);

  // Apply search only to "All Contacts"
  const filteredAllContacts = allContacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Function to select/unselect a contact
  const toggleSelection = (contact: UserPayload) => {
    const isSelected = selectedMembers.some((member) => member.user.phone === contact.phone);

    let updatedMembers: CircleMemberPayload[];
    if (isSelected) {
      // Remove contact from selected members, if he is already selected before
      updatedMembers = selectedMembers.filter((member) => member.user.phone !== contact.phone);
    } else {
      if (isMaxReached) return; // Prevent adding more members if limit is reached

      // Add contact to selected members, after mapping (mobile contact / user from BE) to CircleMemberPayload
      updatedMembers = [...selectedMembers, mapUserToCircleMember(contact)];
    }

    // Update selected members
    setSelectedMembers(updatedMembers);
    updateForm("members", updatedMembers);
  };

  return (
    <div className="member-selection-slide swiper__slide-container">
      <div className="swiper__slide-content">
        <h2>Add Members</h2>
        <p className="text-start fs-6 ion-color-medium">Select members from your frequent contacts or all contacts.</p>

        {/* Tabs: Frequent Contacts or All Contacts */}
        <IonSegment value={selectedTab} onIonChange={(e) => setSelectedTab(e.detail.value as MemberSelectionMode)}>
          <IonSegmentButton value={MemberSelectionMode.Frequent}>Frequent Contacts</IonSegmentButton>
          <IonSegmentButton value={MemberSelectionMode.AllContacts}>All Contacts</IonSegmentButton>
        </IonSegment>

        {/* Show Search Bar only when in All Contacts Tab */}
        {selectedTab === MemberSelectionMode.AllContacts && (
          <IonItem className="search-bar">
            <IonIcon icon={searchOutline} slot="start" />
            <IonInput
              placeholder="Search contacts..."
              value={searchQuery}
              onIonInput={(e) => setSearchQuery(e.detail.value!)} // Runs immediately on change
            />
          </IonItem>
        )}

        {/* Contacts List */}
        <div className="scrollable-contacts-list">
          {error ? (
            <p className="error">{error}</p>
          ) : selectedTab === MemberSelectionMode.Frequent ? (
            // Frequent Contacts Grid View
            <IonGrid>
              <IonRow>
                {frequentContacts.map((contact, index) => (
                  <IonCol key={index} size="3" className="contact-item">
                    <div
                      className={`contact-avatar ${selectedMembers.some((m) => m.user.phone === contact.phone) ? "selected" : ""}`}
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
          ) : (
            // All Contacts List View (Scrollable, Max 4 contacts at a time)
            <IonList>
              {filteredAllContacts.slice(0, 4).map((contact, index) => (
                <IonItem key={index} button onClick={() => toggleSelection(contact)}>
                  <IonAvatar slot="start">
                    <div className="contact-initials">{getNameInitials(contact.name)}</div>
                  </IonAvatar>
                  <IonLabel>
                    <h3>{contact.name}</h3>
                    <p>{contact.phone}</p>
                  </IonLabel>
                  {selectedMembers.some((m) => m.user.phone === contact.phone) && <IonIcon icon={closeOutline} />}
                </IonItem>
              ))}
            </IonList>
          )}
        </div>

        {/* Selected Members Section (Title Fixed, List Scrollable) */}
        {selectedMembers.length > 0 && (
          <div className="selected-members-container">
            <h4 className="selected-members-title">Selected Members</h4>
            <IonList className="scrollable-selected-members">
              {selectedMembers.map((member, index) => (
                <IonItem key={index} button onClick={() => toggleSelection(member.user)}>
                  <IonAvatar slot="start">
                    <div className="contact-initials">{getNameInitials(member.user.name)}</div>
                  </IonAvatar>
                  <IonLabel>
                    <h3>{member.user.name}</h3>
                    <p>{member.user.phone}</p>
                  </IonLabel>
                  <IonIcon icon={closeOutline} />
                </IonItem>
              ))}
            </IonList>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="swiper__footer slot-footer">
        <div className="footer-counter">
          <IonText color="medium">
            Members: <strong>{selectedMembers.length}</strong> / <strong>{maxMembers}</strong>
          </IonText>
          <IonText color="medium">
            Remaining: <strong>{maxMembers - selectedMembers.length}</strong>
          </IonText>
        </div>

        <IonButton expand="block" onClick={() => swiper.slideNext()}>
          Next: Review Circle Details
        </IonButton>
      </div>
    </div>
  );
};

export default MemberSelectionSlide;
