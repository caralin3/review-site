import { Author, User, UserRole } from '..';

export interface UserResponse {
  user: User;
}

export interface RegisterUser {
  email: string;
  password: string;
  role: UserRole;
  username: string;
}

export interface RegisterUserRequest {
  user: RegisterUser;
}

export interface LoginUser {
  email: string;
  password: string;
}

export interface LoginUserRequest {
  user: LoginUser;
}

export interface UpdateUser {
  bio?: string;
  email?: string;
  image?: string;
  password?: string;
  username?: string;
}

export interface UpdateUserRequest {
  user: UpdateUser;
}

export interface ProfileRequest {
  username: string;
}

export interface ProfileResponse {
  profile: Author;
}
