import {ModuleWithComponentFactories, NgModuleRef} from '@angular/core';

export interface Modal {
  uuid: string;
  size: string;
  factory?: ModuleWithComponentFactories<any>;
  modRef?: NgModuleRef<any>;
}
