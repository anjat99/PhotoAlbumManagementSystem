import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PATHS } from '../constants';
import { Observable } from 'rxjs';
import { Album, Photo, User } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class AlbumService {
  constructor(private http: HttpClient) {}

  getAllAlbums(): Observable<Album[]> {
    return this.http.get<Album[]>(PATHS.albums);
  }

  getAllPhotos(): Observable<Photo[]> {
    return this.http.get<Photo[]>(PATHS.photos);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(PATHS.users);
  }

  getAllPhotosOfAlbum(page: number, album: number): Observable<Photo[]> {
    return this.http.get<Photo[]>(
      `${PATHS.albums}/${album}/photos?_page=${page}&_limit=12`
    );
  }
}