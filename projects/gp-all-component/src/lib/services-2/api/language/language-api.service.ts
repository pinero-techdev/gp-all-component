import { GlobalService } from '../../core/global.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Language } from './language.model';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class LanguageApiService {
    public apiUrl = `${GlobalService.getBASE_URL()}/multiidioma-svc/`;

    constructor(private http: HttpClient) {}

    public getLanguages(): Observable<Language[]> {
        const url = this.apiUrl + 'getTranslations';
        return this.http.get(url).map((response: any) => response.map((lang) => new Language()));
    }
}
