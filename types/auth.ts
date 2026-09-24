export interface User {
  id: string;
  fullName: string;
  email: string;
  registrationCompleted: boolean;
  currentRegistrationStep: number;
}

export interface AuthTokens {
  accessToken: string;
}

export interface LoginResponse {
  accessToken: string;
  user: User;
}

export interface RegisterResponse {
  userId: string;
  currentStep: number;
  emailVerified: boolean;
}
