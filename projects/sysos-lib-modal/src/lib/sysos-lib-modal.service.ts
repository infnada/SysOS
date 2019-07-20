import {Injectable, Injector, Compiler, NgModuleFactory, ModuleWithComponentFactories, ViewContainerRef
} from '@angular/core';

import {NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {NGXLogger} from 'ngx-logger';

import {SysosLibFileSystemService} from '@sysos/lib-file-system';

import {Modal} from './types/modal';

declare const SystemJS: any;

@Injectable({
  providedIn: 'root'
})
export class SysosLibModalService {
  mainContainerRef: ViewContainerRef;

  modalInstances = [];
  registeredModals: Modal[] = [];

  constructor(private logger: NGXLogger,
              private injector: Injector,
              private compiler: Compiler,
              private FileSystem: SysosLibFileSystemService) {
  }


  setMainContainerRef(view: ViewContainerRef): void {
    this.mainContainerRef = view;
  }

  /**
   * @description
   * Returns all scripts to load as SysOS applications
   */
  getInstalledModals() {
    this.FileSystem.getFileSystemPath(null, '/bin/modals').subscribe(
      (res: { data: { filename: string }[] }) => {
        this.logger.info('Modal Factory -> Get Installed Modals successfully');

        res.data.forEach((value) => {
          if (value.filename.endsWith('.umd.js')) {
            this.loadModal(value);
          }
        });

      },
      error => {
        this.logger.error('Modal Factory -> Error while getting installed modals -> ', error);
      });
  }

  loadModal(modal: { filename: string }) {
    const module = modal.filename.replace('sysos-modal-', '').replace('.umd.js', '');
    let moduleCamel = modal.filename
      .toLowerCase()
      .replace('.umd.js', '')
      .replace(/-(.)/g, (match, group1) => {
        return group1.toUpperCase();
      });

    moduleCamel = moduleCamel.charAt(0).toUpperCase() + moduleCamel.slice(1);

    SystemJS.import(`/api/file/${encodeURIComponent('/bin/modals/' + modal.filename)}`).then((moduleToCompile) => {

      // compile module
      this.compiler.compileModuleAsync(moduleToCompile[moduleCamel + 'Module'])
      .then((modFac: NgModuleFactory<any>) => {

        // need to instantiate the Module so we can use it as the provider for the new component
        return this.compiler.compileModuleAndAllComponentsAsync<any>(modFac.moduleType).then(
          (factory: ModuleWithComponentFactories<any>) => {

          const modRef = modFac.create(this.injector);

          // Set factory to use in future
          this.registeredModals[module].factory = factory;
          this.registeredModals[module].modRef = modRef;

        });

      });

    });

  }

  registerModal(data: Modal): void {
    this.logger.debug('Modal Factory -> New modal registration -> id [%s]', data.modalId);

    this.registeredModals[data.modalId] = data;
  }

  /**
   * Opens a registered modal
   */
  openRegisteredModal(modalId: string, selector: string, resolvers: {}): Promise<NgbModalRef> {

    return new Promise((resolve) => {

      const viewContainerRef: ViewContainerRef = this.mainContainerRef;
      const cmpFactory = this.registeredModals[modalId].factory.componentFactories.find(
        x => x.componentType.name === 'EntryComponent'
      );

      const cmpRef = viewContainerRef.createComponent(cmpFactory, 0, this.registeredModals[modalId].modRef.injector);

      (cmpRef.instance as any).size = this.registeredModals[modalId].size;
      (cmpRef.instance as any).selector = selector;

      setTimeout(() => {
        this.modalInstances[selector] = (cmpRef.instance as any).OutputNgbModalRef;

        for (const [key, value] of Object.entries(resolvers)) {
          this.modalInstances[selector].componentInstance[key] = value;
        }

        return resolve(this.modalInstances[selector]);
      }, 0);
    });

  }

  /**
   * "alias" to open "plain" modalId
   */
  openLittleModal(title: string, text: string, selector: string, modalId: string) {

    return this.openRegisteredModal(modalId, selector, {
      title,
      text
    });

  }

  /**
   * Change text of already created modal
   */
  changeModalText(text: string, selector: string) {
    this.modalInstances[selector].componentInstance.text = text;
  }

  /**
   * Change type of already created modal
   */
  changeModalType(type: 'primary'|'secondary'|'success'|'danger'|'warning'|'info'|'light'|'dark'|'white', selector: string) {
    this.modalInstances[selector].componentInstance.type = type;
  }

  /**
   * Close already created modal
   */
  closeModal(selector: string) {
    if (this.modalInstances[selector]) this.modalInstances[selector].close('ok');
  }

  /**
   * Check if modal is opened
   */
  isModalOpened(selector: string) {
    if (this.modalInstances[selector]._contentRef) return true;
    return false;
  }

}
