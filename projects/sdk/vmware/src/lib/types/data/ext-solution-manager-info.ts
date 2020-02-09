import {DynamicData} from './dynamic-data';

import {ExtSolutionManagerInfoTabInfo} from './ext-solution-manager-info-tab-info';

export interface ExtSolutionManagerInfo extends DynamicData {
  smallIconUrl?: string;
  tab?: ExtSolutionManagerInfoTabInfo[];
}