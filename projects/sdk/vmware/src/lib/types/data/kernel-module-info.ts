import {DynamicData} from './dynamic-data';

import {KernelModuleSectionInfo} from './kernel-module-section-info';

export interface KernelModuleInfo extends DynamicData {
  bssSection: KernelModuleSectionInfo;
  dataSection: KernelModuleSectionInfo;
  enabled: boolean;
  filename: string;
  id: number;
  loaded: boolean;
  name: string;
  optionString: string;
  readOnlySection: KernelModuleSectionInfo;
  textSection: KernelModuleSectionInfo;
  useCount: number;
  version: string;
  writableSection: KernelModuleSectionInfo;
}