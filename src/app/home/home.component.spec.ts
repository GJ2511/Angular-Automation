import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import {By} from "@angular/platform-browser";
import { RouterTestingModule } from '@angular/router/testing';

import { HomeComponent } from './home.component';
import AuthenticationService from '../Services/auth.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [ HomeComponent ],
      providers: [AuthenticationService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should have <p> tag', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('p').textContent).toContain('Dashboard works!');
  });

  it('Should have logout <button> tag', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('button').textContent).toContain('Logout');
  });

  it('logout button trigger handleLogout', () => {
    const onClickMock = spyOn(component, 'handleLogout');
    fixture.debugElement.query(By.css('button')).triggerEventHandler('click', null);
    expect(onClickMock).toHaveBeenCalled();
  });
});
