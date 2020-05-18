import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.less'],
})
export class LoginComponent implements OnInit {
	loginForm = new FormGroup({
		studyCode: new FormControl(null, Validators.required),
		email: new FormControl(null, [Validators.required, Validators.email]),
		password: new FormControl(null, Validators.required),
	});

	constructor() {}

	ngOnInit(): void {}
}
