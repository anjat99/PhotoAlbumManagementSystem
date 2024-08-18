import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotosByAlbumComponent } from './photos-by-album.component';

describe('PhotosByAlbumComponent', () => {
  let component: PhotosByAlbumComponent;
  let fixture: ComponentFixture<PhotosByAlbumComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PhotosByAlbumComponent]
    });
    fixture = TestBed.createComponent(PhotosByAlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
