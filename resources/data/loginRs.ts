import {UserInfo} from "./userInfo";
import {CommonRs} from "../../services/common.service";
export class LoginRs extends CommonRs {
    userInfo: UserInfo;
	sessionId: string;
    constructor(){
        super();
    }
}