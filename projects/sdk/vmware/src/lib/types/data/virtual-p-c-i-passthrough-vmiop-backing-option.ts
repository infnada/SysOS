import {VirtualPCIPassthroughPluginBackingOption} from './virtual-p-c-i-passthrough-plugin-backing-option';

import {StringOption} from './string-option';

export interface VirtualPCIPassthroughVmiopBackingOption extends VirtualPCIPassthroughPluginBackingOption {
  maxInstances: number;
  vgpu: StringOption;
}