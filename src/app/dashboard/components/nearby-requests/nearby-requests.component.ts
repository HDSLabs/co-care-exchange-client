import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject, combineLatest, of, concat } from 'rxjs';
import { map, switchMap, startWith, filter, tap } from 'rxjs/operators';
import { DashboardItem, CceSDK } from 'src/app/graphql/generatedSDK';
import { AuthenticationService } from 'src/app/core/services/cce/authentication.service';
import { FormControl } from '@angular/forms';
import { UIState } from 'src/app/core/constants/enums';

@Component({
  selector: 'app-nearby-requests',
  templateUrl: './nearby-requests.component.html',
  styleUrls: ['./nearby-requests.component.scss', '../dashboard.component.scss', '../nearby-items/nearby-items.component.scss']
})
export class NearbyRequestsComponent implements OnInit, OnDestroy {
  vm$: Observable<{ state: UIState, requests?: Array<DashboardItem> }>;
  user$: Observable<any>;
  filter = new FormControl('');
  filter$: Observable<string>;
  inputs$: Observable<any>;
  destroy$ = new Subject();

  constructor(
    private authSvc: AuthenticationService,
    private api: CceSDK,
  ) {
  }

  ngOnInit() {
    this.user$ = this.authSvc.auth$.pipe(
      filter((authState) => authState.user && authState.user.userProfile),
      map((authState) => authState.user.userProfile)
    );

    this.filter$ = concat(this.getOrSetDefaultFilter(), this.filter.valueChanges).pipe(tap(filterVal => this.setFilter(filterVal)));
    this.inputs$ = combineLatest([this.filter$, this.user$]);
    this.vm$ = this.inputs$.pipe(
      switchMap(([filterVal, user]) => this.getNearbyRequests(user.id, filterVal)),
      startWith({ state: UIState.Loading, requests: [] })
    );
  }

  getNearbyRequests(userId: string, filterVal: string) {
    return this.api.nearbyRequestsWatch({ userId, filterOption: filterVal })
      .valueChanges
      .pipe(
        map((results: any) => {
          return {
            state: UIState.Done,
            requests: results.data && results.data.nearbyRequests && results.data.nearbyRequests.requested.length ?
              results.data.nearbyRequests.requested :
              []
          };
        })
      );
  }

  setFilter(filterVal: string) {
    localStorage.setItem('nearbyRequestFilter', filterVal);
  }

  getOrSetDefaultFilter() {
    try {
      const filterVal = localStorage.getItem('nearbyRequestFilter');
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

  formatItemDetails(agreement: DashboardItem) {
    return `${agreement.quantity}${agreement.unitOfIssue ? ', ' + agreement.unitOfIssue : ''}${agreement.details ? ', ' + agreement.details : ''}`
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
