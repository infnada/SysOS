import {NgModuleFactory, NgModuleRef} from "@angular/core";

export interface Modal {
  modalId: string,
  size: string,
  factory?: NgModuleFactory<any>
  modRef?: NgModuleRef<any>
}
