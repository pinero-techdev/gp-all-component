import {HttpHeaders} from "@angular/common/http";

/**
 * Definiciones comunes del acceso a servicios.
 */

export class RequestOptions {
    constructor(public headers: HttpHeaders, responseType?: string) {
    }
}
