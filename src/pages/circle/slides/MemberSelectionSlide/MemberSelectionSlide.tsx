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
  const [selectedMembers, setSelectedMembers] = useState<CircleMemberPayload[]>(form.members || []); // ✅ Initialize from form.members
  const [searchQuery, setSearchQuery] = useState("");

  const maxMembers = form.duration; // Max members based on duration
  const isMaxReached = selectedMembers.length >= maxMembers;

  useEffect(() => {
    // ✅ If in edit mode (form.members has values), don't add owner again
    if (form.members?.length > 0) {
      setSelectedMembers(form.members);
    } else {
      // ✅ In create mode: Add owner automatically
      const ownerDetails = frequentContacts.find((contact) => contact.id === form.ownerId);
      if (ownerDetails && !selectedMembers.some((member) => member.userId === form.ownerId)) {
        const ownerMember: CircleMemberPayload = {
          userId: ownerDetails.id,
          user: {
            name: ownerDetails.name,
            phone: ownerDetails.phone,
          },
          status: MemberStatus.Confirmed,
        } as CircleMemberPayload;
        setSelectedMembers([ownerMember, ...selectedMembers]);
        updateForm("members", [ownerMember, ...selectedMembers]);
      }
    }
  }, [form.members, frequentContacts, form.ownerId]);

  // Apply search only to "All Contacts"
  const filteredAllContacts = allContacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Function to select/unselect a contact
  const toggleSelection = (contact: UserPayload) => {
    const isSelected = selectedMembers.some((member) => member.user.phone === contact.phone);

    let updatedMembers: CircleMemberPayload[];
    if (isSelected) {
      // Remove contact from selected members
      updatedMembers = selectedMembers.filter((member) => member.user.phone !== contact.phone);
    } else {
      if (isMaxReached) return; // Prevent adding more members if limit is reached
      updatedMembers = [...selectedMembers, mapUserToCircleMember(contact)];
    }

    // Update selected members
    setSelectedMembers(updatedMembers);
    updateForm("members", updatedMembers);
  };

  return (
    <div className="member-selection-slide swiper__slide-container">
      <div className="swiper__slide-content">
        <h2>Members Selection</h2>
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

        {/* Selected Members Section */}
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
