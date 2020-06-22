import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './components/register/register.component';
import { CustomMaterialModule } from '../../../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { RegisterOrgInfoDialogComponent } from './components/register-org-info-dialog/register-org-info-dialog.component';

@NgModule({
  declarations: [RegisterComponent, RegisterOrgInfoDialogComponent],
  imports: [CommonModule, CustomMaterialModule, ReactiveFormsModule, SharedModule, FormsModule, FlexLayoutModule, RouterModule],
  exports: [RegisterComponent, RegisterOrgInfoDialogComponent],
  entryComponents: [RegisterOrgInfoDialogComponent],
})
export class RegistrationModule {}
