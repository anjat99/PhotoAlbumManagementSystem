import { Component, ElementRef, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { LightboxService } from 'src/app/shared/services';

@Component({
  selector: 'app-lightbox-gallery',
  templateUrl: './lightbox-gallery.component.html',
  styleUrls: ['./lightbox-gallery.component.scss'],
  encapsulation: ViewEncapsulation.None  
})
export class LightboxGalleryComponent implements OnInit {
  @Input() id!: number;
  @Input() isLightboxEnabled: boolean = false;
  private element: any;

  constructor(
    private lightboxService: LightboxService,
    private el: ElementRef
  ) {
    this.element = el.nativeElement;
  }

  ngOnInit(): void {
    if (!this.id) {
      console.error('modal must have an id');
      return;
    }

    document.body.appendChild(this.element);

    this.element.addEventListener('click', (el: any) => {
      if (el.target.className === 'jw-lightbox') {
        this.close();
      }
    });

    this.lightboxService.add(this);
  }

  ngOnDestroy(): void {
    this.lightboxService.remove(this.id);
    this.element.remove();
  }

  open(): void {
    this.element.style.display = 'block';
    document.body.classList.add('app-lightbox-gallery-open');
  }

  close(): void {
    this.element.style.display = 'none';
    document.body.classList.remove('app-lightbox-gallery-open');
  }
}