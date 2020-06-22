import { AfterContentInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { UserProfileInformation } from '../models/info-create.model';
import { SaveUserInput } from '../../graphql/models/save-user-input.model';
import { UserService } from 'src/app/core/services/user.service';
import { MatDialog } from '@angular/material';
import { OrgInfoModalComponent } from '../orginfomodal/orginfomodal.component';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss'],
})
export class OrganizationComponent implements OnInit, AfterContentInit {
  @Input() email;
  @Input() firstName;
  @Input() lastName;
  @Input() organizationName;
  @Input() organizationId;
  @Output() infoSubmit = new EventEmitter<UserProfileInformation>();
  organizationForm: FormGroup;
  errorMessage: string;
  error = false;
  private _isRegistering = false;
  userProfile;

  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService, private dialog: MatDialog) {}

  @Input()
  set isRegistering(state: boolean) {
    console.log('DEBUG org isRegistering ', state);
    this._isRegistering = state;
    if (!this.organizationForm) {
      return;
    }
    if (this._isRegistering) {
      this.organizationForm.disable();
    } else {
      this.organizationForm.enable();
    }
  }

  get isRegistering() {
    return this._isRegistering;
  }

  async ngOnInit() {}

  async ngAfterContentInit() {
    this.userProfile = await this.userService.getUser(this.email).pipe(first()).toPromise();

    this.organizationForm = this.formBuilder.group({
      orgName: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', [Validators.required, Validators.minLength(2)]],
      postalCode: ['', Validators.required],
      deliveryOrPickupRadius: [0, Validators.compose([Validators.min(1), Validators.max(50), Validators.pattern('^[1-9][0-9]?$')])],
      sendEmailMatchNotifications: [true],
    });

    this.organizationForm.get('orgName').setValue(this.organizationName);
    this.organizationForm.get('email').setValue(this.email);
    this.organizationForm.get('firstName').setValue(this.firstName);
    this.organizationForm.get('lastName').setValue(this.lastName);

    if (this.userProfile) {
      this.organizationForm.get('phone').setValue(this.userProfile.phoneNumber || '');
      this.organizationForm.get('address').setValue(this.userProfile.address || '');
      this.organizationForm.get('city').setValue(this.userProfile.city || '');
      this.organizationForm.get('state').setValue(this.userProfile.state || '');
      this.organizationForm.get('postalCode').setValue(this.userProfile.postalCode || '');
      this.organizationForm.get('deliveryOrPickupRadius').setValue(this.userProfile.dropOffRadius || 50);
      this.organizationForm
        .get('sendEmailMatchNotifications')
        .setValue(this.userProfile.sendEmailMatchNotifications != null ? this.userProfile.sendEmailMatchNotifications : true);
    }
  }

  onRegisterSubmit() {
    let profile: SaveUserInput = {
      address: this.organizationForm.get('address').value,
      city: this.organizationForm.get('city').value,
      dropOffRadius: this.organizationForm.get('deliveryOrPickupRadius').value,
      emailAddress: this.email, // read-only, not allowed to change
      currentUserEmail: this.email,
      firstName: this.organizationForm.get('firstName').value,
      lastName: this.organizationForm.get('lastName').value,
      pickupRadius: this.organizationForm.get('deliveryOrPickupRadius').value,
      state: this.organizationForm.get('state').value,
      postalCode: this.organizationForm.get('postalCode').value,
      phoneNumber: this.organizationForm.get('phone').value,
      organizationId: this.organizationId,
      sendEmailMatchNotifications: this.organizationForm.get('sendEmailMatchNotifications').value,
      matchRadius: this.organizationForm.get('deliveryOrPickupRadius').value,
      sendEmailMessageNotifications: this.organizationForm.get('sendEmailMatchNotifications').value,
    };

    if (!this._isRegistering && this.userProfile) {
      profile.userId = this.userProfile.id;
    }

    console.log(profile);
    const payload: UserProfileInformation = { userInput: profile };
    this.infoSubmit.emit(payload);
  }

  onOrgInfoClick() {
    const ref = this.dialog.open(OrgInfoModalComponent, {
      width: '300px',
      data: {},
    });
  }
}
