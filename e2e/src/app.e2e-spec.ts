import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should have title automation', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('Automation');
  });

  it('should have username, password and submit button', () => {
    const username = page.getElement('username');
    const password = page.getElement('password');
    const submitBtn = page.getElement('submit');

    expect(username.isPresent()).toBe(true);
    expect(password.isPresent()).toBe(true);
    expect(submitBtn.isPresent()).toBe(true);
  });

  describe('Login Form error fields', () => {
  
    let username, password, submitBtn, usernameError, 
      usernameErrorRequired, passwordError, passwordErrorRequired, passswordErrorMinlength;

    const setErrorFields = () => {
      usernameError = page.getElement('username_error');
      usernameErrorRequired = page.getElement('username_error_required');    
      passwordError = page.getElement('password_error');
      passwordErrorRequired = page.getElement('password_error_required');
      passswordErrorMinlength = page.getElement('password_error_minlength');
    };

    beforeAll(() => {
      username = page.getElement('username');
      password = page.getElement('password');
      submitBtn = page.getElement('submit');
      setErrorFields();
    });

    beforeEach(() => {
      page.navigateTo();
    });


    it('displays required error messages', () => {
      expect(usernameError.isPresent()).toBe(false);
      expect(usernameErrorRequired.isPresent()).toBe(false);
      expect(passwordError.isPresent()).toBe(false);
      expect(passwordErrorRequired.isPresent()).toBe(false);
      expect(passswordErrorMinlength.isPresent()).toBe(false);

      password.sendKeys('');
      submitBtn.click();
      setErrorFields();
      
      expect(usernameError.isPresent()).toBe(true);
      expect(usernameErrorRequired.isPresent()).toBe(true);
      expect(passwordError.isPresent()).toBe(true);
      expect(passwordErrorRequired.isPresent()).toBe(true);
      expect(passswordErrorMinlength.isPresent()).toBe(false);
      expect(usernameErrorRequired.getText()).toEqual('Username is required');
      expect(passwordErrorRequired.getText()).toEqual('Password is required');
    });

    it('displays min length error messages for password', () => {
      username.sendKeys('test');
      password.sendKeys('123');
      submitBtn.click();
      setErrorFields();
      
      expect(usernameError.isPresent()).toBe(false);
      expect(usernameErrorRequired.isPresent()).toBe(false);
      expect(passwordError.isPresent()).toBe(true);
      expect(passwordErrorRequired.isPresent()).toBe(false);
      expect(passswordErrorMinlength.isPresent()).toBe(true);
      expect(passswordErrorMinlength.getText()).toEqual('Password must be at least 4 characters long.');
    });

    it('Submit Successfully', () => {
      page.getCurrentUrl().then(url => {
          expect(url).toContain('/login')
      })
      username.sendKeys('test');
      password.sendKeys('1234');
      submitBtn.click();
      page.getCurrentUrl().then(url => {
          expect(url).toBe('http://localhost:4200/')
      })
    });
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
