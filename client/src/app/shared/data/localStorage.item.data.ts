export const LOCALSTORAGE_ITEMS: LocalStorageItems = {
  firstName: "firstName",
  lastName: "lastName",
  email: "email",
  username: "username",
  password: "password",
  access_token: "accessToken",
  refreshToken: "refreshToken",
  accessTokenStoreTime: "accessTokenStoredAt", // should be in milliseconds
  accessTokenPeriod: "accessTokenPeriod",
  refreshTokenStoreTime: "refreshTokenStoredAt", // should be in milliseconds
  refreshTokenPeriod: "refreshTokenPeriod",
  actionTypes: "actionTypes",
  selectedLanguage: "selectedLanguage",
};

export interface LocalStorageItems {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  access_token: string;
  refreshToken: string;
  accessTokenStoreTime: string;
  accessTokenPeriod: string;
  refreshTokenStoreTime: string;
  refreshTokenPeriod: string;
  actionTypes: string;
  selectedLanguage: string;
}
