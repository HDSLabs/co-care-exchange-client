import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './auth/components/sign-in/sign-in.component';
import { RegisterComponent } from './auth/components/registration/components/register/register.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { DashboardComponent } from './dashboard/components/dashboard.component';
import { PantryLocatorComponent } from './pantry-locator/pantry-locator.component';
import { AccountComponent } from './account/account.component';
import { ResourcesComponent } from './resources/resources.component';

import { ModuleWithProviders } from '@angular/core';
import { AppComponent } from './app.component';
import { PromptsComponent } from './prompts/prompts/prompts.component';
import { InformationComponent } from './information/information/information.component';
import { ContributorsComponent } from './contributors/contributors.component';
import { AuthGuard } from './core/guards/auth.guard';
import { WelcomePageComponent } from './auth/components/welcome-page/welcome.component';
import { LoggedInRedirectGuard } from './core/guards/logged-in-redirect.guard';
import { SettingsComponent } from './settings/settings.component';
import {
  DASHBOARD_ROUTE,
  INFO_ROUTE,
  PROMPT_ROUTE,
  SIGNIN_ROUTE,
  WELCOME_ROUTE,
  RESOURCES_ROUTE,
  CONTRIBUTORS_ROUTE,
  SETTINGS_ROUTE,
} from './core/constants/routes';

export const appRoutes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: WELCOME_ROUTE,
        component: WelcomePageComponent,
        canActivate: [LoggedInRedirectGuard],
      },
      {
        path: RESOURCES_ROUTE,
        component: ResourcesComponent,
      },
      {
        path: CONTRIBUTORS_ROUTE,
        component: ContributorsComponent,
      },
      {
        path: 'account',
        component: AccountComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'pantry',
        component: PantryLocatorComponent,
      },
      {
        path: SIGNIN_ROUTE,
        component: SignInComponent,
      },
      {
        path: 'contact',
        component: ContactUsComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: DASHBOARD_ROUTE,
        component: DashboardComponent,
        canActivate: [AuthGuard],
      },
      {
        path: PROMPT_ROUTE,
        component: PromptsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: INFO_ROUTE,
        component: InformationComponent,
        data: { allowNoProfile: true },
        canActivate: [AuthGuard],
      },
      {
        path: SETTINGS_ROUTE,
        component: SettingsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: '**',
        redirectTo: `/${WELCOME_ROUTE}`,
        pathMatch: 'full',
      },
    ],
  },
];

export const AppRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes, { paramsInheritanceStrategy: 'always' });
