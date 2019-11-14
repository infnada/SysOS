import {PatchNotApplicable} from './patch-not-applicable';

export interface PatchSuperseded extends PatchNotApplicable {
  supersede?: string[];
}
