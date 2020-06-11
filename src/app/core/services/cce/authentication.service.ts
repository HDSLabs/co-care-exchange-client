import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { currentAuthenticatedUser, getCurrentUserInfo, signIn, signOut } from '../../../aws-cognito/cognito/signin';
import { changePassword, forgetPassword, forgetPasswordComplete } from '../../../aws-cognito/cognito/password';
import { BasicRegistrationModel } from '../../../models/cce/basic-registration.model';
import { register } from '../../../aws-cognito/cognito/register';
import { filter, map, share } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AmplifyService } from 'aws-amplify-angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Auth } from '@aws-amplify/auth';
import { AuthState } from '../../models/auth-state.model';

const unAuthState: AuthState = {
  isLoggedIn: false,
  user: null,
  hasUserProfile: false,
};

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private readonly authStateSubject = new BehaviorSubject<AuthState>(null);

  /** AuthState as an Observable */
  readonly auth$ = this.authStateSubject.asObservable();
  private readonly userSubject = new BehaviorSubject<any>(undefined);
  private user$ = this.userSubject.pipe(share());

  readonly isLoggedIn$ = this.auth$.pipe(
    filter(x => !!x),
    map(state => state.isLoggedIn)
  );

  private user: any;
  signedIn = false;
  authState = null;
  constructor(private router: Router, private http: HttpClient, private amplifyService: AmplifyService) {
    this.amplifyService.authStateChange$.subscribe(authState => {
      console.log('DEBUG authState ', authState);
      console.log('DEBUG authState.state ', authState.state);
      const signedOut = this.authState === 'signedOut';
      this.authState = authState.state;
      this.signedIn = authState.state === 'signedIn';

      if (this.signedIn && authState.user) {
        this.user = authState.user;
        if (this.signedIn && this.user) {
          this.user.userProfile = this.getUserProfile(this.user.username);
        }
        console.log('DEBUG AuthenticationService this.user ', this.user);
        // TODO -- should this resolver load the user profile? I say yes, bue the logic and testing is bigger
        // so for not, if proior state was signedout and there is no user profile, allow auth to continue and app
        // can load userprofile
        // if (!wasSignedOut && !this.user.userProfile) {
        //   // got user but no profile...not a valid user, make user login
        //   console.error('Invalid user for login, user profile missing');
        //   this.signedIn = false;
        //   const username = this.user.username;
        //   this.user = null;
        //   this.logout(username).then();
        // }
        const userAuthState: AuthState = {
          isLoggedIn: true,
          user: this.user,
          hasUserProfile: !!this.user.userProfile,
        };
        this.authStateSubject.next(userAuthState);
      } else {
        if (this.user) {
          const username = this.user.username;
          this.user = null;
          this.logout(username).then();
          this.authStateSubject.next(unAuthState);
          this.router.navigate(['/']);
        }
        this.authStateSubject.next(unAuthState);
      }

      // if (!authState.user) {
      //   this.user = null;
      //   this.authStateSubject.next(unAuthState);
      // } else {
      //   this.user = authState.user;
      //   if (this.signedIn && this.user) {
      //     this.user.userProfile = this.getUserProfile(this.user.username);
      //   }
      //   console.log('DEBUG AuthenticationService this.user ', this.user);
      //   // TODO -- should this resolver load the user profile? I say yes, bue the logic and testing is bigger
      //   // so for not, if proior state was signedout and there is no user profile, allow auth to continue and app
      //   // can load userprofile
      //   if (!wasSignedOut && !this.user.userProfile) {
      //     // got user but no profile...not a valid user, make user login
      //     console.error('Invalid user for login, user profile missing');
      //     this.signedIn = false;
      //     const username = this.user.username;
      //     this.user = null;
      //     this.logout(username).then();
      //   }
      // }
      this.userSubject.next(this.user);
    });
  }

  getUser$(): any {
    return this.user$;
  }

  getUser(): any {
    return this.user;
  }

  saveUserProfile(username: string, profile: unknown): void {
    if (!username) {
      return;
    }
    const key = `${username}.userProfile`;
    window.localStorage.setItem(key, JSON.stringify(profile));
    if (this.user) {
      this.user.userProfile = profile;
    }
  }

  getUserProfile(username: string): unknown {
    const key = `${username}.userProfile`;
    const up = window.localStorage.getItem(key);
    if (up) {
      const profile = JSON.parse(up);
      return profile;
    }
    return null;
  }

  getIdToken(): string {
    return this.user && this.user.getSignInUserSession ? this.user.getSignInUserSession().getIdToken() : '';
  }

  getFirstName(): string {
    return this.user ? this.user.attributes.given_name : '';
  }

  getLastName(): string {
    return this.user ? this.user.attributes.family_name : '';
  }

  getUsername(): string {
    return this.user ? this.user.username : '';
  }

  getEmail(): string {
    return this.user ? this.user.attributes.email : '';
  }

  getGroups(): string[] {
    // TODO move cognito specific stuff out of here and consider using a proxy/lens
    if (!this.user || !this.user.signInUserSession) {
      return [];
    }
    const userGroups = this.user.signInUserSession.accessToken.payload['cognito:groups'];
    return userGroups || [];
  }

  isInGroup(group: string): boolean {
    if (!group) {
      return false;
    }
    return this.getGroups().includes(group);
  }

  async register(registrationModel: BasicRegistrationModel) {
    // TODO: re-eval...get ride of reg service?
    // return this.registrationService.register(registrationModel);
    return await register(registrationModel);
  }

  async signIn(username: string, password: string) {
    const result = await signIn(username, password);
    this.user = result.user;
    console.log('signIn- this.user', this.user);
    return result;
  }

  async forgetPassword(username: string) {
    return forgetPassword(username);
  }

  async forgetPasswordComplete(username: string, code: string, newPassword: string) {
    return forgetPasswordComplete(username, code, newPassword);
  }

  async changePassword(oldPassword: string, newPassword: string) {
    if (!this.user) {
      throw new Error('Please signin before changing password');
    }
    return changePassword(this.user, oldPassword, newPassword);
  }

  login(email: string, password: string) {
    console.log(environment.serverUrl);
    return this.http.post(`${environment.serverUrl}authenticate`, { email, password }).pipe(map((response: any) => {}));
  }

  async logout(username?: string): Promise<boolean> {
    console.log('DEBUG logout user ', username);
    // remove user from local storage to log user out
    // this.user = null;
    await signOut();
    if (username) {
      const key = `${username}.userProfile`;
      localStorage.removeItem(key);
    }
    return Promise.resolve(true);
  }
}
