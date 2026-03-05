export interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  plan: string;
}

export interface AuthResponse {
  id: string;
  access_token: string;
  token_type: string;
  firstname: string;
  lastname: string;
  email: string;
  plan: string;
}