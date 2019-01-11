import { CommonRs } from '../../services/common.service';
import { UserInfo } from './userInfo';

export class SessionInfoRs extends CommonRs {
  userInfo: UserInfo;
  sessionId: string;
}
