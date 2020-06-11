/**
 * Guard to be used on UNAUTH paths such as welcome that should be redirect to dashboard if already logged in
 */

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/cce/authentication.service';
import { map, take } from 'rxjs/operators';
import { DASHBOARD_ROUTE } from '../constants/routes';

@Injectable({
  providedIn: 'root',
})
export class LoggedInRedirectGuard implements CanActivate {
  constructor(private router: Router, private authenticationService: AuthenticationService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authenticationService.isLoggedIn$.pipe(
      take(1),
      map(x => {
        const user = this.authenticationService.getUser();
        if (!user || !user.userProfile) {
          console.log('DEBUG user logged in, but is not valid ', user);
        }
        return x ? this.router.createUrlTree(['/', DASHBOARD_ROUTE]) : true;
      })
    );
  }
}
