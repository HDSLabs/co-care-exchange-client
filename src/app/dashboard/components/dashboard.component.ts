import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { StatusDialogComponent } from './status-dialog/status-dialog.component';
import { DashboardService } from 'src/app/core/services/cce/dashboard.service';
import { Observable, timer, of } from 'rxjs';
import { catchError, map, switchMap, takeWhile } from 'rxjs/operators';
import { Agreement } from './models/agreement';
import { OrderStatusChangeModel } from 'src/app/models/cce/order-model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cce-home',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  dashboardPoll$: Observable<any>;
  dashboardData$: Observable<any>;
  needs$: Observable<any>;
  shares$: Observable<any>;
  isAlive: boolean;

  constructor(
    public dialog: MatDialog,
    private dashboardService: DashboardService,
    private toastrService: ToastrService) {
  }

  ngOnInit() {
    this.isAlive = true;
    this.dashboardPoll$ = timer(0, 5000).pipe(
      takeWhile(() => this.isAlive),
      switchMap(_ => {
        return this.dashboardService.getDashboard()
          .pipe(
            map((data: any) => {
              if (data && data.errors) {
                const messages = data.errors.map(e => e.message).join(', ');
                throw new Error(messages);
              }
              return data;
            }),
            catchError(error => {
              console.warn('an error occurred querying the dashboard', error.message);
              return of({ data: { dashboard: { requested: [], shared: []}}});
            })
          );
      })
    );
    this.dashboardData$ = this.dashboardPoll$.pipe(
      takeWhile(_ => this.isAlive),
      map((results: any) => results.data.dashboard)
    );
    this.needs$ = this.dashboardData$.pipe(map(dashboard => dashboard.requested));
    this.shares$ = this.dashboardData$.pipe(map(dashboard => dashboard.shared));
    this.needs$.subscribe(needs => {
      console.log('DASHBOARD NEEDS: ', needs);
    });
    this.shares$.subscribe(shares => {
      console.log('DASHBOARD SHARES: ', shares);
    });
  }

  handleStatusClick(agreement: Agreement) {
    const dialogRef = this.dialog.open(StatusDialogComponent, {
      width: '300px',
      data: agreement
    });

    dialogRef.afterClosed().subscribe(confirm => {

      if (confirm) {

        // if they hit OK/Yes, only update status if changing from 1=matched to 2=confirmed
        if (agreement.statusId === 0 || agreement.statusId === 2) return; // if pending or confirmed, noop
        if (agreement.statusId >= 3) return; // fulfilled or cancelled already; noop

        try {
          const orderChangeStatus: OrderStatusChangeModel = {
            orderId: agreement.orderId,
            userId: this.dashboardService.userProfile.id,
            newStatus: agreement.statusId++,
            reason: 'unknown',
            clientMutationId: '123456',
            requestId: agreement.requestId,
            shareId: agreement.shareId
          };

          let status = this.dashboardService.updateOrderStatus(orderChangeStatus).subscribe((val) => {
            console.log(val);
            if (val && val.errors && val.errors.length) {
              val.errors.forEach(e => {
                console.log('ORDER UPDATE ERROR', e.message);
                throw new Error(e.message);
              });
            } else {
              this.dashboardService.init();
            }
          });

          console.log('status', status);

        } catch (error) {
          this.toastrService.error(`Error: order status update request for ${agreement.name} failed.`, null, {
            enableHtml: true,
            disableTimeOut: true
          });
        }

      } else {

        try {
          const orderToCancel: OrderStatusChangeModel = {
            orderId: agreement.orderId,
            userId: this.dashboardService.userService.currentUserProfile.id,
            // orderId: "E6907B91-FCE4-4FD4-99AE-401733DE3AB9",
            // userId: "B8350BCF-B6A3-4239-82D9-3BAA7B1C83E3",
            newStatus: 4, // cancel
            reason: 'No longer needed',
            clientMutationId: '123456',
            requestId: agreement.requestId,
            shareId: agreement.shareId,
          };

          let status = this.dashboardService.updateOrderStatus(orderToCancel).subscribe((val) => {
            console.log(val);
            if (val && val.errors && val.errors.length) {
              val.errors.forEach(e => {
                console.log('ORDER CANCEL ERROR', e.message);
                this.toastrService.error(`Error: order cancel request for ${agreement.name} failed.`, null, {
                  enableHtml: true,
                  disableTimeOut: true
                });
              });
            } else {
              this.dashboardService.init();
            }
          });
          console.log('status', status);
        } catch (error) {
          this.toastrService.error(`Error: order cancel request for ${agreement.name} failed.`, null, {
            enableHtml: true,
            disableTimeOut: true
          });
        }

      }
    });
  }

  getStyle(statusId): string {
    switch (statusId) {
      case -1:// Error
        {
          return 'contentstatusred';
        }
      case 0:// Pending
        {
          return 'contentstatusyellow';
        }
      case 1:// Matched
        {
          return 'contentstatusgreen';
        }
      case 2://Confirmed
        {
          return 'contentstatusyellow';
        }
      case 3://Fulfilled
        {
          return 'contentstatusgreen';
        }
      case 4://Cancelled
        {
          return 'contentstatusred';
        }
      default://there is no default, so error
        return 'contentstatusred';
    }
  }

  ngOnDestroy() {
    this.isAlive = false;
  }
}
