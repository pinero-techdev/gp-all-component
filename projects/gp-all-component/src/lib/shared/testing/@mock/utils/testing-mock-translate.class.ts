import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs';
import { TranslateLoader } from '@ngx-translate/core';

export class MockTranslateLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    return of({});
  }
}
