import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material';
import { distinctUntilChanged, takeUntil, tap, map, catchError, take } from 'rxjs/operators';
import { Observable, Subject, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { groupBy } from 'lodash';

import { DashboardService } from 'src/app/core/services/cce/dashboard.service';
import { Status } from 'src/app/core/constants/enums';
import { Agreement } from './models/agreement';
import { ConfirmDeleteRequestComponent } from './confirm-delete-request/confirm-delete-request.component';

interface IDashboardGrouping {
  createdBy: string;
  items: Agreement[];
}
interface IDashboardViewModel {
  needs: IDashboardGrouping[];
  shares: IDashboardGrouping[];
  orgId?: string;
  filterState: string;
  loading: boolean;
}

@Component({
  selector: 'app-cce-home',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [
    trigger('rowAnimate', [
      state(
        'rowClosed',
        style({
          transform: 'translateX(0)',
        })
      ),
      state(
        'rowOpen',
        style({
          transform: 'translateX(-75px)',
        })
      ),
      transition('* => rowClosed', animate('0.25s')),
      transition('* => rowOpen', animate('0.25s')),
    ]),
  ],
})
export class DashboardComponent implements OnInit, OnDestroy {
  vm$: Observable<IDashboardViewModel>;
  isAlive: boolean;
  rowState: 'rowOpen' | 'rowClosed' | '';

  filter = new FormControl('');
  filter$: Observable<string>;

  status = Status;

  destroy$ = new Subject();

  isWeb: boolean;
  showTrash: boolean = false;

  constructor(
    public dialog: MatDialog,
    private dashboardService: DashboardService,
    private toastrService: ToastrService,
    private breakpointObserver: BreakpointObserver
  ) {
    this.breakpointObserver.observe([Breakpoints.Web]).subscribe(({ matches: isWeb }) => {
      this.isWeb = isWeb;
    });
  }

  ngOnInit() {
    this.dashboardService.startPolling();
    this.vm$ = this.dashboardService.state$.pipe(
      tap(dashboardState => {
        this.filter.patchValue(dashboardState.filterState);
      }),
      map(dashboardState => {
        return {
          ...dashboardState,
          shares: this.createGroupedEntries(dashboardState.shares),
          needs: this.createGroupedEntries(dashboardState.needs),
        };
      })
    );

    this.filter$ = this.filter.valueChanges.pipe(distinctUntilChanged(), takeUntil(this.destroy$));

    this.filter$.subscribe(filterValue => {
      this.dashboardService.changeFilterCriteria(filterValue);
    });
  }

  createGroupedEntries(agreements: Agreement[]) {
    const grouped: { [key: string]: Agreement[] } = groupBy(agreements, 'userDisplayName');
    return Object.entries(grouped).map(([name, items]) => {
      return {
        createdBy: name,
        items,
      };
    });
  }

  formatItemDetails(agreement: Agreement) {
    return `${agreement.quantity}${agreement.unitOfIssue ? ', ' + agreement.unitOfIssue : ''}${
      agreement.details ? ', ' + agreement.details : ''
    }`;
  }

  deleteItem(event, item: Agreement) {
    event.preventDefault();
    event.stopPropagation();

    const ref = this.dialog.open(ConfirmDeleteRequestComponent, {
      width: '300px',
      data: item,
    });

    ref
      .afterClosed()
      .pipe(take(1))
      .subscribe(results => {
        if (results === 'yep') {
          this.dashboardService
            .archiveItem(item.itemId)
            .pipe(
              takeUntil(this.destroy$),
              catchError(this.handleError),
              map((response: any) => {
                console.log('deleteItem', response);
                this.dashboardService.startPolling();
              })
            )
            .subscribe();
        } else {
          return;
        }
      });
  }

  toggleRowState(row: Agreement, animationState: 'rowOpen' | 'rowClosed' | '') {
    row.rowState = animationState;
    /**
     * dashboard service polling should probably be refactored, but this works around an issue
     * where the polling will close the row if it is open. This pauses polling while the row
     * is open. polling refactor could entail ability to pause polling and also override it.
     * A request should be able to be made on an event outside of the timer function emitting
     */
    if (animationState === 'rowOpen') {
      this.dashboardService.stopPolling();
    } else if (animationState === 'rowClosed') {
      this.dashboardService.startPolling();
    }
  }

  getStyle(status: Status): string {
    switch (status) {
      case Status.FindingMatch: {
        // Pending
        return 'contentstatusyellow';
      }
      case Status.NewMatchFound: {
        // Matched
        return 'contentstatusgreen';
      }
      case Status.OrderConfirmed: {
        // Confirmed
        return 'contentstatusyellow';
      }
      case Status.OrderFulfilled: {
        // Fulfilled
        return 'contentstatusgreen';
      }
      case Status.OrderCancelled: {
        // Cancelled
        return 'contentstatusred';
      }
      default:
        // there is no default, so error
        return 'contentstatusred';
    }
  }

  private handleError(err) {
    console.error('an error occurred deleting the dashboard item: ', err);
    this.toastrService.error('An unexpected error has occurred deleting the request. Please try again later.', null, {
      positionClass: 'toast-top-center',
    });
    return of(null);
  }

  ngOnDestroy() {
    this.dashboardService.stopPolling();
    this.destroy$.next();
    this.destroy$.complete();
  }

  showTrashClick(show: boolean) {
    this.showTrash = show;
  }
}
