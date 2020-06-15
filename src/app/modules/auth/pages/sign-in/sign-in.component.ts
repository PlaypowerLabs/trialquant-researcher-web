import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.less']
})
export class SignInComponent implements OnInit {

  authError: string;
  signInForm: FormGroup;

  authErrorSub: Subscription;
  signUpFormSub: Subscription;

  constructor(private authService: AuthService) { }

  isAuthentication$ = this.authService.isAuthenticating$;

  ngOnInit(): void {
    this.signInForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
    });

    this.authErrorSub = this.authService.authError$.subscribe(error => this.authError = error);
    this.signUpFormSub = this.signInForm.valueChanges.subscribe(() => {
      if (this.authError) {
        this.authService.resetAuthError();
      }
      this.authError = undefined;
    });
  }

  doSignIn(value): void {
    this.authService.loginWithEmail(value.email, value.password);
  }
}
