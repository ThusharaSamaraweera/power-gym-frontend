export interface IUser extends SignupUser{
  dateOfBirth?: string;
  gender?: string;
  image?: string;
  phone?: string;
  status: UserStatus
}

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


export enum UserStatus {
  ACTIVE = 'ACTIVE',
  DISABLED = 'DISABLED',
}