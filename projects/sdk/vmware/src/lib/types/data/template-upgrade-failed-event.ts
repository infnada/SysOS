import {TemplateUpgradeEvent} from './template-upgrade-event';

import {LocalizedMethodFault} from './localized-method-fault';

export interface TemplateUpgradeFailedEvent extends TemplateUpgradeEvent {
  reason: LocalizedMethodFault;
}