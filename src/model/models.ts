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
  circlesOwned: Circle[]; // List of circles owned by the user
  circleMemberships: CircleMember[]; // Memberships in different circles
}

export interface Circle {
  id: string;
  name: string;
  ownerId: string; // Foreign key to the User
  status: "pending" | "active" | "completed"; // Enum values
  createdAt: Date;

  // Relationships
  members: CircleMember[]; // List of members in the circle
}

export interface CircleMember {
  id: string;
  circleId: string; // Foreign key to the Circle
  userId: string; // Foreign key to the User
  slotNumber?: number | null; // Optional slot number
  status: "pending" | "confirmed"; // Enum values
  paymentStatus: "paid" | "pending"; // Enum values
  createdAt: Date;

  // Relationships
  circle: Circle; // Reference to the circle
  user: User; // Reference to the user
}
