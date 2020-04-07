import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SaveUserInput } from '../../graphql/models/save-user-input.model';
import { UserProfile } from 'src/app/models/UserProfile';

const UserForEmail = gql`
  query UserForEmail($emailAddress: String!) {
    users(where: { emailAddress: $emailAddress }) {
      id,
      firstName,
      lastName,
      emailAddress,
      phoneNumber,
      address,
      city,
      state,
      postalCode,
      dropOffRadius,
      pickupRadius,
      organization {
        id,
        name
      }
    }
  }
`;

const SaveUser = gql`
  mutation UserMutation($input: SaveUserInput!) {
    saveUser(input: $input) {
      user {
        id,
        emailAddress,
        phoneNumber,
        firstName,
        lastName,
        organization {
          id,
          name
        }
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
  
  constructor(private apollo: Apollo) {}

  getCurrentUserProfile(): SaveUserInput {
    return this.currentUserProfile;
  }

  getUser(emailAddress: String): Observable<UserProfile> {
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
          return this.currentUserProfile;
        })
      );
    // this.apollo
    //     .query({
    //       query: gql`
    //       {
    // users(where: { emailAddress: "scarlet@dfb.org"}) {
    //     id,
    //     emailAddress
    // }
    //       }
    //     `,
    //     })
    //     .subscribe(console.log);
    // const query = {
    //   query: 'query GetPrompts {prompts{id,audience,display,groupName,promptType,sizes,item,unitsOfIssue}}',
    //   variables: {},
    // };
    // return this.http.post<any>(`${environment.serverUrl}`, query);
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
          this.currentUserProfile = data.createUser && data.createUser.user ? data.createUser.user : null;
          return this.currentUserProfile;
        })
      );
  }
}

// query Users {
//   organizations {
//     id,
//         name
//   }
// }
