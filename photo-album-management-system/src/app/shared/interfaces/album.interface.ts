import { Photo } from "./photo.interface";

export interface Album {
  id: number;
  userId: number;
  title: string;
  username: string;
  photos: Array<Photo>;
  thumbnail: string;
}