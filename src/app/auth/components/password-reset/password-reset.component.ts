import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../../../core/services/cce/authentication.service';
import { FORGET_PASSWORD_ROUTE, WELCOME_ROUTE } from '../../../core/constants/routes';
import { CustomValidators } from 'src/app/shared/custom-validators';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return invalidCtrl || invalidParent;
  }
}

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss'],
})
export class PasswordResetComponent implements OnInit {
  pwResetForm: FormGroup;
  hide = true;
  email = null;

  success = null;

  errorStateMatcher = new MyErrorStateMatcher();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private toastrService: ToastrService
  ) {
    this.createForm();
  }

  createForm() {
    this.pwResetForm = this.fb.group(
      {
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
        resetCode: ['', [Validators.required]],
      },
      {
        // check whether our password and confirm password match
        validator: CustomValidators.passwordMatchValidator,
      }
    );
  }

  ngOnInit() {
    this.route.queryParams.subscribe(val => {
      console.log('DEBUG reset email ', val);
      this.email = val.email;
      if (!this.email) {
        // TODO -- error, route back to forget password?
      }
    });
  }

  async onLoginSubmit() {
    if (!this.email) {
      return await this.router.navigate(['/', FORGET_PASSWORD_ROUTE]);
    }
    try {
      const result = await this.authenticationService.forgetPasswordComplete(
        this.email,
        this.pwResetForm.controls.resetCode.value,
        this.pwResetForm.controls.confirmPassword.value
      );
      this.success = true;
      // await this.router.navigate(['/', , 'welcome']);
      this.router.navigate(['/', WELCOME_ROUTE]);
    } catch (err) {
      console.error('Error resetting password ', err);
      this.toastrService.error('An unexpected error has occurred attempting password reset. Please try again later.', null, {
        positionClass: 'toast-top-center',
      });
    }
  }

  checkPasswords(group: FormGroup) {
    // here we have the 'passwords' group
    const password = group.controls.password.value;
    const confirmPass = group.controls.confirmPassword.value;
    return password === confirmPass ? null : { notSame: true };
  }

  get password() {
    return this.pwResetForm.get('password');
  }

  get confirmPassword() {
    return this.pwResetForm.get('confirmPassword');
  }

  get resetCode() {
    return this.pwResetForm.get('resetCode');
  }
}
