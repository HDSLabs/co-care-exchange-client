import { Component, OnInit, ChangeDetectionStrategy, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Subject, BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil, filter, tap, finalize } from 'rxjs/operators';

import { IItemDetailState } from 'src/app/core/services/cce/item-details.service';
import { ICreateOrderNoteInput } from 'src/app/graphql/models/create-order-note-input';
import { Agreement, IOrderNote } from '../models/agreement';
import { OrderChangeInput } from 'src/app/models/cce/order-model';
import { Status } from 'src/app/core/constants/enums';
import { UserProfile } from 'src/app/models/UserProfile';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-item-request',
  templateUrl: './item-request.component.html',
  styleUrls: ['../item-share/item-share.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemRequestComponent implements OnInit, OnDestroy {
  @Input() vm: IItemDetailState;
  @Output() createNote = new EventEmitter<Pick<ICreateOrderNoteInput, 'noteBody' | 'itemId' | 'imageUrl'>>();
  @Output() updateItem = new EventEmitter<{ orderUpdate: Agreement; updates: Partial<OrderChangeInput> }>();

  status = Status; // enum binding to use in view template
  userProfile: UserProfile;
  stop$ = new Subject();
  showImageArea: boolean = false;
  imagename: string = '';
  currentNoteVal: string;
  orderNoteFC: FormControl = new FormControl('');
  orderNoteFC$: Observable<string>;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userProfile = this.userService.getCurrentUserProfile();

    // form input
    this.orderNoteFC$ = this.orderNoteFC.valueChanges;
    this.orderNoteFC$
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        filter((val) => val && val !== ''),
        takeUntil(this.stop$)
      )
      .subscribe((val) => (this.currentNoteVal = val));
  }

  ngOnDestroy() {
    this.stop$.next();
    this.stop$.complete();
  }

  onConfirmFulfillemnt(agreement: Agreement) {
    this.updateItem.emit({
      orderUpdate: agreement,
      updates: {
        shareId: agreement.shareId,
        status: Status.OrderFulfilled,
        reason: 'Sharer ' + this.userProfile.firstName + ' ' + this.userProfile.lastName + ' confirmed the fulfillment of the match',
      },
    });
  }

  onCancelMatch(agreement: Agreement) {
    this.updateItem.emit({
      orderUpdate: agreement,
      updates: {
        requestId: agreement.requestId,
        status: Status.OrderCancelled,
        reason: 'Requester ' + this.userProfile.firstName + ' ' + this.userProfile.lastName + ' cancelled the match in agreement detail view',
      },
    });
  }

  onSubmitEdit() {
    this.createNote.emit({ noteBody: this.currentNoteVal, itemId: this.vm.itemDetails.itemId, imageUrl: null });
    this.orderNoteFC.patchValue('');
  }

  formatItemDetails(agreement: Agreement) {
    return `${agreement.quantity}${agreement.unitOfIssue ? ', ' + agreement.unitOfIssue : ''}${
      agreement.details ? ', ' + agreement.details : ''
    }`;
  }

  addpicture() {
    console.log('vm', this.vm);
    this.imagename = Date.now().toString();
    this.showImageArea = true;
  }

  hidepicture() {
    this.showImageArea = false;
  }

  pictureTaken() {
    this.showImageArea = false;
    this.createNote.emit({
      noteBody: 'image',
      itemId: this.vm.itemDetails.itemId,
      imageUrl: this.userProfile.id + '/' + this.vm.itemDetails.shareId + '/' + this.imagename,
    });
    this.orderNoteFC.patchValue('');
  }

  trackByNotes(_index: number, note: IOrderNote) {
    return note ? note.id : undefined;
  }
}
