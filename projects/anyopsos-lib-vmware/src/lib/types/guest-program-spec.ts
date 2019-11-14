import {DynamicData} from './dynamic-data';

export interface GuestProgramSpec extends DynamicData {
  arguments: string;
  envVariables?: string[];
  programPath: string;
  workingDirectory?: string;
}
