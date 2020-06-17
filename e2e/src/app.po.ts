import { browser, by, element, ElementFinder } from 'protractor';

export class AppPage {
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  getTitleText(): Promise<string> {
    return browser.getTitle() as Promise<string>;
  }

  getElement(id:string): ElementFinder {
    return element(by.id(id));
  }

  getCurrentUrl(): Promise<string> {
    return browser.getCurrentUrl()  as Promise<string>;
  }

  waitForCurrentUrl(timeout=1000) {

    return browser.driver.wait(function() {
        // Return a condition. Code will continue to run until is true 
        return browser.driver.getCurrentUrl().then(function(url) {
            return url;
        }, function(err) {
            // errored  .. TODO: retry
            throw err;
        });
    }, timeout, 'Expectation error: Timed out waiting for current url');
};
}
