import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';

import { DashboardService, IDashboardState } from 'src/app/core/services/cce/dashboard.service';
import { Agreement } from './models/agreement';
import { Status } from 'src/app/core/constants/enums';


@Component({
  selector: 'app-cce-home',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  vm$: Observable<IDashboardState>;
  isAlive: boolean;

  constructor(
    public dialog: MatDialog,
    private dashboardService: DashboardService,
    private router: Router
  ) { }

  ngOnInit() {
    this.dashboardService.startPolling();
    this.vm$ = this.dashboardService.state$;
  }

  handleStatusClick(agreement: Agreement, type: String) {
    this.dashboardService.setSelectedAgreement(agreement);
    this.router.navigate(['/agreement-detail'], { queryParams: { type } });
  }

  formatItemDetails(agreement: Agreement) {
    return `${agreement.quantity}${agreement.unitOfIssue ? ', ' + agreement.unitOfIssue : ''}${agreement.details ? ', ' + agreement.details : ''}`
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
      case Status.DeliveryPending: {
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

  ngOnDestroy() {
    this.dashboardService.stopPolling();
  }
}
