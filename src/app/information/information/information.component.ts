import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { filter, finalize, first } from 'rxjs/operators';
import { AuthenticationService } from '../../core/services/cce/authentication.service';
import { UserService } from '../../core/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserProfileInformation } from '../models/info-create.model';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss'],
})
export class InformationComponent implements OnInit {
  registrantType: string;
  newUser = false;
  organizationName = null;
  organizationId = null;
  error = false;
  profile = null;

  isRegistering = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private toastrService: ToastrService
  ) {}

  async ngOnInit() {
    this.route.data.pipe(filter(data => data.user)).subscribe(data => {
      // TBD -- prob not needed, but stubbed out jic
      console.log('DEBUG info data :', data);
    });

    this.profile = await this.userService
      .getUser(this.email)
      .pipe(first())
      .toPromise();
    this.registrantType = 'Individual';

    if (this.profile) {
      this.newUser = false;

      if (this.profile.organization && this.profile.organization.id) {
        this.organizationName = this.profile.organization.name;
        this.organizationId = this.profile.organization.id;
        this.registrantType = 'Organization';
      }
    } else {
      this.newUser = true;
    }
  }

  get email(): string {
    return this.authenticationService.getEmail();
  }

  get lastName(): string {
    return this.authenticationService.getLastName();
  }

  get firstName(): string {
    return this.authenticationService.getFirstName();
  }

  onInfoSubmit(payload: UserProfileInformation) {
    console.log('DEBUG create user profile ', payload);
    payload.userInput.matchRadius = payload.userInput.dropOffRadius;
    payload.userInput.sendEmailMessageNotifications = payload.userInput.sendEmailMatchNotifications;

    this.isRegistering = true;
    const profile = payload.userInput;
    console.log('DEBUG profile to save ', profile);
    this.userService
      .saveUser(profile)
      .pipe(finalize(() => (this.isRegistering = false)))
      .subscribe(
        savedProfile => {
          if (savedProfile) {
            console.log('save user success ', savedProfile);
            // this checks for existing profile, if so, it has a user id
            if (profile.userId) {
              this.router.navigate(['/account']);
            } else {
              // first time profile submit, prompt for questions
              this.router.navigate(['/prompt']);
            }
          } else {
            console.error('Error processing saved user ', savedProfile);
            this.toastrService.error('Unable to retrieve saved profile. Please try again later', null, {
              positionClass: 'toast-top-center',
            });
          }
        },
        error => {
          console.error('Save user error ', error);
          this.toastrService.error('Unable to save profile. Please try again later', null, { positionClass: 'toast-top-center' });
        }
      );
  }
}
