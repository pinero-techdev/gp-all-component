import {Injectable} from "@angular/core";
import {GlobalService} from "./global.service";
import {TreeNode} from "primeng/primeng";
import {CommonService, CommonRs} from "gp-all-component/services/common.service";
import {Observable} from "rxjs/Rx";
import {HttpClient} from "@angular/common/http";

export class ObtenListaFicherosRq {
    directorio:string;

    constructor(directorio:string) {
        this.directorio = directorio;
    }
}

export class ObtenListaFicherosRs extends CommonRs{
    ficheros:string[];
}

export class ObtenNivelSuperiorRq {
    directorio:string;

    constructor(directorio:string) {
        this.directorio = directorio;
    }
}

export class ObtenNivelSuperiorRs extends CommonRs{
    ficheros:string[];
    directorio:string;
}

@Injectable()
export class RemoteFsysService extends CommonService{
    remoteFsys:TreeNode[];
    selectedNode:any;

    constructor(private _http:HttpClient) {
        super(_http);
    }

    obtenListaFicheros(request:ObtenListaFicherosRq): Observable<ObtenListaFicherosRs> {
        let rq = JSON.stringify(request);
        return this.serviceRequest<ObtenListaFicherosRs>(
            `${GlobalService.BASE_URL}/utils-svc/obtenListaFicheros`,
            rq
        );
    }

    obtenNivelSuperior(request:ObtenNivelSuperiorRq): Observable<ObtenNivelSuperiorRs> {
        let rq = JSON.stringify(request);
        return this.serviceRequest<ObtenNivelSuperiorRs>(
            `${GlobalService.BASE_URL}/utils-svc/obtenNivelSuperior`,
            rq
        );
    }
}