import { User } from '@prisma/client';

export type ILoginUser = {
  email: string;
  password: string;
};

export type ILoginUserResponse = {
  token: string;
  refreshToken?: string;
  isPasswordChangedRequired?: boolean;
  user?: User | null;
};

export type IRefreshTokenResponse = {
  accessToken: string;
};

// export type IVerifiedLoginUser = {
//   userId: string;
//   role: ENUM_USER_ROLE;
// };
