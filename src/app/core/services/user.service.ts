import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SaveUserInput } from '../../graphql/models/save-user-input.model';
import { UserProfile } from 'src/app/models/UserProfile';
import { AuthenticationService } from './cce/authentication.service';

const UserForEmail = gql`
  query UserForEmail($emailAddress: String!) {
    users(where: { emailAddress: $emailAddress }) {
      id
      firstName
      lastName
      emailAddress
      phoneNumber
      address
      city
      state
      postalCode
      dropOffRadius
      pickupRadius
      organization {
        id
        name
      }
      householdSize
      sendEmailMatchNotifications
    }
  }
`;

const SaveUser = gql`
  mutation UserMutation($input: SaveUserInput!) {
    saveUser(input: $input) {
      user {
        id
        emailAddress
        phoneNumber
        firstName
        lastName
        organization {
          id
          name
        }
        householdSize
      }
      clientMutationId
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  currentUserProfile = null;

  constructor(private apollo: Apollo, private authService: AuthenticationService) {}

  getCurrentUser(): any {
    return this.authService.getUser();
  }

  getCurrentUsername(): any {
    return this.authService.getUsername();
  }

  getCurrentUserEmail(): string {
    return this.authService.getEmail();
  }

  getCurrentUser$(): any {
    return this.authService.getUser$();
  }

  // async getCurrentUser(): Promise<any> {
  //   return await this.authService.getUser();
  // }

  getCurrentUserProfile(): any {
    if (!this.currentUserProfile) {
      const user = this.getCurrentUser();
      return user ? user.userProfile : null;
    }
    return this.currentUserProfile;
  }

  logout(): any {
    return this.authService.logout(this.getCurrentUsername());
  }

  getUser(emailAddress: string): Observable<UserProfile> {
    console.log('DEBUG getUser ', emailAddress);
    return this.apollo
      .query({
        query: UserForEmail,
        variables: {
          emailAddress: emailAddress,
        },
      })
      .pipe(
        map((response: any) => {
          console.log('DEBUG DATA ', response);
          const data = response.data;
          this.currentUserProfile = data.users && data.users.length ? data.users[0] : null;
          this.authService.saveUserProfile(emailAddress, this.currentUserProfile);
          return this.currentUserProfile;
        })
      );
  }

  saveUser(userProfile: SaveUserInput) {
    console.log('DEBUG save user ', userProfile);
    return this.apollo
      .mutate({
        mutation: SaveUser,
        variables: {
          input: userProfile,
        },
      })
      .pipe(
        map((response: any) => {
          console.log('DEBUG CREATE USER DATA ', response);
          const data = response.data;
          this.currentUserProfile = data.saveUser && data.saveUser.user ? data.saveUser.user : null;
          this.authService.saveUserProfile(userProfile.emailAddress, this.currentUserProfile);
          return this.currentUserProfile;
        })
      );
  }
}
