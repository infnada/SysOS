import {DynamicData} from './dynamic-data';
import {Long} from './long';

export interface VsanNewPolicyBatch extends DynamicData {
  policy?: string;
  size?: Long[];
}
