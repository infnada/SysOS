import {VirtualPCIPassthroughPluginBackingOption} from './virtual-p-c-i-passthrough-plugin-backing-option';

import {StringOption} from './string-option';
import {Int} from './int';
export interface VirtualPCIPassthroughVmiopBackingOption extends VirtualPCIPassthroughPluginBackingOption {
  maxInstances: Int;
  vgpu: StringOption;
}
