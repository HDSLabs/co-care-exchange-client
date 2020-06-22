import { NgModule } from '@angular/core';
import { IndividualComponent } from './individual/individual.component';
import { InformationComponent } from './information/information.component';
import { CustomMaterialModule } from '../material/material.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { OrganizationComponent } from './organization/organization.component';
import { InformationRoutingModule } from './information-routing.module';
import { OrgInfoModalComponent } from './orginfomodal/orginfomodal.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, FlexLayoutModule, CustomMaterialModule, FormsModule, InformationRoutingModule, SharedModule],
  declarations: [IndividualComponent, InformationComponent, OrganizationComponent, OrgInfoModalComponent],
  entryComponents: [OrgInfoModalComponent],
})
export class InformationModule {}
