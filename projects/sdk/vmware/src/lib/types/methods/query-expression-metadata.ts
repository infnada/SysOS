import {ManagedObjectReference} from '../data/managed-object-reference';


export interface QueryExpressionMetadata {
  _this: ManagedObjectReference;
  expressionName?: string[];
  profile?: ManagedObjectReference & { $type: 'Profile'; };
}