import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { configureAws } from './config/awsconfig';

@NgModule({
  imports: [CommonModule],
  declarations: [],
})
export class AwsCognitoModule {
  constructor() {
    // TODO -- move config to login module based on selected option
    configureAws('CCE_Individual');
  }
}
