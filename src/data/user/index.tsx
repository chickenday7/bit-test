import me from "@assets/me.png";

export const user: UserType = {
  name: "Pavel",
  avatar: me,
};

export type UserType = {
  name: string;
  avatar?: string;
};
