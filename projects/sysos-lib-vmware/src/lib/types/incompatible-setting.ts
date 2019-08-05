import {InvalidArgument} from './invalid-argument';

export interface IncompatibleSetting extends InvalidArgument {
  conflictingProperty: string;
}
