import { browser, by, element } from 'protractor';

/**
 * App Page
 */
export class AppPage {
  /**
   * Navigate to
   */
  public navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  /**
   * Get title text
   */
  public getTitleText(): Promise<string> {
    return element(by.css('app-root .content span')).getText() as Promise<string>;
  }
}
