import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { LoginComponent } from './login.component';
import AuthenticationService from '../Services/auth.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let service: AuthenticationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, ReactiveFormsModule, FormsModule],
      declarations: [ LoginComponent ],
      providers: [AuthenticationService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  afterEach(() => {
        service = null;
        component = null;
        fixture = null;
    });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('loginForm should be invalid when empty', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('Username field validity', () => {
        let errors = {};
        let username = component.loginForm.controls['username'];
        expect(username.valid).toBeFalsy();

        errors = username.errors || {};
        expect(errors['required']).toBeTruthy();

        username.setValue("test");
        errors = username.errors || {};
        expect(errors['required']).toBeFalsy();
    });

    it('Password field validity', () => {
        let errors = {};
        let password = component.loginForm.controls['password'];

        errors = password.errors || {};
        expect(errors['required']).toBeTruthy();

        password.setValue("123");
        errors = password.errors || {};
        expect(errors['required']).toBeFalsy();
        expect(errors['minlength']).toBeTruthy();

        password.setValue("1234");
        errors = password.errors || {};
        expect(errors['required']).toBeFalsy();
        expect(errors['minlength']).toBeFalsy();
    });

    it('submitting login form', () => {
        service = TestBed.get(AuthenticationService);
        let spy:any = spyOn(service, 'login').and.callThrough();

        expect(component.loginForm.valid).toBeFalsy();

        component.loginForm.controls['username'].setValue("test");
        component.loginForm.controls['password'].setValue("1234");

        expect(component.loginForm.valid).toBeTruthy();

        component.onSubmit()

        expect(component.submitted).toBeTruthy();
        expect(service.login).toHaveBeenCalled();
    });
});
