import { Injectable } from '@angular/core';

/***
 *
 * SessionStorage service
 *
 * Used to wrap the DOM SessionStorage
 *
 */
@Injectable({ providedIn: 'root' })
export class SessionStorageService {
  // Browser compatibility
  isSupported = this.storageAvailable('sessionStorage');

  public setItem(key: string, value: any = null): void {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  public getItem(key: string): any {
    try {
      return JSON.parse(sessionStorage.getItem(key));
    } catch (e) {
      // return null because that's the default for the
      // 'native' sessionStorage for non-existing keys
      return null;
    }
  }

  public removeItem(key: string): void {
    sessionStorage.removeItem(key);
  }

  /**
   * clear through sessionStorage
   */
  public clear(): void {
    sessionStorage.clear();
  }

  /**
   *
   */

  private storageAvailable(type: string) {
    let storage;
    try {
      storage = window[type];
      const x = '__storage_test__';
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    } catch (e) {
      return (
        e instanceof DOMException &&
        // everything except Firefox
        (e.code === 22 ||
          // Firefox
          e.code === 1014 ||
          // test name field too, because code might not be present
          // everything except Firefox
          e.name === 'QuotaExceededError' ||
          // Firefox
          e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
        // acknowledge QuotaExceededError only if there's something already stored
        (storage && storage.length !== 0)
      );
    }
  }
}
