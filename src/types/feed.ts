export type TFeed = {
  id: string;
  date: string;
  like: string[];
  photo: string[];
  tag?: string[];
  text: string;
  userId: string;
  userName: string;
  userProfileURL: string;
  save: string[];
  comment: { authorId: string; name: string; text: string; date: string }[];
};
