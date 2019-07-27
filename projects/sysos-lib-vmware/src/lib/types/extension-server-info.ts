import {Description} from './description';

export interface ExtensionServerInfo {
  adminEmail: string[];
  company: string;
  description: Description;
  serverThumbprint?: string;
  type: string;
  url: string;
}
