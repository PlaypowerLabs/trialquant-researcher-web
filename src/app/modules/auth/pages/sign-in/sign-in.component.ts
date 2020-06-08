import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.less']
})
export class SignInComponent implements OnInit {
  signInForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, Validators.required),
  });

  constructor(private authService: AuthService) { }

  ngOnInit(): void { }

  doSignIn(value): void {
    this.authService.loginWithEmail(value.email, value.password);
  }
}
