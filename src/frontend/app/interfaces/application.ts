import {NgModuleFactory} from '@angular/core';

export interface Application {
  id: string;
  ico?: string;
  name?: string;
  menu?: boolean;
  pinned?: boolean;
  actions?: boolean;
  status?: boolean;
  style?: { height: string, width: string, top: string, left: string};
  factory?: NgModuleFactory<any>;
  init_data?: any;
}
