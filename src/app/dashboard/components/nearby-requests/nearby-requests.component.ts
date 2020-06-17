import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject, combineLatest, of, concat } from 'rxjs';
import { map, switchMap, startWith, filter } from 'rxjs/operators';
import { Agreement } from '../models/agreement';
import { NearbyRequestsGQL } from 'src/app/graphql/generatedSDK';
import { AuthenticationService } from 'src/app/core/services/cce/authentication.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-nearby-requests',
  templateUrl: './nearby-requests.component.html',
  styleUrls: ['./nearby-requests.component.scss', '../dashboard.component.scss', '../nearby-items/nearby-items.component.scss']
})
export class NearbyRequestsComponent implements OnInit, OnDestroy {
  vm$: Observable<{ state: string, requests: Array<Agreement> }>;
  user$: Observable<any>;
  filter = new FormControl('organization');
  filter$: Observable<string>;
  inputs$: Observable<any>;
  destroy$ = new Subject();

  constructor(
    private authSvc: AuthenticationService,
    private nearbyRequestsQuery: NearbyRequestsGQL) {
  }

  ngOnInit() {
    this.user$ = this.authSvc.auth$.pipe(
      filter((authState) => authState.user && authState.user.userProfile),
      map((authState) => authState.user.userProfile)
    );

    this.filter$ = concat(of('organization'), this.filter.valueChanges);
    this.inputs$ = combineLatest([this.filter$, this.user$]);
    this.vm$ = this.inputs$.pipe(
      switchMap(([filterVal, user]) => this.getNearbyRequests(user.id, filterVal)),
      startWith({ state: 'loading', requests: [] })
    );
  }

  getNearbyRequests(userId: string, filterVal: string) {
    // TODO: pass filter val once API support is there.
    return this.nearbyRequestsQuery.watch({ userId })
      .valueChanges
      .pipe(
        map((results: any) => {
          return {
            state: 'done',
            requests: results.data && results.data.nearbyRequests && results.data.nearbyRequests.requested.length ?
              results.data.nearbyRequests.requested :
              []
          };
        })
      );
  }

  formatItemDetails(agreement: Agreement) {
    return `${agreement.quantity}${agreement.unitOfIssue ? ', ' + agreement.unitOfIssue : ''}${agreement.details ? ', ' + agreement.details : ''}`
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}