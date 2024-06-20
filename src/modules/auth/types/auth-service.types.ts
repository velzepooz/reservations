import { IUser } from '../../user/types/user-repository.types';

export type signUpDataType = {
  username: string;
  password: string;
  confirmPassword: string;
};

export type signInDataType = {
  username: string;
  password: string;
};

export type AuthResponse = {
  user: IUser;
  authCookie: {
    name: string;
    token: string;
    options: {
      httpOnly: boolean;
      maxAge: number;
    };
  };
};
