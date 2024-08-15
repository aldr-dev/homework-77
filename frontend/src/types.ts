export interface GuestBookDataForm {
  author: string;
  message: string;
  image: File | null;
}

export interface GuestBookData extends GuestBookDataForm {
  id: string;
}