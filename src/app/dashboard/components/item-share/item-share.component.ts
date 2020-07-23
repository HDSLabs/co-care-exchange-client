import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  Output,
  ChangeDetectionStrategy,
  EventEmitter,
  Renderer2,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subject, BehaviorSubject, combineLatest } from 'rxjs';
import { debounceTime, filter, distinctUntilChanged, takeUntil, take, tap, finalize } from 'rxjs/operators';

import { IItemDetailState } from 'src/app/core/services/cce/item-details.service';
import { Status } from 'src/app/core/constants/enums';
import { MatDialog } from '@angular/material';
import { OrderChangeInput } from 'src/app/models/cce/order-model';
import { Agreement, IOrderNote } from '../models/agreement';
import { ICreateOrderNoteInput } from 'src/app/graphql/models/create-order-note-input';
import { Router } from '@angular/router';
import { UserProfile } from 'src/app/models/UserProfile';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-item-share',
  templateUrl: './item-share.component.html',
  styleUrls: ['./item-share.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemShareComponent implements OnInit, OnDestroy {
  @Input() vm: IItemDetailState;
  @Output() createNote = new EventEmitter<Pick<ICreateOrderNoteInput, 'noteBody' | 'itemId' | 'imageUrl'>>();
  @Output() updateItem = new EventEmitter<{ orderUpdate: Agreement; updates: Partial<OrderChangeInput> }>();

  showImageArea: boolean = false;
  imagename: string = '';
  userProfile: UserProfile;
  status = Status; // enum binding to use in view template

  modalVisible = false;

  stop$ = new Subject();

  currentNoteVal: string;
  orderNoteFC: FormControl = new FormControl('');
  orderNoteFC$: Observable<string>;

  constructor(private dialog: MatDialog, private router: Router, private userService: UserService) {}

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

  onCancelMatch(agreement: Agreement) {
    this.updateItem.emit({
      orderUpdate: agreement,
      updates: {
        shareId: agreement.shareId,
        status: Status.OrderCancelled,
        reason: 'Sharer ' + this.userProfile.firstName + ' ' + this.userProfile.lastName + '  cancelled the match in agreement detail view',
      },
    });
  }

  onConfirmFulfillment(agreement: Agreement) {
    this.updateItem.emit({
      orderUpdate: agreement,
      updates: {
        shareId: agreement.shareId,
        status: Status.OrderFulfilled,
        reason: 'Sharer ' + this.userProfile.firstName + ' ' + this.userProfile.lastName + ' confirmed the fulfillment of the match',
      },
    });
  }

  onConfirmMatch(){
    this.updateItem.emit({
      orderUpdate: this.vm.itemDetails,
      updates: {
        status: Status.OrderConfirmed,
        reason: 'Sharer ' + this.userProfile.firstName + ' ' + this.userProfile.lastName + ' confirmed matching of the items.',
      },
    });
  }

  onConfirmDropOff(agreement: Agreement) {
    this.updateItem.emit({
      orderUpdate: agreement,
      updates: {
        shareId: agreement.shareId,
        status: Status.OrderFulfilled,
        reason: 'Sharer ' + this.userProfile.firstName + ' ' + this.userProfile.lastName + ' confirmed the delivery of the items',
      },
    });
  }

  onSubmitEdit() {
    this.createNote.emit({ noteBody: this.currentNoteVal, itemId: this.vm.itemDetails.itemId, imageUrl: null });
    this.orderNoteFC.patchValue('');
  }
  
  navigateBackToDashboard() {
    if (!this.modalVisible) {
      this.router.navigate(['/dashboard']);
    } else {
      return false;
    }
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
