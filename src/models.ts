export interface SignupUser {
  name: string
  email: string;
  role: UserRoles;
  clerkUserId: string
}

export enum UserRoles {
  ADMIN = 'ADMIN',
  TRAINER = 'TRAINER',
  MEMBER = 'MEMBER',
}