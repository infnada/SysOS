import {Injectable} from '@angular/core';

// Prepare output for SystemJS
declare const SystemJS: any;

import * as Tslib from 'tslib';

import * as angularCore from '@angular/core';
import * as angularPb from '@angular/platform-browser';
import * as angularForms from '@angular/forms';
import * as angularCommon from '@angular/common';
import * as angularCommonHttp from '@angular/common/http';

import * as rxjs from 'rxjs';
import * as rxjsOperators from 'rxjs/operators';

import * as ngxSocketIo from 'ngx-socket-io';
import * as uuid from 'uuid';
import * as jsYaml from 'js-yaml';

import * as AnyOpsOSLibAngularMaterial from '@anyopsos/lib-angular-material';
import * as AnyOpsOSLibApplication from '@anyopsos/lib-application';
import * as AnyOpsOSLibCredential from '@anyopsos/lib-credential';
import * as AnyOpsOSLibDiagram from '@anyopsos/lib-diagram';
import * as AnyOpsOSLibFolder from '@anyopsos/lib-folder';
import * as AnyOpsOSLibFolderExplorer from '@anyopsos/lib-folder-explorer';
import * as AnyOpsOSLibFile from '@anyopsos/lib-file';
import * as AnyOpsOSLibFileSystem from '@anyopsos/lib-file-system';
import * as AnyOpsOSLibFileSystemUi from '@anyopsos/lib-file-system-ui';
import * as AnyOpsOSLibNodeKubernetes from '@anyopsos/lib-node-kubernetes';
import * as AnyOpsOSLibLogger from '@anyopsos/lib-logger';
import * as AnyOpsOSLibModal from '@anyopsos/lib-modal';
import * as AnyOpsOSLibNetApp from '@anyopsos/lib-node-netapp';
import * as AnyOpsOSLibPipes from '@anyopsos/lib-pipes';
import * as AnyOpsOSLibScrollSpy from '@anyopsos/lib-scroll-spy';
import * as AnyOpsOSLibSelectable from '@anyopsos/lib-selectable';
import * as AnyOpsOSLibServiceInjector from '@anyopsos/lib-service-injector';
import * as AnyOpsOSLibSsh from '@anyopsos/lib-ssh';
import * as AnyOpsOSLibTerminal from '@anyopsos/lib-terminal';
import * as AnyOpsOSLibTypes from '@anyopsos/lib-types';
import * as AnyOpsOSLibUser from '@anyopsos/lib-user';
import * as AnyOpsOSLibUtils from '@anyopsos/lib-utils';
import * as AnyOpsOSLibVMWare from '@anyopsos/lib-node-vmware';
import * as AnyOpsOSLibNodeLinux from '@anyopsos/lib-node-linux';
import * as AnyOpsOSLibNodeDocker from '@anyopsos/lib-node-docker';
import * as AnyOpsOSLibNodeSnmp from '@anyopsos/lib-node-snmp';
import * as AnyOpsOSLibNode from '@anyopsos/lib-node';

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

    SystemJS.set('rxjs', SystemJS.newModule(rxjs));
    SystemJS.set('rxjs/operators', SystemJS.newModule(rxjsOperators));

    SystemJS.set('ngx-socket-io', SystemJS.newModule(ngxSocketIo));
    SystemJS.set('uuid', SystemJS.newModule(uuid));
    SystemJS.set('js-yaml', SystemJS.newModule(jsYaml));

    // System
    SystemJS.set('@anyopsos/lib-angular-material', SystemJS.newModule(AnyOpsOSLibAngularMaterial));
    SystemJS.set('@anyopsos/lib-logger', SystemJS.newModule(AnyOpsOSLibLogger));
    SystemJS.set('@anyopsos/lib-application', SystemJS.newModule(AnyOpsOSLibApplication));
    SystemJS.set('@anyopsos/lib-modal', SystemJS.newModule(AnyOpsOSLibModal));
    SystemJS.set('@anyopsos/lib-service-injector', SystemJS.newModule(AnyOpsOSLibServiceInjector));
    SystemJS.set('@anyopsos/lib-user', SystemJS.newModule(AnyOpsOSLibUser));
    SystemJS.set('@anyopsos/lib-credential', SystemJS.newModule(AnyOpsOSLibCredential));

    // Folder & File
    SystemJS.set('@anyopsos/lib-folder', SystemJS.newModule(AnyOpsOSLibFolder));
    SystemJS.set('@anyopsos/lib-folder-explorer', SystemJS.newModule(AnyOpsOSLibFolderExplorer));
    SystemJS.set('@anyopsos/lib-file', SystemJS.newModule(AnyOpsOSLibFile));
    SystemJS.set('@anyopsos/lib-file-system', SystemJS.newModule(AnyOpsOSLibFileSystem));
    SystemJS.set('@anyopsos/lib-file-system-ui', SystemJS.newModule(AnyOpsOSLibFileSystemUi));
    SystemJS.set('@anyopsos/lib-selectable', SystemJS.newModule(AnyOpsOSLibSelectable));

    // Utils
    SystemJS.set('@anyopsos/lib-diagram', SystemJS.newModule(AnyOpsOSLibDiagram));
    SystemJS.set('@anyopsos/lib-pipes', SystemJS.newModule(AnyOpsOSLibPipes));
    SystemJS.set('@anyopsos/lib-scroll-spy', SystemJS.newModule(AnyOpsOSLibScrollSpy));
    SystemJS.set('@anyopsos/lib-terminal', SystemJS.newModule(AnyOpsOSLibTerminal));
    SystemJS.set('@anyopsos/lib-utils', SystemJS.newModule(AnyOpsOSLibUtils));

    // Others
    SystemJS.set('@anyopsos/lib-types', SystemJS.newModule(AnyOpsOSLibTypes));

    // Nodes
    SystemJS.set('@anyopsos/lib-ssh', SystemJS.newModule(AnyOpsOSLibSsh));
    SystemJS.set('@anyopsos/lib-node', SystemJS.newModule(AnyOpsOSLibNode));
    SystemJS.set('@anyopsos/lib-node-linux', SystemJS.newModule(AnyOpsOSLibNodeLinux));
    SystemJS.set('@anyopsos/lib-node-kubernetes', SystemJS.newModule(AnyOpsOSLibNodeKubernetes));
    SystemJS.set('@anyopsos/lib-node-docker', SystemJS.newModule(AnyOpsOSLibNodeDocker));
    SystemJS.set('@anyopsos/lib-node-vmware', SystemJS.newModule(AnyOpsOSLibVMWare));
    SystemJS.set('@anyopsos/lib-node-netapp', SystemJS.newModule(AnyOpsOSLibNetApp));
    SystemJS.set('@anyopsos/lib-node-snmp', SystemJS.newModule(AnyOpsOSLibNodeSnmp));


    SystemJS.set('ngx-monaco-editor', SystemJS.newModule(NgxMonacoEditor));
  }
}
