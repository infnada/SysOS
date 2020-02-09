import {EVCAdmissionFailed} from './e-v-c-admission-failed';


export interface EVCAdmissionFailedCPUModelForMode extends EVCAdmissionFailed {
  currentEVCModeKey: string;
}