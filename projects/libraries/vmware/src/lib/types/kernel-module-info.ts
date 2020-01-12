import {DynamicData} from './dynamic-data';

import {KernelModuleSectionInfo} from './kernel-module-section-info';
import {Int} from './int';
export interface KernelModuleInfo extends DynamicData {
  bssSection: KernelModuleSectionInfo;
  dataSection: KernelModuleSectionInfo;
  enabled: boolean;
  filename: string;
  id: Int;
  loaded: boolean;
  name: string;
  optionString: string;
  readOnlySection: KernelModuleSectionInfo;
  textSection: KernelModuleSectionInfo;
  useCount: Int;
  version: string;
  writableSection: KernelModuleSectionInfo;
}
