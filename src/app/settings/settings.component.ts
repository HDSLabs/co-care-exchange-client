import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CceSDK, UserSettingsQuery, User, UserSettingsDocument, UserSettingsQueryVariables } from '../graphql/generatedSDK';
import { map } from 'rxjs/operators';
import { UserService } from '../core/services/user.service';
import { Observable, Subscription } from 'rxjs';
import { MatButtonToggleChange, MatSlideToggleChange } from '@angular/material';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit, OnDestroy {
  email = false;
  receiveAcross = false;
  shareAcross = false;
  loading = true;
  userProfile: User;
  subscription: Subscription;
  isUser = true;

  constructor(private router: Router, private api: CceSDK, private userService: UserService) {}

  ngOnInit() {
    window.scrollTo(0, 0);
    this.userProfile = this.userService.getCurrentUserProfile();
    this.isUser = !this.userProfile.organization;
    this.subscription = this.api.userSettingsWatch({ userId: this.userProfile.id }).valueChanges.subscribe((result) => {
      const { receiveAcrossRoleBoundary, sendEmailMatchNotifications, shareAcrossRoleBoundary } = result.data.user;
      this.loading = false;
      this.receiveAcross = receiveAcrossRoleBoundary;
      this.shareAcross = shareAcrossRoleBoundary;
      this.email = sendEmailMatchNotifications;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  back() {
    this.router.navigate(['/account']);
  }

  toggleEmail({ checked }: MatSlideToggleChange) {
    const matchRadius = this.userProfile.matchRadius || this.userProfile.dropOffRadius || this.userProfile.pickupRadius;
    this.api
      .updateUserSettings(
        {
          input: {
            userId: this.userProfile.id,
            address: this.userProfile.address,
            city: this.userProfile.city,
            emailAddress: this.userProfile.emailAddress,
            currentUserEmail: this.userProfile.emailAddress,
            firstName: this.userProfile.firstName,
            lastName: this.userProfile.lastName,
            state: this.userProfile.state,
            postalCode: this.userProfile.postalCode,
            phoneNumber: this.userProfile.phoneNumber,
            matchRadius,
            pickupRadius: this.userProfile.pickupRadius || matchRadius,
            dropOffRadius: this.userProfile.dropOffRadius || matchRadius,
            sendEmailMatchNotifications: checked,
            sendEmailMessageNotifications: checked,
          },
        },
        {
          refetchQueries: [
            {
              query: UserSettingsDocument,
              variables: {
                userId: this.userProfile.id,
              } as UserSettingsQueryVariables,
            },
          ],
        }
      )
      .subscribe();
  }

  toggleReceiveFrom() {
    // TODO
  }
  toggleShareAcross() {
    // TODO
  }
}
