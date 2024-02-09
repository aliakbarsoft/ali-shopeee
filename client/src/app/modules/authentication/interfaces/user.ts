export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  newPassword: string;
}
export interface UserDTO {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
}
export interface LoginResultDTO {
  user: UserDTO;
  userName: string;
  role: string;
  actionTypes: string[];
  access_token: string;
  refreshToken: string;
  refreshTokenExpiration: 0;
  accessTokenExpiration: 0;
}

export interface LoginDTO {
  username: string;
  password: string;
}

export interface RefreshTokenResultDTO {
  actionTypes: string[];
  access_token: string;
  refreshToken: string;
  refreshTokenExpiration: 0;
  accessTokenExpiration: 0;
}
