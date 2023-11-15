import { atom } from "recoil";
import { TFeed } from "../../types/feed";

export const isAddFeedOnState = atom({
  key: "isAddFeedOn",
  default: false,
});
export const isDetailFeedOnState = atom({
  key: "isDetailFeedOnState",
  default: false,
});
export const detailFeedIdState = atom({
  key: "detailFeedIdState",
  default: "",
});
export const feedDataState = atom<TFeed[]>({
  key: "feedDataState",
  default: [],
});
