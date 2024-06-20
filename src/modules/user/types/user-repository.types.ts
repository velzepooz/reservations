export type IUser = {
  id: number;
  username: string;
};

export type IUserWithPassword = IUser & {
  password: string;
};
