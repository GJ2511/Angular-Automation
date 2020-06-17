import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import AuthenticationService from '../Services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
        private _authService: AuthenticationService, 
        private _router: Router) {}

  ngOnInit(): void {
  }

  handleLogout() {
    this._authService.logout();
    this._router.navigate(["/login"]);
  }

}
