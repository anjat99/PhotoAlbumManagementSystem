import {
  Component,
  Input,
  OnInit,
  QueryList,
  ViewChildren,
  ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Photo } from 'src/app/shared/interfaces';
import { LightboxGalleryComponent } from '../lightbox-gallery/lightbox-gallery.component';
import { AlbumService, LightboxService, ModalService } from 'src/app/shared/services';

@Component({
  selector: 'app-photos-by-album',
  templateUrl: './photos-by-album.component.html',
  styleUrls: ['./photos-by-album.component.scss'],
  encapsulation: ViewEncapsulation.None 
})
export class PhotosByAlbumComponent implements OnInit {
  @ViewChildren(LightboxGalleryComponent)
  private lightboxGalleries!: QueryList<LightboxGalleryComponent>;
  @Input() isLightboxEnabled: boolean = false;

  albumId!: number;
  photos: Photo[] = [];
  displayedPhotos: Photo[] = [];
  currentDisplayMode: number = 1;
  searchTerm: string = '';
  currentPage: number = 1;
  slideIndex: number = 0;
  slides: HTMLElement[] = [];
  isPhotoDeleted: boolean = false;

  bodyText!: string;
  newPhotos: any[] = [];
  albums: any[] = [];
  count: number = 0;

  constructor(
    private albumService: AlbumService,
    private route: ActivatedRoute,
    private modalService: ModalService,
    private lightboxService: LightboxService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.albumId = +params['id'];
      this.loadPhotos();
    });
  }

  loadPhotos(): void {
    this.albumService
      .getAllPhotosOfAlbum(this.currentPage, this.albumId)
      .subscribe((photos: Photo[]) => {
        this.photos = photos.filter((photo) => photo.albumId === this.albumId);
        this.displayedPhotos = [...this.photos];
        localStorage.setItem('photos', JSON.stringify(this.displayedPhotos));
        this.showSlide(this.slideIndex);
      });
  }

  changeDisplayMode(mode: number): void {
    this.currentDisplayMode = mode;
  }

  loadMorePhotos(): void {
    this.currentPage++;
    this.loadPhotos();
  }

  deletePhoto(photoId: number): void {
    const storedPhotos = JSON.parse(
      localStorage.getItem('photos') || '[]'
    ) as Photo[];
    this.photos = storedPhotos.map((photo) =>
      photo.id === photoId ? { ...photo, isDeleted: true } : photo
    );
    localStorage.setItem('photos', JSON.stringify(this.photos));
    this.displayedPhotos = this.photos;
  }

  openModal(modalId: number): void {
    this.modalService.open(modalId);
  }

  closeModal(modalId: number): void {
    this.modalService.close(modalId);
  }

  openLightbox(photoId: number): void {
    this.lightboxService.open(photoId);
    this.showSlide(this.slideIndex);
  }

  closeLightbox(photoId: number): void {
    this.lightboxService.close(photoId);
  }

  changeSlide(offset: number): void {
    this.showSlide((this.slideIndex += offset));
  }

  setCurrentSlide(index: number): void {
    this.showSlide((this.slideIndex = index));
  }

  private showSlide(index: number): void {
    this.slides = Array.from(
      document.getElementsByClassName('img-slides')
    ) as HTMLElement[];
    const lightboxGalleries = Array.from(
      document.getElementsByTagName('app-lightbox-gallery')
    ) as HTMLElement[];

    if (index > this.slides.length) this.slideIndex = 1;
    if (index < 1) this.slideIndex = this.slides.length;

    for (let i = 0; i <  this.slides.length; i++) {
      this.isLightboxEnabled = false;
   }

    this.isLightboxEnabled = true;

    const currentGallery = lightboxGalleries[this.slideIndex - 1];

    if(this.isLightboxEnabled) {

      for (let i = 0; i <  lightboxGalleries.length; i++) {
        currentGallery.style.display = 'block';
        lightboxGalleries[i].style.display = "none"
     }
    }
  }
}