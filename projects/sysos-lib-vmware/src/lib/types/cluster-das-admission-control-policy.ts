import {DynamicData} from './dynamic-data';
import {Int} from './int';

export interface ClusterDasAdmissionControlPolicy extends DynamicData {
  resourceReductionToToleratePercent?: Int;
}
