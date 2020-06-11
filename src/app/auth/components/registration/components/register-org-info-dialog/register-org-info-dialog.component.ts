import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-register-org-info-dialog',
  templateUrl: './register-org-info-dialog.component.html',
  styleUrls: ['./register-org-info-dialog.component.scss'],
})
export class RegisterOrgInfoDialogComponent {
  constructor(public dialogRef: MatDialogRef<RegisterOrgInfoDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}

  onCancelPickup() {
    this.dialogRef.close('Cancel');
  }

  onConfirmPickup() {
    this.dialogRef.close('Confirm');
  }
}
