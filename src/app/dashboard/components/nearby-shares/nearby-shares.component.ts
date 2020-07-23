import { Component, OnInit } from '@angular/core';
import { Observable, Subject, concat, combineLatest, of } from 'rxjs';
import { map, switchMap, startWith, filter, tap } from 'rxjs/operators';

import { DashboardItem, CceSDK } from 'src/app/graphql/generatedSDK';
import { AuthenticationService } from 'src/app/core/services/cce/authentication.service';
import { UIState } from 'src/app/core/constants/enums';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-nearby-shares',
  templateUrl: './nearby-shares.component.html',
  styleUrls: ['./nearby-shares.component.scss', '../dashboard.component.scss', '../nearby-items/nearby-items.component.scss']
})
export class NearbySharesComponent implements OnInit {
  vm$: Observable<{ state: UIState, shares?: Array<DashboardItem> }>;
  filter = new FormControl('');
  filter$: Observable<string>;
  inputs$: Observable<any>;
  destroy$ = new Subject();
  user$ = this.authSvc.auth$.pipe(
    filter((authState) => authState.user && authState.user.userProfile),
    map((authState) => authState.user.userProfile)
  );

  constructor(
    private authSvc: AuthenticationService,
    private api: CceSDK,
  ) { }

  ngOnInit() {
    this.filter$ = concat(this.getOrSetDefaultFilter(), this.filter.valueChanges).pipe(tap(filterVal => this.setFilter(filterVal)));
    this.inputs$ = combineLatest([this.filter$, this.user$]);
    this.vm$ = this.inputs$.pipe(
      switchMap(([filterVal, user]) => this.getNearbyShares(user.id, filterVal)),
      startWith({ state: UIState.Loading, shares: [] }),
    );
  }

  setFilter(filterVal: string) {
    localStorage.setItem('nearbySharesFilter', filterVal);
  }

  getOrSetDefaultFilter() {
    try {
      const filterVal = localStorage.getItem('nearbySharesFilter');
      if (filterVal) {
        this.filter.patchValue(filterVal);
        return of(filterVal);
      } else {
        // tslint:disable-next-line: no-string-throw
        throw 'filter value not present in local storage or falsey';
      }
    } catch (e) {
      console.log('error occurred getting filter state..defaulting to organization filter: ', e);
      this.filter.patchValue('showAllOrganization');
      return of('showAllOrganization');
    }
  }

  getNearbyShares(userId: string, filterVal: string): Observable<{ state: UIState, shares: Array<DashboardItem> }> {
    return this.api.nearbySharesWatch({ userId, filterOption: filterVal })
      .valueChanges
      .pipe(
        map((results: any) => {
          return {
            state: UIState.Done,
            shares: results.data && results.data.nearbyShares && results.data.nearbyShares.shared.length ?
              results.data.nearbyShares.shared :
              []
          };
        })
      );
  }
}
