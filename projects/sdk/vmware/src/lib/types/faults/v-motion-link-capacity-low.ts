import {VMotionInterfaceIssue} from './v-motion-interface-issue';


export interface VMotionLinkCapacityLow extends VMotionInterfaceIssue {
  network: string;
}