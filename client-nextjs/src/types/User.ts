export interface User {
  _id: string;
  name: string;
  password: string;
  email: string;
  isAdmin: boolean;
  token: string;
}

export interface AuthResponse {
  user: User;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}
