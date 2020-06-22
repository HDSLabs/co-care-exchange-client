import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InformationComponent } from './information/information.component';
import { AuthGuard } from '../core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'info',
    component: InformationComponent,
    data: { allowNoProfile: true },
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InformationRoutingModule {}
