import { useEffect, useState } from "react";
import { Capacitor } from "@capacitor/core";
import { ContactPayload, Contacts } from "@capacitor-community/contacts";
import { UserService } from "../../services/user.service";
import { UserPayload } from "../generated/api";

/**
 * Fetches contacts for the user:
 * - On Web:
 *   - Frequent contacts = Backend users.
 *   - All contacts = Same as frequent contacts.
 * - On Mobile:
 *   - Frequent contacts = Backend users.
 *   - All contacts = Mobile device contacts (including avatars if available).
 * - Handles permissions for fetching contacts on mobile.
 */
export const useFilteredContacts = () => {
  const [frequentContacts, setFrequentContacts] = useState<UserPayload[]>([]);
  const [allContacts, setAllContacts] = useState<UserPayload[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        // Step 1: Fetch frequent contacts from backend (same for Web & Mobile)
        const backendContacts = await UserService.getAllUsers();
        setFrequentContacts(backendContacts);

        if (!Capacitor.isNativePlatform()) {
          // Web: Set allContacts same as frequentContacts (backend users)
          setAllContacts(backendContacts);
          return;
        }

        // Step 2: Check permission to access device contacts on mobile
        const permissionStatus = await Contacts.checkPermissions();
        if (permissionStatus.contacts !== "granted") {
          const requestStatus = await Contacts.requestPermissions();

          console.log("Permission requestStatus: ", requestStatus);
          if (requestStatus.contacts !== "granted") {
            setError("Contacts permission denied by user.");
            setAllContacts([]); // Ensure allContacts is empty if permission is denied
            return;
          }
        }

        // Step 3: Fetch all contacts from the mobile device (including avatars)
        const nativeContacts = await Contacts.getContacts({
          projection: { phones: true, image: true }, // Enable fetching contact images
        });

        const allContactsUserPayload: Partial<UserPayload>[] = nativeContacts.contacts.map(
          (contact: ContactPayload) => ({
            id: undefined,
            name: contact.name?.display || undefined,
            phone: contact.phones?.[0]?.number || undefined,
            // avatar: contact.image?.[0]?.path || null, // Retrieve the avatar path if available
            // status: MemberStatus.Pending, // Default status for mobile contacts,
          }),
        );

        setAllContacts(allContactsUserPayload as UserPayload[]);
      } catch (err) {
        console.error("Failed to fetch contacts: ", err);
        setError("Failed to fetch contacts");
      }
    };

    fetchContacts();
  }, []);

  return { frequentContacts, allContacts, error };
};
