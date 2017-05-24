import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable'
import 'rxjs/Rx';
import {hash} from '../components/util/sha256';

/**
 * Definiciones comunes del acceso a servicios.
 */

export class CommonRs {
    ok: boolean;
    error: ErrorInformation;
}

export class CommonRq {
    orden: string;
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
  
    constructor(data:any, ttl:number) {
      this.data = data;
      this.ttl = ttl;
    }
}

@Injectable()
export class CommonService {

    constructor(private http: Http) {
    }
  
    /*
     * dsteinsland: implementacion basica de cache.
     *              TODO: añadir posibilidad de insertar/quitar elementos
     *              manualmente en momentos concretos, para pantallas pesadas.
     */
    cachedServiceRequest<T>( url: string, body: any, ttl?: number) : Observable<T> {
        let uintArray = new Uint8Array(JSON.stringify({url,body}).split('').map(function(char) {return char.charCodeAt(0);}));
        let key = new Buffer(hash(uintArray)).toString('hex');
        if (sessionStorage.getItem(key) != null) {
          console.debug("cache hit: "+url);
          let cachedResponse = JSON.parse(sessionStorage.getItem(key));
          if (cachedResponse.ttl != null && Date.now() > cachedResponse.ttl) {
            console.debug("cache expired: "+url);
            sessionStorage.removeItem(key);
          } else {
            return Observable.create(observer => {
                observer.next(cachedResponse.data);
                observer.complete();
            });
          }
        }
        let headers = new Headers({ 'Content-Type': 'application/json; charset=UTF-8' });
        let options = new RequestOptions({ headers: headers });
        let post = this.http.post(url,body,options);
        return post.map( (res: Response) => { 
          let response : T = res.json();
          if (response['ok'] && response['error'] == null && response['errorMessage'] == null)
              sessionStorage.setItem(key,JSON.stringify(new CachedResponse(response,(ttl != null)?Date.now()+ttl:null)));
          return response; 
        } );
    }
  
    serviceRequest<T>( url: string, body: any ) : Observable<T> {
        let headers = new Headers({ 'Content-Type': 'application/json; charset=UTF-8' });
        let options = new RequestOptions({ headers: headers });
        let post = this.http.post(url,body,options);
        return post.map( (res: Response) => { let response : T = res.json(); return response; } );
    }

    /**
     * Adrian Gomez Macias creo una funcion para realizar peticiones GET que necesiten pasar un JSON
     */
    serviceGetRq<T>(url: string, rq: any) : Observable<T> {
      let headers = new Headers({ 'Content-Type': 'application/json; charset=UTF-8' });
      let options = new RequestOptions({ headers: headers });

      url = url +"?rq="+rq;
      let get = this.http.get(url,options);

      return get.map(( res: Response) => {let response : T = res.json(); return response;});
    }
	
    /**
     * Creo una funcion para realizar peticiones GET que no necesiten pasar ningun dato
     */
    serviceGet<T>(url: string) : Observable<T> {
      let headers = new Headers({ 'Content-Type': 'application/json; charset=UTF-8' });

      let get = this.http.get(url);

      return get.map(( res: Response) => {let response : T = res.json(); return response;});
    }

}
