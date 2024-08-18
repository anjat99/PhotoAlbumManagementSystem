import { Component, OnInit } from '@angular/core';
import { Album } from 'src/app/shared/interfaces';
import { AlbumService } from 'src/app/shared/services';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss'],
})
export class AlbumsComponent implements OnInit {
  constructor(private service: AlbumService) {}

  public albums: Album[] = [];
  album!: Album;
  users: any;
  photos: any;
  displayMode: any;
  lastPhoto!: string;
  tmpArray: any = [];

  ngOnInit(): void {
    this.service.getAllUsers().subscribe((Response) => {
      this.users = Response;
    });

    this.displayMode = 1;

    this.service.getAllPhotos().subscribe((data) => {
      this.photos = data;
      this.getAllAlbums();
    });
  }

  getAllAlbums() {
    this.service.getAllAlbums().subscribe((data) => {
      this.albums = data;

      for (let i = 0; i < this.albums.length; i++) {
        this.albums[i].photos = [];

        for (let j = 0; j < this.users.length; j++) {
          if (this.users[j].id == this.albums[i].userId) {
            this.albums[i].username = this.users[j].username;
            break;
          }
        }
      }

      for (let p = 0; p < this.photos.length; p++) {
        for (let i = 0; i < this.albums.length; i++) {
          if (this.photos[p].albumId == this.albums[i].id) {
            this.albums[i].photos.push(this.photos[p]);
          }
        }
      }

      for (let i = 0; i < this.albums.length; i++) {
        this.albums[i].thumbnail =
          this.albums[i].photos[this.albums[i].photos.length - 1].thumbnailUrl;
      }
    });
  }

  onDisplayModeChange(mode: number): void {
    this.displayMode = mode;
  }
}