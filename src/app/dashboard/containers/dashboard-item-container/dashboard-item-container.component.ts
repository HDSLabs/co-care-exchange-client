import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, of, timer, empty } from 'rxjs';
import { tap, takeUntil, catchError, switchMap, withLatestFrom, map, filter } from 'rxjs/operators';

import { ItemDetailsService, IItemDetailState } from 'src/app/core/services/cce/item-details.service';
import { ICreateOrderNoteInput } from 'src/app/graphql/models/create-order-note-input';
import { Agreement } from '../../components/models/agreement';
import { OrderChangeInput } from 'src/app/models/cce/order-model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard-item-container',
  templateUrl: './dashboard-item-container.component.html',
  styleUrls: ['./dashboard-item-container.component.scss'],
})
export class DashboardItemContainerComponent implements OnInit, OnDestroy {
  params: any;

  stop$ = new Subject();
  vm$: Observable<IItemDetailState> = this.itemDetailsService.store$;
  populatedVm$: Observable<IItemDetailState> = this.vm$.pipe(filter((d) => !!d.itemDetails));

  constructor(
    public route: ActivatedRoute,
    private router: Router,
    private itemDetailsService: ItemDetailsService,
    private toastrService: ToastrService
  ) {}

  ngOnInit() {
    this.route.params
      .pipe(
        takeUntil(this.stop$),
        tap((params) => {
          this.params = params;
          const itemId = params && params.id ? params.id : null;
          if (itemId) {
            this.itemDetailsService.getItemInitial(itemId);
          } else {
            this.router.navigate(['/dashboard']);
          }
        })
      )
      .subscribe();

    timer(5000, 5000)
      .pipe(
        takeUntil(this.stop$),
        withLatestFrom(this.populatedVm$),
        map(([_timer, vm]) => vm.itemDetails),
        tap((itemDetails) => this.itemDetailsService.refreshItemDetail(itemDetails.itemId)),
        catchError((_error) => {
          this.router.navigate(['/dashboard']);
          return of(null);
        })
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.stop$.next();
    this.stop$.complete();
  }

  handleUpdateItem(payload: { orderUpdate: Agreement; updates: Partial<OrderChangeInput> }) {
    this.itemDetailsService
      .updateOrder(payload.orderUpdate, payload.updates)
      .pipe(takeUntil(this.stop$), catchError(this.handleError))
      .subscribe();
  }

  handleNewNote(newNote: Pick<ICreateOrderNoteInput, 'noteBody' | 'itemId' | 'imageUrl'>) {
    this.itemDetailsService.createOrderNote(newNote).pipe(takeUntil(this.stop$), catchError(this.handleError)).subscribe();
  }

  private handleError(err) {
    console.error('an error occurred updating the order: ', err);
    this.toastrService.error('An unexpected error has occurred updating the item. Please try again later.', null, {
      positionClass: 'toast-top-center',
    });
    return of(null);
  }
}
