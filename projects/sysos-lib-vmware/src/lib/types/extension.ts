import {ExtensionClientInfo} from "./extension-client-info";
import {Description} from "./description";
import {ExtensionEventTypeInfo} from "./extension-event-type-info";
import {ExtExtendedProductInfo} from "./ext-extended-product-info";
import {ExtensionFaultTypeInfo} from "./extension-fault-type-info";
import {ExtensionHealthInfo} from "./extension-health-info";
import {ExtManagedEntityInfo} from "./ext-managed-entity-info";
import {ExtensionOvfConsumerInfo} from "./extension-ovf-consumer-info";
import {ExtensionPrivilegeInfo} from "./extension-privilege-info";
import {ExtensionResourceInfo} from "./extension-resource-info";
import {ExtensionServerInfo} from "./extension-server-info";
import {ExtSolutionManagerInfo} from "./ext-solution-manager-info";
import {ExtensionTaskTypeInfo} from "./extension-task-type-info";

export interface Extension {
  client?: ExtensionClientInfo[];
  company: string;
  description: Description;
  eventList?: ExtensionEventTypeInfo[];
  extendedProductInfo?: ExtExtendedProductInfo;
  faultList?: ExtensionFaultTypeInfo[];
  healthInfo?: ExtensionHealthInfo;
  key: string;
  lastHeartbeatTime: Date;
  managedEntityInfo?: ExtManagedEntityInfo[];
  ovfConsumerInfo?: ExtensionOvfConsumerInfo;
  privilegeList?: ExtensionPrivilegeInfo[];
  resourceList?: ExtensionResourceInfo[];
  server?: ExtensionServerInfo[];
  shownInSolutionManager: boolean;
  solutionManagerInfo?: ExtSolutionManagerInfo;
  subjectName?: string;
  taskList?: ExtensionTaskTypeInfo[];
  type?: string;
  version: string;
}
