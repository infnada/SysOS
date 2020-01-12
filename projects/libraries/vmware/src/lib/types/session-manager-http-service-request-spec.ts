import {SessionManagerServiceRequestSpec} from './session-manager-service-request-spec';

export interface SessionManagerHttpServiceRequestSpec extends SessionManagerServiceRequestSpec {
  method?: string;
  url: string;
}
