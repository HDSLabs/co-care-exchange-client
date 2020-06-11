/**
 * Guard to routes based on being autenticated
 * Due to some info being in cognito and profile info being in a separate datastore
 * there is an option property that can be used on routes with this guard
 * allowNoProfile: true|false
 * Default: false
 */

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../services/cce/authentication.service';
import { map, take } from 'rxjs/operators';
import { WELCOME_ROUTE } from '../constants/routes';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authenticationService: AuthenticationService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let allowNoProfile = false;
    try {
      allowNoProfile = !!route.data.allowNoProfile;
    } catch (e) {}
    return this.authenticationService.isLoggedIn$.pipe(
      take(1),
      map(loggedIn => {
        // WIP: need to resolve user profile and then observable before we continue
        // const user = this.authenticationService.getUser();
        // may need to move allowNoProfile to a resolver that attempt to get the userProfile if it DNE
        // if (loggedIn && allowNoProfile === !!!user.userProfile) {
        //   console.log('DEBUG Logged in user missing profile....logging user out');
        //   this.authenticationService.logout(user.username).then(() => {
        //       return false;
        //   });
        // }
        return loggedIn ? loggedIn : this.router.createUrlTree(['/', WELCOME_ROUTE]);
      })
    );
  }
}
