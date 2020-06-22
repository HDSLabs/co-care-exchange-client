import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CustomMaterialModule } from '../material/material.module';
import { SiteHeaderComponent } from './site-header/site-header.component';
import { SiteFooterComponent } from './site-footer/site-footer.component';

@NgModule({
  imports: [CommonModule, RouterModule, CustomMaterialModule, FlexLayoutModule],
  declarations: [SiteHeaderComponent, SiteFooterComponent],
  exports: [SiteHeaderComponent, SiteFooterComponent],
  providers: [SiteFooterComponent],
})
export class SharedModule {}
