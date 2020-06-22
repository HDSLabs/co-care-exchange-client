import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavbarService {
  public login = new ReplaySubject(1);

  constructor() {}

  setLogin(success: boolean) {
    this.login.next(success);
  }
}
