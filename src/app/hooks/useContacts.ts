import {useEffect, useState} from "react";import {useEffect, useState} from "react";import { useEffect, useState } from "react";
import { Capacitor } from "@capacitor/core";
import { ContactPayload, Contacts } from "@capacitor-community/contacts";
import { UserService } from "../../services/user.service";
import { UserPayload } from "../generated/api";

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
          setError("Contacts permission denied");
          return;
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
        setError("Failed to fetch contacts");
      }
    };

    fetchContacts();
  }, []);

  return { filteredContacts, error };
};
