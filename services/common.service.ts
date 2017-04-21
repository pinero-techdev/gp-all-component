import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable'
import 'rxjs/Rx';

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

@Injectable()
export class CommonService {

    constructor(private http: Http) {
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
