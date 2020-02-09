import {VmDasBeingResetEvent} from './vm-das-being-reset-event';


export interface VmDasBeingResetWithScreenshotEvent extends VmDasBeingResetEvent {
  screenshotFilePath: string;
}