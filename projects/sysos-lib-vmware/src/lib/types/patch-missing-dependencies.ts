import {PatchNotApplicable} from './patch-not-applicable';

export interface PatchMissingDependencies extends PatchNotApplicable {
  prerequisiteLib?: string[];
  prerequisitePatch?: string[];
}
