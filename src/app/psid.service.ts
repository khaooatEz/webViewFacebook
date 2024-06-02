import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PsidService {
  private psid!: string;

  setPsid(psid: string) {
    this.psid = psid;
  }

  getPsid(): string {
    return this.psid;
  }
}
