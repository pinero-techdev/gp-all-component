import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {CommonRs, CommonService} from "gp-all-component/services/common.service";
import {TreeNode} from "primeng/primeng";
import {Observable} from "rxjs/Rx";
import {BaseDir} from "../resources/data/baseDir";
import {GlobalService} from "./global.service";

export class ObtenListaFicherosRq {

    constructor() {
    }
}

export class ObtenListaFicherosRs extends CommonRs {
    ficheros: BaseDir;
}

export class ObtenNivelSuperiorRq {
    directorio: string;

    constructor(directorio: string) {
        this.directorio = directorio;
    }
}

export class ObtenNivelSuperiorRs extends CommonRs {
    ficheros: string[];
    directorio: string;
}

@Injectable()
export class RemoteFsysService extends CommonService {
    remoteFsys: TreeNode[];
    selectedNode: any;

    constructor(private _http: HttpClient) {
        super(_http);
    }

    obtenListaFicheros(request: ObtenListaFicherosRq): Observable<ObtenListaFicherosRs> {
        let rq = JSON.stringify(request);
        return this.serviceRequest<ObtenListaFicherosRs>(
            `${GlobalService.BASE_URL}/utils-svc/obtenListaFicheros`,
            rq
        );
    }

    obtenNivelSuperior(request: ObtenNivelSuperiorRq): Observable<ObtenNivelSuperiorRs> {
        let rq = JSON.stringify(request);
        return this.serviceRequest<ObtenNivelSuperiorRs>(
            `${GlobalService.BASE_URL}/utils-svc/obtenNivelSuperior`,
            rq
        );
    }
}