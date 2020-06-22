import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../core/services/cce/authentication.service';
import { Router } from '@angular/router';
import { RESET_PASSWORD_ROUTE } from '../../../core/constants/routes';

@Component({
  selector: 'app-password-forgot',
  templateUrl: './password-forgot.component.html',
  styleUrls: ['./password-forgot.component.scss'],
})
export class PasswordForgotComponent implements OnInit {
  forgotPwFormGroup: FormGroup;
  passwordResponse;
  error = false;

  constructor(private fb: FormBuilder, private router: Router, private authenticationService: AuthenticationService) {
    this.createForm();
  }

  createForm() {
    this.forgotPwFormGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit() {}

  async onSubmit() {
    this.error = false;
    try {
      const email = this.forgotPwFormGroup.get('email').value;
      const result = await this.authenticationService.forgetPassword(email);
      //console.log('DEBUG forget passwd result ', result);

      this.passwordResponse = result;
      this.router.navigate(['/', RESET_PASSWORD_ROUTE], { queryParams: { email: email } });
    } catch (err) {
      console.log('Forget Password error ', err);
      this.error = true;
    }
  }

  resetError() {
    this.error = false;
  }

  get userEmail() {
    return this.forgotPwFormGroup.get('email');
  }
}
