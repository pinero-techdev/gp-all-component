import {Injectable} from "@angular/core";
import { Http, Headers, RequestOptions, Response } from "@angular/http";
import { AppMenuProviderService } from "./app-menu-provider.service";
import { MenuRq } from "../resources/data/menuRq";

@Injectable()
export class AppMenuService {
    menu: any[];
    temp: any[];

    constructor( private _appMenuProvider : AppMenuProviderService ) {
        this.temp = _appMenuProvider.getEstructuraMenu();
    }

    obtenMenu(rq: MenuRq) {
        //TODO optimizar programandolo de forma recursiva para cualquier numero de niveles
        if (rq.usuario != undefined && rq.usuario != null) {
            this._appMenuProvider.obtenOpcionesActivas(rq).subscribe(
                data => {
                    if (data) {
                        if (data.menu.opciones != undefined) {
                            //lvl 1
                            for (let i = 0; i < this.temp.length; i++) {
                                if (this.tieneSubMenu(this.temp[i])) {
                                    //lvl 2
                                    for (let j = 0; j < this.temp[i].submenus.length; j++) {
                                        if (this.tieneSubMenu(this.temp[i].submenus[j])) {
                                            //lvl 3
                                            for (let k = 0; k < this.temp[i].submenus[j].submenus.length; k++) {
                                               if (this.tieneSubMenu(this.temp[i].submenus[j].submenus[k])) {
                                                    //lvl 4
                                                   for (let l = 0; l < this.temp[i].submenus[j].submenus[k].submenus.length; l++) {
                                                       if (this.tieneSubMenu(this.temp[i].submenus[j].submenus[k].submenus[l])) {

                                                           //lvl 5
                                                           for (let m = 0; m < this.temp[i].submenus[j].submenus[k].submenus[l].submenus.length; m++) {
                                                               if (this.tieneSubMenu(this.temp[i].submenus[j].submenus[k].submenus[l])) {
                                                                   //lvl 6
                                                                   if (this.esOpcionValida(this.temp[i].submenus[j].submenus[k].submenus[l].submenus[m].id, data.menu.opciones)) {
                                                                       this.temp[i].submenus[j].submenus[k].submenus[l].submenus[m].enabled = true;
                                                                       this.temp[i].submenus[j].submenus[k].submenus[l].enabled = true;
                                                                       this.temp[i].submenus[j].submenus[k].enabled = true;
                                                                       this.temp[i].submenus[j].enabled = true;
                                                                       this.temp[i].enabled = true;
                                                                   }

                                                                   //lvl 6
                                                               } else if (this.esOpcionValida(this.temp[i].submenus[j].submenus[k].submenus[l].submenus[m].id, data.menu.opciones)) {
                                                                   this.temp[i].submenus[j].submenus[k].submenus[l].submenus[m].enabled = true;
                                                                   this.temp[i].submenus[j].submenus[k].submenus[l].enabled = true;
                                                                   this.temp[i].submenus[j].submenus[k].enabled = true;
                                                                   this.temp[i].submenus[j].enabled = true;
                                                                   this.temp[i].enabled = true;
                                                               }
                                                           }

                                                           //lvl 5
                                                       } else if (this.esOpcionValida(this.temp[i].submenus[j].submenus[k].submenus[l].id, data.menu.opciones)) {
                                                           this.temp[i].submenus[j].submenus[k].submenus[l].enabled = true;
                                                           this.temp[i].submenus[j].submenus[k].enabled = true;
                                                           this.temp[i].submenus[j].enabled = true;
                                                           this.temp[i].enabled = true;
                                                       }
                                                   }

                                                    //lvl 4 end
                                                } else if (this.esOpcionValida(this.temp[i].submenus[j].submenus[k].id, data.menu.opciones)) {
                                                        this.temp[i].submenus[j].submenus[k].enabled = true;
                                                        this.temp[i].submenus[j].enabled = true;
                                                        this.temp[i].enabled = true;
                                                }
                                            }
                                            //lvl 3 end
                                        } else if (this.esOpcionValida(this.temp[i].submenus[j].id, data.menu.opciones)) {
                                            this.temp[i].submenus[j].enabled = true;
                                            this.temp[i].enabled = true;
                                        }
                                    }
                                    //lvl 2 end
                                } else if (this.esOpcionValida(this.temp[i].id, data.menu.opciones)) {
                                    this.temp[i].enabled = true;
                                }
                            }
                            //lvl 1 end
                        }
                    } else {
                        console.error("No se recuperó un menú");
                    }
                },
                error => console.error(error),
                () => {
                    console.debug("finalizado obtenMenu");
                    return this.temp;
                }
            );
            return this.temp; //Un cop funcioni el menu llevar això
        } else {
            return this.temp;
        }
    }

    esOpcionValida(id: string, options: any[]) {
        return ( options[id] != undefined );
    }

    tieneSubMenu(elemento: any) {
        return (elemento.submenus != undefined && elemento.submenus != null);
    }

}
