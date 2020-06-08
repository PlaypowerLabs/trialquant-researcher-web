import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/core/auth/auth.service';
import { ConfirmedValidator } from './password-validator';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.less']
})
export class SignUpComponent implements OnInit {

  signUpForm = this.formBuilder.group({
    email: new FormControl(null, [Validators.required, Validators.email]),
    name: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
    confirmPassword: new FormControl(null, Validators.required),
  }, {
    validators: ConfirmedValidator('password', 'confirmPassword')
  });

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void { }

  doSignUp(value): void {
    this.authService.loginWithEmail(value.email, value.password);
  }

}
