export interface GuestBookData {
  author: string;
  message: string;
  image: string | null;
}

export interface GuestBookWithId extends GuestBookData {
  id: string;
}