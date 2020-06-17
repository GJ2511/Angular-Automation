import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import AuthenticationService from '../Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  submitted: boolean = false;
  loginForm: FormGroup;
  returnUrl: string;

  constructor(
        private _fb: FormBuilder, 
        private _authService: AuthenticationService, 
        private _route: ActivatedRoute,
        private _router: Router) {}

  ngOnInit() {
      this.loginForm = this._fb.group({
        username: ['', { validators: [Validators.required], updateOn: "blur"}],
        password: ['', { validators: [Validators.required, Validators.minLength(4)], updateOn: "blur"}]
      });

      this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
  }  

  get formAlias() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      this.formAlias.password.markAsTouched();
      this.submitted = false;

      return;
    }
  
    const {username, password} = this.loginForm.value;

    this._authService.login(username, password);
    this._router.navigate([this.returnUrl]);
  }
}
