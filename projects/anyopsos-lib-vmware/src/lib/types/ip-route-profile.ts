import {ApplyProfile} from './apply-profile';

import {StaticRouteProfile} from './static-route-profile';
export interface IpRouteProfile extends ApplyProfile {
  staticRoute?: StaticRouteProfile[];
}
