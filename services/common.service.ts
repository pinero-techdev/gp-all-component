import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {RequestOptions} from 'gp-all-component/resources/data/RequestOptions';
import {Observable} from 'rxjs/Observable'
import 'rxjs/Rx';
import {FilterDataTable} from '../resources/data/filterDataTable';
import {SortDataTable} from '../resources/data/sortDataTable';
import {hash} from '../util/sha256';
import {GlobalService} from './global.service';

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
    sort: SortDataTable[];
    filters: FilterDataTable[];
    obtainTotalRows: boolean;
    sessionId: string;
    idioma: string;
}

export class ErrorInformation {
    errorMessage: string;
    fields: FieldErrorInformation[];
    internalErrorMessage: string;
    notLogged: boolean;
}

export class FieldErrorInformation {
    name: string;
    message: string;
}

class CachedResponse {
    data: any;
    ttl: number;

    constructor(data: any, ttl: number) {
        this.data = data;
        this.ttl = ttl;
    }
}

@Injectable()
export class CommonService {

    constructor(private http: HttpClient) {
    }

    /*
     * dsteinsland: implementacion basica de cache.
     *              TODO: añadir posibilidad de insertar/quitar elementos
     *              manualmente en momentos concretos, para pantallas pesadas.
     */
    removeCachedObject(key: string) {
        console.debug("remove cached object: " + key);
        sessionStorage.removeItem(key);
    }

    cachedServiceRequest<T>(url: string, body: any, ttl?: number): Observable<T> {
        let userId = JSON.parse(sessionStorage.getItem('userInfo')).userId;
        let uintArray = new Uint8Array(JSON.stringify({userId, url, body}).split('').map(function (char) {
            return char.charCodeAt(0);
        }));
        let key = new Buffer(hash(uintArray)).toString('hex');
        if (sessionStorage.getItem(key) != null) {
            console.debug("cache hit: " + key + ":" + url);
            let cachedResponse = JSON.parse(sessionStorage.getItem(key));
            if (cachedResponse.ttl != null && Date.now() > cachedResponse.ttl) {
                console.debug("cache expired: " + url);
                this.removeCachedObject(key);
            } else {
                return Observable.create(observer => {
                    observer.next(cachedResponse.data);
                    observer.complete();
                });
            }
        }
        let headers = new HttpHeaders({
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': GlobalService.SESSION_ID
        });
        let options = new RequestOptions(headers);
        return this.http.post<T>(url, body, options).map(res => {
            let response: T = res;
            if (response['ok'] && response['error'] == null && response['errorMessage'] == null) {
                response['cacheKey'] = key;
                sessionStorage.setItem(key, JSON.stringify(new CachedResponse(response, (ttl != null) ? Date.now() + ttl : null)));
            }
            return response;
        });
    }

    serviceRequest<T>(url: string, body: any): Observable<T> {
        console.log('serviceRequest(' + url + ')');
        let headers = new HttpHeaders({
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': GlobalService.SESSION_ID
        });
        console.log( url );
        let options = new RequestOptions(headers);
        return this.http.post<T>(url, body, options);
    }

    /**
     * Adrian Gomez Macias creo una funcion para realizar peticiones GET que necesiten pasar un JSON
     */
    serviceGetRq<T>(url: string, rq: any): Observable<T> {
        console.log('serviceGetRq(' + url + ')');
        let headers = new HttpHeaders({
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': GlobalService.SESSION_ID
        });
        let options = new RequestOptions(headers);
        url = url + "?rq=" + rq;
        return this.http.get<T>(url, options);
    }

    /**
     * Creo una funcion para realizar peticiones GET que no necesiten pasar ningun dato
     */
    serviceGet<T>(url: string): Observable<T> {
        console.log('serviceGet(' + url + ')');
        let headers = new HttpHeaders({"Authorization": GlobalService.SESSION_ID});
        let options = new RequestOptions(headers);
        return this.http.get<T>(url, options);
    }
}
