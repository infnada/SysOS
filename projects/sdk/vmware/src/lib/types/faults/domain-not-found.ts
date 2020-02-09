import {ActiveDirectoryFault} from './active-directory-fault';


export interface DomainNotFound extends ActiveDirectoryFault {
  domainName: string;
}