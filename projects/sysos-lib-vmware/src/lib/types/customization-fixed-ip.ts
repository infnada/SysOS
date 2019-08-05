import {CustomizationIpGenerator} from './customization-ip-generator';

export interface CustomizationFixedIp extends CustomizationIpGenerator {
  ipAddress: string;
}
