import {Injectable} from "@angular/core";
import { Http, Headers, RequestOptions, Response } from "@angular/http";
import { Observable } from "rxjs/Rx";
import { MenuRq } from "../resources/data/menuRq";

@Injectable()
export class AppMenuProviderService {

    getEstructuraMenu() : any[] { return null; }
    obtenOpcionesActivas(rq: MenuRq) : Observable<any> { return null; }

}
