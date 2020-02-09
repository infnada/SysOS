import {DynamicData} from './dynamic-data';

import {NetIpStackInfoDefaultRouter} from './net-ip-stack-info-default-router';
import {NetIpStackInfoNetToMedia} from './net-ip-stack-info-net-to-media';

export interface NetIpStackInfo extends DynamicData {
  defaultRouter?: NetIpStackInfoDefaultRouter[];
  neighbor?: NetIpStackInfoNetToMedia[];
}