export type ILoginUser = {
  email: string;
  password: string;
};

export type ILoginUserResponse = {
  accessToken: string;
  refreshToken?: string;
  isPasswordChangedRequired?: boolean;
};

export type IRefreshTokenResponse = {
  accessToken: string;
};

// export type IVerifiedLoginUser = {
//   userId: string;
//   role: ENUM_USER_ROLE;
// };
