import { useEffect, useState } from "react";
import { Capacitor } from "@capacitor/core";
import { ContactPayload, Contacts } from "@capacitor-community/contacts";
import { UserService } from "../../services/user.service";
import { UserPayload } from "../generated/api";

/**
 * Fetches contacts from the user's device (mobile)
 * Fetches contacts from the backend, but only the users who are members of this current user circles (Frequently contacts)
 * will have 2 tabs: 1. Frequent contacts (from backend) 2. All contacts (from mobile contacts)
 * once select one from the all contact, check if not registered user, then add him without id
 *
 * Steps:
 * 1. If (web), fetch all users from the backend and set the `filteredContacts` state to those users.
 * 2. If on a native platform (mobile), check if the app has permission to access the user's contacts.
 * 3. If not, ask user to give permission to access contacts.
 * 3. If the app has permission, fetch the user's contacts from the device.
 * 4. Fetch all registered users from the backend.
 * 8. If there was an error at any step, set the `error` state to the error message.
 */
export const useFilteredContacts = () => {
  const [filteredContacts, setFilteredContacts] = useState<UserPayload[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const backendContacts = await UserService.getAllUsers();

        if (!Capacitor.isNativePlatform()) {
          // Browser: Show all users from Backend
          console.log("filteredContacts", backendContacts);
          setFilteredContacts(backendContacts);
          return;
        }

        // Mobile: Use Capacitor to fetch device contacts
        const permissionStatus = await Contacts.checkPermissions();
        if (permissionStatus.contacts !== "granted") {
          const requestStatus = await Contacts.requestPermissions();

          console.log("Permission requestStatus: ", requestStatus);
          if (requestStatus.contacts !== "granted") {
            setError("Contacts permission denied by user.");
            return;
          }
        }

        const nativeContacts = await Contacts.getContacts({ projection: { phones: true } });
        const phoneNumbers = nativeContacts.contacts
          .filter((contact: any) => contact.phoneNumbers && contact.phoneNumbers.length)
          .map((contact: any) => contact.phoneNumbers[0].number);

        if (!phoneNumbers.length) return;

        const registeredUserPhones = backendContacts.map((user: any) => user.phoneNumber);

        // Filter native contacts to find those whose phone numbers match the BE registered users' phone numbers
        // as we want to show only the users from native contacts not from backend, but filtered
        const matchedContacts = nativeContacts.contacts.filter(
          (contact) => contact.phones && contact.phones[0] && registeredUserPhones.includes(contact.phones[0].number),
        );

        const matchedContactsUserPayload: UserPayload[] = matchedContacts.map(
          (contact: ContactPayload) =>
            ({
              id: contact.contactId,
              name: contact.name?.display || undefined,
              phone: contact.phones?.[0]?.number,
              status: "PENDING",
            }) as UserPayload,
        );

        setFilteredContacts(matchedContactsUserPayload);
      } catch (err) {
        console.error("Failed to fetch contacts: ", err);
        setError("Failed to fetch contacts");
      }
    };

    fetchContacts();
  }, []);

  return { filteredContacts, error };
};
