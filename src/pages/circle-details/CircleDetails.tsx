import { CircleMemberPayload, CirclePayload, MemberStatus } from "../../app/generated/api";
import useCurrentUser from "../../app/hooks/useCurrentUser";
import { IonActionSheet, IonButton, IonContent, IonPage, IonText, useIonAlert } from "@ionic/react";
import { useParams } from "react-router";
import React, { useEffect, useState } from "react";
import { CircleService } from "../../services/circle.service";
import CircleReview from "../circle/circle-review/CircleReview";
import PageHeader from "../../components/back-button/PageHeader";
import "./CircleDetails.scss";
import { getUserPayoutDate } from "../../app/helpers/circle-helpers";

const CircleDetails: React.FC = () => {
  const currentUser = useCurrentUser();
  const { circleId } = useParams<{ circleId?: string }>();
  const [currentCircleMember, setCurrentCircleMember] = useState<CircleMemberPayload | undefined>(undefined);
  const [circle, setCircle] = useState<CirclePayload | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [selectedSlot, setSelectedSlot] = useState<number | undefined>(undefined);
  const [showSlotPicker, setShowSlotPicker] = useState(false);
  const [presentAlert] = useIonAlert();

  useEffect(() => {
    if (circleId) {
      const fetchCircle = async () => {
        try {
          const data = await CircleService.getCircleById(circleId);
          if (!data) {
            console.error("Circle not found");
            return;
          }

          const currentCircleMember = data.members.find((m) => m.userId === currentUser?.id);

          setCircle(data);
          setCurrentCircleMember(currentCircleMember);
          setSelectedSlot(currentCircleMember?.slotNumber);
        } catch (error) {
          console.error("Error fetching circle:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchCircle().then();
    }
  }, [circleId, currentUser]);

  const handleReject = async () => {
    const alert = await presentAlert({
      header: "Reject Circle Invitation",
      message: "Are you sure you want to reject this circle invitation?",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
        },
        {
          text: "Reject",
          role: "destructive",
          handler: async () => {
            if (currentCircleMember) {
              await CircleService.updateCircleMember(currentCircleMember.id, {
                status: MemberStatus.Rejected,
              });
            }
          },
        },
      ],
    });
  };

  const handleJoin = async () => {
    if (!circle || !selectedSlot) {
      console.error("Circle or selectedSlot is undefined");
      return;
    }
    if (currentCircleMember) {
      await CircleService.updateCircleMember(currentCircleMember.id, {
        status: MemberStatus.Confirmed,
        slotNumber: selectedSlot,
        payoutDate: getUserPayoutDate(circle.startDate, selectedSlot!).toISOString(), // Format YYYY-MM-DD,,
      });
    }
  };

  if (loading) {
    return (
      <IonPage>
        <PageHeader title="Review Circle" />
        <IonContent>
          <div className="circle-review-card">
            <h2>Review Your Circle</h2>
            <IonText>Loading...</IonText>
          </div>
        </IonContent>
      </IonPage>
    );
  }

  if (!circle) {
    return (
      <IonPage>
        <PageHeader title="Review Circle" />
        <IonContent>
          <IonText>No circle found</IonText>
        </IonContent>
      </IonPage>
    );
  }

  // show the read only review + footer
  if (!currentCircleMember?.slotNumber) {
    return (
      <IonPage>
        <PageHeader title="Review Circle" />
        <IonContent>
          <>
            <div className={"circle-details__content"}>
              <CircleReview circle={circle} />
            </div>

            {/* Footer */}
            <div className="page__footer">
              <div className="slot-picker">
                {/* Link to open slot picker */}
                <IonButton fill="clear" color="primary" onClick={() => setShowSlotPicker(true)}>
                  Select Slot Number
                  <span style={{ fontSize: "0.7rem", paddingLeft: "8px" }}>(Your turn: {selectedSlot || "--"})</span>
                </IonButton>

                {/* Slot Selection Action Sheet */}
                <IonActionSheet
                  isOpen={showSlotPicker}
                  onDidDismiss={() => setShowSlotPicker(false)}
                  header="Select a Slot Number"
                  buttons={getAvailableSlots(circle).map((slot) => ({
                    text: `Slot ${slot}`,
                    handler: () => setSelectedSlot(slot),
                  }))}
                />
              </div>

              <div className="action-buttons">
                <IonButton className="half-button" expand="block" fill="outline" color="danger" onClick={handleReject}>
                  Reject
                </IonButton>

                <IonButton
                  className="half-button"
                  expand="block"
                  fill="solid"
                  color="primary"
                  onClick={handleJoin}
                  disabled={!selectedSlot}>
                  Join
                </IonButton>
              </div>
            </div>
          </>
        </IonContent>
      </IonPage>
    );
  }

  // show only the read only review
  return (
    <IonPage>
      <PageHeader title="Review Circle" />
      <IonContent>
        <CircleReview circle={circle} />
      </IonContent>
    </IonPage>
  );
};

const getAvailableSlots = (circle?: CirclePayload): number[] => {
  if (!circle || !circle.duration) return [];

  const totalSlots = Array.from({ length: circle.duration }, (_, i) => i + 1); // Generate slots from 1 to duration
  const reservedSlots = circle.members.map((m) => m.slotNumber).filter(Boolean); // Get reserved slots

  return totalSlots.filter((slot) => !reservedSlots.includes(slot)); // Return only available slots
};

export default CircleDetails;
