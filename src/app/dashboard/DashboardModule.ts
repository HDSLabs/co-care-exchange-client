import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './components/dashboard.component';
import { CustomMaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { MetricsComponent } from './components/metrics/metrics.component';
import { DashboardRoutingModule } from './routes/dashboard-routing.module';
import { PromptsRoutingModule } from '../prompts/prompts-routing.module';
import { DashboardItemContainerComponent } from './containers/dashboard-item-container/dashboard-item-container.component';
import { ItemRequestComponent } from './components/item-request/item-request.component';
import { ItemShareComponent } from './components/item-share/item-share.component';
import { ItemTakePictureComponent } from './components/item-takepicture/item-takepicture.component';
import { ItemImageCanvasComponent } from './components/item-image-canvas/item-image-canvas.component';
import { ConfirmDeleteRequestComponent } from './components/confirm-delete-request/confirm-delete-request.component';

@NgModule({
  declarations: [
    DashboardComponent,
    MetricsComponent,
    ConfirmDeleteRequestComponent,
    DashboardItemContainerComponent,
    ItemRequestComponent,
    ItemShareComponent,
    ItemTakePictureComponent,
    ItemImageCanvasComponent,
  ],
  imports: [
    CommonModule,
    CustomMaterialModule,
    DashboardRoutingModule,
    PromptsRoutingModule,
    SharedModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  entryComponents: [ConfirmDeleteRequestComponent],
})
export class DashboardModule {}
