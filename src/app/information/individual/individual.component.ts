import { AfterContentInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../core/services/user.service';
import { SaveUserInput } from '../../graphql/models/save-user-input.model';
import { UserProfileInformation } from '../models/info-create.model';
import { first } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { OrgInfoModalComponent } from '../orginfomodal/orginfomodal.component';
import { ActivatedRoute } from '@angular/router';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-individual',
  templateUrl: './individual.component.html',
  styleUrls: ['./individual.component.scss'],
})
export class IndividualComponent implements OnInit, AfterContentInit {
  @Input() firstName;
  @Input() lastName;
  @Input() email;
  @Output() infoSubmit = new EventEmitter<UserProfileInformation>();

  individualRegisterForm: FormGroup;
  errorMessage: string;
  error = false;
  private _isRegistering = false;
  userProfile;
  newUser: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private dialog: MatDialog,
    private router: ActivatedRoute
  ) {}

  @Input()
  set isRegistering(state: boolean) {
    console.log('DEBUG ind isRegistering ', state);
    this._isRegistering = state;
    if (!this.individualRegisterForm) {
      return;
    }
    if (this._isRegistering) {
      this.individualRegisterForm.disable();
    } else {
      this.individualRegisterForm.enable();
    }
  }

  get isRegistering() {
    return this._isRegistering;
  }

  ngOnInit() {
    this.router.queryParams.subscribe((params) => {
      if (params && params.newUser) {
        this.newUser = params.newUser.toLowerCase() === 'true';
      }
    });
  }

  async ngAfterContentInit() {
    this.userProfile = await this.userService.getUser(this.email).pipe(first()).toPromise();

    this.individualRegisterForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      householdSize: [0, Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', [Validators.required, Validators.minLength(2)]],
      postalCode: ['', Validators.required],
      deliveryOrPickupRadius: ['', Validators.compose([Validators.min(1), Validators.max(50), Validators.pattern('^[1-9][0-9]?$')])],
      password: [''],
      sendEmailMatchNotifications: [true],
    });

    this.individualRegisterForm.get('firstName').setValue(this.firstName);
    this.individualRegisterForm.get('lastName').setValue(this.lastName);
    this.individualRegisterForm.get('email').setValue(this.email);

    if (this.userProfile) {
      this.individualRegisterForm.get('phone').setValue(this.userProfile.phoneNumber || '');
      this.individualRegisterForm.get('address').setValue(this.userProfile.address || '');
      this.individualRegisterForm.get('city').setValue(this.userProfile.city || '');
      this.individualRegisterForm.get('state').setValue(this.userProfile.state || '');
      this.individualRegisterForm.get('postalCode').setValue(this.userProfile.postalCode || '');
      this.individualRegisterForm.get('deliveryOrPickupRadius').setValue(this.userProfile.dropOffRadius || 50);
      this.individualRegisterForm.get('householdSize').setValue(this.userProfile.householdSize || 0);
      this.individualRegisterForm
        .get('sendEmailMatchNotifications')
        .setValue(this.userProfile.sendEmailMatchNotifications != null ? this.userProfile.sendEmailMatchNotifications : true);
    }
  }

  async onRegisterSubmit() {
    const profile: SaveUserInput = {
      address: this.individualRegisterForm.get('address').value,
      city: this.individualRegisterForm.get('city').value,
      dropOffRadius: this.individualRegisterForm.get('deliveryOrPickupRadius').value,
      emailAddress: this.email,
      currentUserEmail: this.email,
      firstName: this.individualRegisterForm.get('firstName').value,
      lastName: this.individualRegisterForm.get('lastName').value,
      pickupRadius: this.individualRegisterForm.get('deliveryOrPickupRadius').value,
      state: this.individualRegisterForm.get('state').value,
      postalCode: this.individualRegisterForm.get('postalCode').value,
      phoneNumber: this.individualRegisterForm.get('phone').value,
      householdSize: +this.individualRegisterForm.get('householdSize').value || null,
      sendEmailMatchNotifications: this.individualRegisterForm.get('sendEmailMatchNotifications').value,
      matchRadius: this.individualRegisterForm.get('deliveryOrPickupRadius').value,
      sendEmailMessageNotifications: this.individualRegisterForm.get('sendEmailMatchNotifications').value,
    };

    if (!this._isRegistering && this.userProfile) {
      profile.userId = this.userProfile.id;
    }

    console.log(profile);

    const payload: UserProfileInformation = { userInput: profile };
    this.infoSubmit.emit(payload);
  }
}
