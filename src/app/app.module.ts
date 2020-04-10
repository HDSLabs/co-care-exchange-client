import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';

import { AppComponent } from './app.component';
import { AppRouting } from './app.routing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomMaterialModule } from './material/material.module';
import { SharedModule } from './shared/shared.module';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { NavbarService } from './core/services/navbar.service';
import { ToastrModule } from 'ngx-toastr';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { InformationModule } from './information/information.module';
import { AwsCognitoModule } from './aws-cognito/aws-cognito.module';
import { PantryLocatorModule } from './pantry-locator/pantry-locator.module';
import { PersonalDashboardComponent } from './personal-dashboard/personal-dashboard.component';
import { ResourcesComponent } from './resources/resources.component';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/AuthModule';
import { DashboardModule } from './dashboard/DashboardModule';
import { RegistrationModule } from './registration/registration.module';
import { GraphQLModule } from './graphql/graphql.module';
import { PopupDialogComponent } from './resources/popup-dialog/popup-dialog.component';
import { PromptModule } from './prompts/prompt.module';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { Router } from '@angular/router';

@NgModule({
  imports: [
    BrowserModule,
    AppRouting,
    CoreModule,
    AuthModule,
    RegistrationModule,
    DashboardModule,
    PromptModule,
    PantryLocatorModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    GraphQLModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CustomMaterialModule,
    FormsModule,
    ToastrModule,
    SharedModule,
    InformationModule,
    AwsCognitoModule,
    ToastrModule.forRoot(),
    LayoutModule,
  ],
  declarations: [AppComponent, ContactUsComponent, PersonalDashboardComponent, ResourcesComponent, PopupDialogComponent],
  providers: [
    NavbarService,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  exports: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  // DEV NOTE: uncomment to debug routing
  // constructor(
  //     private readonly router: Router,
  // ) {
  //   router.events
  //       .subscribe(console.log);
  // }
}
