import {VMotionInterfaceIssue} from './v-motion-interface-issue';


export interface VMotionLinkDown extends VMotionInterfaceIssue {
  network: string;
}