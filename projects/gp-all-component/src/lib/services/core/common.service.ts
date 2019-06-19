import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Buffer } from 'buffer';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CachedElement } from '../../resources/data/cached-element.model';
import { DataTableFilter } from '../../resources/data/data-table/filter/data-table-filter.model';
import { DataTableSort } from '../../resources/data/data-table/sort/data-table-sort.model';
import { ErrorInformation } from '../../resources/data/error-information/error-information.model';
import { RequestOptions } from '../../resources/data/request-options.model';

import { hash } from '../../util/sha256';

import { GlobalService } from './global.service';

export class CommonRs {
  ok: boolean;
  error: ErrorInformation;
  cacheKey: string;
  totalRows: number;
  partialRows: number;
}

export class CommonRq {
  orden: string;
  rows: number;
  firstRow: number;
  sort: DataTableSort[];
  filters: DataTableFilter[];
  obtainTotalRows: boolean;
  sessionId: string;
  idioma: string;
}

@Injectable({ providedIn: 'root' })
export class CommonService {
  constructor(private http: HttpClient) {}

  fromCache<T>(url: string, body: any, ttl?: number): Observable<T> {
    const userId = JSON.parse(sessionStorage.getItem('userInfo')).userId;
    const uintArray = new Uint8Array(
      JSON.stringify({ userId, url, body })
        .toString()
        .split('')
        .map((char) => {
          return char.charCodeAt(0);
        })
    );
    const key = new Buffer(hash(uintArray)).toString('hex');
    if (sessionStorage.getItem(key) !== null) {
      const cachedElement = JSON.parse(sessionStorage.getItem(key));
      if (cachedElement.ttl !== null && Date.now() > cachedElement.ttl) {
        sessionStorage.removeItem(key);
      } else {
        return Observable.create((observer) => {
          observer.next(cachedElement.data);
          observer.complete();
        });
      }
    }
    const res = this.post<T>(url, body);
    const ok = 'ok';
    const error = 'error';
    const errorMessage = 'errorMessage';
    const cacheKey = 'cacheKey';
    res.pipe(
      map((response) => {
        if (response[ok] && response[error] === null && response[errorMessage] === null) {
          response[cacheKey] = key;
          sessionStorage.setItem(
            key,
            JSON.stringify(new CachedElement(response, ttl !== null ? Date.now() + ttl : null))
          );
        }
        return response;
      })
    );
    return res;
  }

  post<T>(url: string, body: any): Observable<T> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: GlobalService.getSESSION_ID(),
    });
    const options = new RequestOptions(headers);
    return this.http.post<T>(url, body, options);
  }

  postNoAuth<T>(
    url: string,
    body: any,
    headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8',
    })
  ): Observable<T> {
    const options = new RequestOptions(headers);
    return this.http.post<T>(url, body, options);
  }

  get<T>(url: string): Observable<T> {
    const headers = new HttpHeaders({ Authorization: GlobalService.getSESSION_ID() });
    const options = new RequestOptions(headers);
    return this.http.get<T>(url, options);
  }

  getNoAuth<T>(
    url: string,
    headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8',
    })
  ): Observable<T> {
    const options = new RequestOptions(headers);
    return this.http.get<T>(url, options);
  }

  getQueryString<T>(url: string, rq: any): Observable<T> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: GlobalService.getSESSION_ID(),
    });
    const options = new RequestOptions(headers);
    url = url + '?rq=' + rq;
    return this.http.get<T>(url, options);
  }

  fileRequest(url: string, body: any): Observable<HttpResponse<Blob>> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: GlobalService.getSESSION_ID(),
    });
    return this.http.post(url, body, {
      headers,
      observe: 'response',
      responseType: 'blob',
    });
  }
}
