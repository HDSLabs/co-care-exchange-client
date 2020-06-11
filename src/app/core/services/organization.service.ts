import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

const Organizations = gql`
  query Organizations {
    organizations {
      id
      name
    }
  }
`;

const UserOrganization = gql`
  query getUserOrganization($id: ID!) {
    organizations(where: { id: $id }) {
      id
      name
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class OrganizationService {
  currentOrgProfile: null;
  organizations: any[];
  constructor(private apollo: Apollo) {}

  // getCurrentOrgProfile() {
  //   return this.currentOrgProfile;
  // }

  // getUserOrganization(orgId: String): Observable<any> {
  //   console.log('DEBUG getUserOrganization by id', orgId);
  //   return this.apollo
  //     .query({
  //       query: UserOrganization,
  //       variables: {
  //         id: orgId
  //       },
  //     })
  //     .pipe(
  //       map((response: any) => {
  //         console.log('DEBUG DATA ', response);
  //         const data = response.data;
  //         this.currentOrgProfile = data.organizations && data.organizations.length ? data.organizations[0] : null;
  //         return this.currentOrgProfile;
  //       })
  //     );
  // }

  public getOrganizations$(): Observable<any> {
    return this.apollo
      .query({
        query: Organizations,
      })
      .pipe(
        map((response: any) => {
          console.log('DEBUG ORG DATA ', response);
          const data = response.data;
          // TODO refactor to a watch query vs one shot
          this.organizations = data.organizations;
          return data.organizations;
        })
      );
  }

  public getOrganizationsThatMatch(orgs: any[]): Observable<any[]> {
    if (!orgs) {
      return of([]);
    }
    // TODO consolidate with some inner observable magic
    if (!this.organizations) {
      return this.getOrganizations$().pipe(
        map(allOrgs => {
          return allOrgs.filter(ao => orgs.includes(ao.name));
        })
      );
    }
    const filtered = this.organizations.filter(ao => {
      return orgs.includes(ao.name);
    });
    return of(filtered);
  }
}
