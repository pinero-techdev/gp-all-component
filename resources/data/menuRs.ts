import {CommonRs} from "../../services/common.service";
import {Menu} from "./menu";
import {RolInfo} from "./rolInfo";

export class MenuRs extends CommonRs {
    menu: Menu;
    roles: RolInfo[];

    constructor(){
        super();
    }
}