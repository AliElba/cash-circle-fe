import { CircleMemberPayload, CirclePayload } from "../app/generated/api";

export interface User {
  id: string;
  email: string;
  password?: string | null; // Optional, as it is nullable in the schema
  firstName?: string | null; // Optional, as it is nullable in the schema
  lastName?: string | null; // Optional, as it is nullable in the schema
  status: "registered" | "unregistered";
  createdAt: Date;
  updatedAt: Date;

  // Relationships
  circlesOwned: CirclePayload[]; // List of circles owned by the user
  circleMemberships: CircleMemberPayload[]; // Memberships in different circles
}
