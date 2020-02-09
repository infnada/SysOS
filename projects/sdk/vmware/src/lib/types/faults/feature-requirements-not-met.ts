import {VirtualHardwareCompatibilityIssue} from './virtual-hardware-compatibility-issue';

import {VirtualMachineFeatureRequirement} from '../data/virtual-machine-feature-requirement';
import {ManagedObjectReference} from '../data/managed-object-reference';

export interface FeatureRequirementsNotMet extends VirtualHardwareCompatibilityIssue {
  featureRequirement?: VirtualMachineFeatureRequirement[];
  host?: ManagedObjectReference & { $type: 'HostSystem'; };
  vm?: ManagedObjectReference & { $type: 'VirtualMachine'; };
}