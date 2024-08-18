import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

//components
import { AppComponent } from './components/app.component';
import { LoginComponent } from './components/login/login.component';
import { AlbumsComponent } from './components/albums/albums.component';
import { PhotosByAlbumComponent } from './components/photos-by-album/photos-by-album.component';
import { LightboxGalleryComponent } from './components/lightbox-gallery/lightbox-gallery.component';
import { DeleteModalComponent } from './components/delete-modal/delete-modal.component';

//pipes
import { FilterPipe } from './shared/pipes/filter.pipe';

//services
import { AlbumService, LightboxService, ModalService } from './shared/services';

@NgModule({
  declarations: [
   AppComponent,
   LoginComponent,
   AlbumsComponent,
   PhotosByAlbumComponent,
   LightboxGalleryComponent,
   DeleteModalComponent,
   FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    FormsModule,
  ],
  providers: [LightboxService, ModalService, AlbumService],
  bootstrap: [AppComponent],
})
export class AppModule {}
