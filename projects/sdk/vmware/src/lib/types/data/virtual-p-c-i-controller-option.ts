import {VirtualControllerOption} from './virtual-controller-option';

import {IntOption} from './int-option';

export interface VirtualPCIControllerOption extends VirtualControllerOption {
  numEthernetCards: IntOption;
  numNVMEControllers?: IntOption;
  numParaVirtualSCSIControllers: IntOption;
  numPCIPassthroughDevices: IntOption;
  numSasSCSIControllers: IntOption;
  numSATAControllers: IntOption;
  numSCSIControllers: IntOption;
  numSoundCards: IntOption;
  numVideoCards: IntOption;
  numVmciDevices: IntOption;
  numVmiRoms: IntOption;
  numVmxnet3EthernetCards: IntOption;
  numVmxnet3VrdmaEthernetCards?: IntOption;
}