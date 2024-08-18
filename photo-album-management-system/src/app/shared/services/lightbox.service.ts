import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LightboxService {
  private modals: any[] = [];

  constructor() {}

  add(modal: any) {
    // add modal to array of active modals
    this.modals.push(modal);
  }

  remove(id: number) {
    // remove modal from array of active modals
    this.modals = this.modals.filter((x) => x.id !== id);
  }

  open(id: number) {
    // open modal specified by id
    const modal = this.modals.find((x) => x.id == id);
    modal.open();
  }

  close(id: number) {
    // close modal specified by id
    const modal = this.modals.find((x) => x.id == id);
    modal.close();
  }
}