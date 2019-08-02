import {PhysicalNicSpec} from "./physical-nic-spec";

export interface PhysicalNicConfig {
  device: string;
  spec: PhysicalNicSpec;
}
