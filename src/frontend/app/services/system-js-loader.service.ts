import {Injectable} from '@angular/core';

// Prepare output for SystemJS
declare const SystemJS: any;

import * as Tslib from 'tslib';

import * as angularCore from '@angular/core';
import * as angularPb from '@angular/platform-browser';
import * as angularForms from '@angular/forms';
import * as angularCommon from '@angular/common';
import * as angularCommonHttp from '@angular/common/http';
import * as angularMaterial from '@angular/material';
import * as cdkTree from '@angular/cdk/tree';
import * as cdkDragDrop from '@angular/cdk/drag-drop';
import * as ngBootstrap from '@ng-bootstrap/ng-bootstrap';
import * as rxjs from 'rxjs';
import * as rxjsOperators from 'rxjs/operators';

import * as ngxMaterialFileInput from 'ngx-material-file-input';
import * as ngxSocketIo from 'ngx-socket-io';
import * as angularFile from 'angular-file';
import * as uuid from 'uuid';
import * as jsYaml from 'js-yaml';

import * as AnyOpsOSLibAngularMaterial from '@anyopsos/lib-angular-material';
import * as AnyOpsOSLibApplications from '@anyopsos/lib-application';
import * as AnyOpsOSLibFolder from '@anyopsos/lib-folder';
import * as AnyOpsOSLibFile from '@anyopsos/lib-file';
import * as AnyOpsOSLibFileSystem from '@anyopsos/lib-file-system';
import * as AnyOpsOSLibFileSystemUi from '@anyopsos/lib-file-system-ui';
import * as AnyOpsOSLibKubernetes from '@anyopsos/lib-kubernetes';
import * as AnyOpsOSLibLogger from '@anyopsos/lib-logger';
import * as AnyOpsOSLibModal from '@anyopsos/lib-modal';
import * as AnyOpsOSLibNetApp from '@anyopsos/lib-netapp';
import * as AnyOpsOSLibPipes from '@anyopsos/lib-pipes';
import * as AnyOpsOSLibScrollSpy from '@anyopsos/lib-scroll-spy';
import * as AnyOpsOSLibSelectable from '@anyopsos/lib-selectable';
import * as AnyOpsOSLibServiceInjector from '@anyopsos/lib-service-injector';
import * as AnyOpsOSLibTerminal from '@anyopsos/lib-terminal';
import * as AnyOpsOSLibTheia from '@anyopsos/lib-theia';
import * as AnyOpsOSLibTypes from '@anyopsos/lib-types';
import * as AnyOpsOSLibUser from '@anyopsos/lib-user';
import * as AnyOpsOSLibUtils from '@anyopsos/lib-utils';
import * as AnyOpsOSLibVMWare from '@anyopsos/lib-vmware';

import * as NgxMonacoEditor from 'ngx-monaco-editor';

@Injectable({
  providedIn: 'root'
})
export class SystemJsLoaderService {

  constructor() {
    SystemJS.set('tslib', SystemJS.newModule(Tslib));
    SystemJS.set('@angular/core', SystemJS.newModule(angularCore));
    SystemJS.set('@angular/forms', SystemJS.newModule(angularForms));
    SystemJS.set('@angular/platform-browser', SystemJS.newModule(angularPb));
    SystemJS.set('@angular/common', SystemJS.newModule(angularCommon));
    SystemJS.set('@angular/common/http', SystemJS.newModule(angularCommonHttp));
    SystemJS.set('@angular/material', SystemJS.newModule(angularMaterial));
    SystemJS.set('@angular/cdk/tree', SystemJS.newModule(cdkTree));
    SystemJS.set('@angular/cdk/drag-drop', SystemJS.newModule(cdkDragDrop));
    SystemJS.set('@ng-bootstrap/ng-bootstrap', SystemJS.newModule(ngBootstrap));
    SystemJS.set('rxjs', SystemJS.newModule(rxjs));
    SystemJS.set('rxjs/operators', SystemJS.newModule(rxjsOperators));

    SystemJS.set('ngx-material-file-input', SystemJS.newModule(ngxMaterialFileInput));
    SystemJS.set('ngx-socket-io', SystemJS.newModule(ngxSocketIo));
    SystemJS.set('angular-file', SystemJS.newModule(angularFile));
    SystemJS.set('uuid', SystemJS.newModule(uuid));
    SystemJS.set('js-yaml', SystemJS.newModule(jsYaml));

    SystemJS.set('@anyopsos/lib-angular-material', SystemJS.newModule(AnyOpsOSLibAngularMaterial));
    SystemJS.set('@anyopsos/lib-application', SystemJS.newModule(AnyOpsOSLibApplications));
    SystemJS.set('@anyopsos/lib-folder', SystemJS.newModule(AnyOpsOSLibFolder));
    SystemJS.set('@anyopsos/lib-file', SystemJS.newModule(AnyOpsOSLibFile));
    SystemJS.set('@anyopsos/lib-file-system', SystemJS.newModule(AnyOpsOSLibFileSystem));
    SystemJS.set('@anyopsos/lib-file-system-ui', SystemJS.newModule(AnyOpsOSLibFileSystemUi));
    SystemJS.set('@anyopsos/lib-kubernetes', SystemJS.newModule(AnyOpsOSLibKubernetes));
    SystemJS.set('@anyopsos/lib-logger', SystemJS.newModule(AnyOpsOSLibLogger));
    SystemJS.set('@anyopsos/lib-modal', SystemJS.newModule(AnyOpsOSLibModal));
    SystemJS.set('@anyopsos/lib-netapp', SystemJS.newModule(AnyOpsOSLibNetApp));
    SystemJS.set('@anyopsos/lib-pipes', SystemJS.newModule(AnyOpsOSLibPipes));
    SystemJS.set('@anyopsos/lib-scroll-spy', SystemJS.newModule(AnyOpsOSLibScrollSpy));
    SystemJS.set('@anyopsos/lib-selectable', SystemJS.newModule(AnyOpsOSLibSelectable));
    SystemJS.set('@anyopsos/lib-service-injector', SystemJS.newModule(AnyOpsOSLibServiceInjector));
    SystemJS.set('@anyopsos/lib-terminal', SystemJS.newModule(AnyOpsOSLibTerminal));
    SystemJS.set('@anyopsos/lib-theia', SystemJS.newModule(AnyOpsOSLibTheia));
    SystemJS.set('@anyopsos/lib-types', SystemJS.newModule(AnyOpsOSLibTypes));
    SystemJS.set('@anyopsos/lib-user', SystemJS.newModule(AnyOpsOSLibUser));
    SystemJS.set('@anyopsos/lib-utils', SystemJS.newModule(AnyOpsOSLibUtils));
    SystemJS.set('@anyopsos/lib-vmware', SystemJS.newModule(AnyOpsOSLibVMWare));

    SystemJS.set('ngx-monaco-editor', SystemJS.newModule(NgxMonacoEditor));
  }
}
