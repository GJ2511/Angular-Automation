import { Injectable } from '@angular/core';


@Injectable({ providedIn: 'root' })
export default class AuthenticationService {
    get isAuthenticated() {
        return localStorage.getItem('auth') !== null;
    }
    
    login(username, password) {
        localStorage.setItem('auth', 'true');
    }

    logout() {
        localStorage.removeItem('auth');
    }

}