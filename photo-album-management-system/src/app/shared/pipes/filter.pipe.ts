import { Pipe, PipeTransform } from '@angular/core';
import { Photo } from '../interfaces';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(photos: Photo[], searchTerm: string): Photo[] {
    if (!photos || !searchTerm) {
      return photos;
    }

    return photos.filter(
      (photo) =>
        photo.title.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
    );
  }
}
