import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { WELCOME_ROUTE } from '../../../../../core/constants/routes';
import { AuthenticationService } from '../../../../../core/services/cce/authentication.service';
import { BasicRegistrationModel } from '../../../../../models/cce/basic-registration.model';
import { environment } from '../../../../../../environments/environment';
import { CustomValidators } from 'src/app/shared/custom-validators';
import { MatDialog } from '@angular/material';
import { RegisterOrgInfoDialogComponent } from '../register-org-info-dialog/register-org-info-dialog.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  errorMessage: string;
  error = false;
  isRegistering = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private toastrService: ToastrService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    const minPasswordLength = environment.passwordPolicy.minLength || 8;

    this.registerForm = this.formBuilder.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: [
          null,
          Validators.compose([
            Validators.required,
            // check whether the entered password has a number
            CustomValidators.patternValidator(/\d/, {
              hasNumber: true,
            }),
            // check whether the entered password has upper case letter
            CustomValidators.patternValidator(/[A-Z]/, {
              hasCapitalCase: true,
            }),
            // check whether the entered password has a lower case letter
            CustomValidators.patternValidator(/[a-z]/, {
              hasSmallCase: true,
            }),
            // check whether the entered password has a special character
            CustomValidators.patternValidator(/[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, {
              hasSpecialCharacters: true,
            }),
            Validators.minLength(8),
          ]),
        ],
        confirmPassword: [null, Validators.compose([Validators.required])],
      },
      {
        // check whether our password and confirm password match
        validator: CustomValidators.passwordMatchValidator,
      }
    );
  }

  handlePantry() {
    this.router.navigate(['/pantry']);
  }

  async onRegisterSubmit() {
    this.registerForm.disable();
    this.isRegistering = true;
    const email = this.registerForm.get('email').value;

    try {
      const regModel: BasicRegistrationModel = {
        email,
        password: this.registerForm.get('password').value,
        firstName: this.registerForm.get('firstName').value,
        lastName: this.registerForm.get('lastName').value,
      };

      const result = await this.authenticationService.register(regModel);

      if (result.errorMsg) {
        this.toastrService.error(result.errorMsg, null, {
          positionClass: 'toast-top-center',
        });
        return;
      }

      this.toastrService.success('Please check your email for a verification and then complete signin. Click to dismiss.', null, {
        timeOut: 0,
        extendedTimeOut: 0,
        positionClass: 'toast-top-center',
      });

      this.router.navigate(['/', WELCOME_ROUTE], { queryParams: { email: email } });
    } catch (err) {
      console.error(err);
      this.toastrService.error('An unexpected error has occurred. Please try again later.', null, {
        positionClass: 'toast-top-center',
      });
    } finally {
      this.registerForm.enable();
      this.isRegistering = false;
    }
  }

  onRegisterOrgInfoClick() {
    const ref = this.dialog.open(RegisterOrgInfoDialogComponent, {
      width: '300px',
      data: {},
    });
  }
}
