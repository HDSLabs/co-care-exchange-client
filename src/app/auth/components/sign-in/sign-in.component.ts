import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../../../core/services/cce/authentication.service';
import { NavbarService } from '../../../core/services/navbar.service';
import { SignInResult } from '../../../models/cce/sign-in-result.model';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  encapsulation: ViewEncapsulation.None, // override mat tab classes in component stylesheet
})
export class SignInComponent implements OnInit {
  INDIVIDUAL = { name: 'Individual', id: null };
  loginForm: FormGroup;
  errorMessage: string;
  error = false;
  signingIn = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private navbarService: NavbarService,
    private toastrService: ToastrService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.route.queryParams.subscribe(val => {
      console.log('DEBUG signin email ', val);
      const email = val.email;
      if (email) {
        this.loginForm.get('username').setValue(email);
      }
    });
  }

  async onLoginSubmit() {
    this.error = false;
    this.errorMessage = undefined;
    this.signingIn = true;

    try {
      const username = this.loginForm.get('username').value;
      const result: SignInResult = await this.authenticationService.signIn(username, this.loginForm.get('password').value);

      // console.log('DEBUG: signin result ', result);
      this.signingIn = false;

      if (result.errorMsg) {
        this.error = true;
        this.errorMessage = result.errorMsg;
        this.toastrService.error(result.errorMsg, null, { positionClass: 'toast-top-center' });
        return;
      }

      // TODO is navbar service needed...dont think so
      // this.navbarService.setLogin(true);

      // the email is the username
      await this.navigateToNextRoute(this.loginForm.get('username').value);
    } catch (err) {
      console.log('SignIn error ', err);
      this.toastrService.error('An unexpected error has occurred. please try again later', null, { positionClass: 'toast-top-center' });
    } finally {
      this.signingIn = false;
    }
  }

  private async navigateToNextRoute(username: string, org?: any) {
    // TODO -- check if user profile exists
    const self = this;
    const user = await self.userService
      .getUser(username)
      .pipe(first())
      .toPromise();
    console.log('signin navigateToNextRoute - user profile ', user);

    // TODO -- also check if user is part of an org if they signed in with an org?
    if (user && user.emailAddress) {
      return this.router.navigate(['/', 'dashboard']);
    } else {
      const queryParams = { newUser: true };
      return this.router.navigate(['/', 'info'], { queryParams });
    }
  }

  handleForgotPW() {
    this.router.navigate(['/', 'passwordforgot']);
  }

  handleRegistration() {
    this.router.navigate(['/register']);
  }

  handlePantry() {
    this.router.navigate(['/pantry']);
  }
}
