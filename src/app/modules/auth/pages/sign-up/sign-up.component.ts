import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/core/auth/auth.service';
import { ConfirmedValidator } from './password-validator';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.less']
})
export class SignUpComponent implements OnInit {

  authError: string;
  signUpForm: FormGroup;

  authErrorSub: Subscription;
  signUpFormSub: Subscription;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) { }

  isAuthentication$ = this.authService.isAuthenticating$;

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      email: new FormControl(null, [Validators.required, Validators.email]),
      name: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      confirmPassword: new FormControl(null, Validators.required),
    }, {
      validators: ConfirmedValidator('password', 'confirmPassword')
    });

    this.authErrorSub = this.authService.authError$.subscribe(error => this.authError = error);
    this.signUpFormSub = this.signUpForm.valueChanges.subscribe(() => {
      if (this.authError) {
        this.authService.resetAuthError();
      }
    });
  }

  doSignUp(value): void {
    this.authService.signUpWithEmail(value.name, value.email, value.password);
  }

}
