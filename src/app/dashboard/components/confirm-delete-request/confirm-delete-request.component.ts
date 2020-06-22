import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, Inject } from '@angular/core';
import { Agreement } from '../models/agreement';

@Component({
  selector: 'app-confirm-delete-request',
  templateUrl: './confirm-delete-request.component.html',
  styleUrls: ['./confirm-delete-request.component.scss'],
})
export class ConfirmDeleteRequestComponent {
  constructor(public dialogRef: MatDialogRef<ConfirmDeleteRequestComponent>, @Inject(MAT_DIALOG_DATA) public data: Agreement) {}

  onCancelDelete() {
    this.dialogRef.close('nope');
  }

  onConfirmDelete() {
    this.dialogRef.close('yep');
  }
}
