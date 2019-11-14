import {Event} from './event';

export interface TemplateUpgradeEvent extends Event {
  legacyTemplate: string;
}
