import {VirtualPCIPassthroughPluginBackingInfo} from './virtual-p-c-i-passthrough-plugin-backing-info';


export interface VirtualPCIPassthroughVmiopBackingInfo extends VirtualPCIPassthroughPluginBackingInfo {
  vgpu?: string;
}