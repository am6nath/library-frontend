export interface AuthResponse {
  Message: string;
  Token: string;
  User: {
    UserId: number;
    Name: string;
    Email: string;
    Role: string;
    IsActive: boolean;
    CreatedAt: string;
  };
}