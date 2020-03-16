import {copy, move, unlink, pathExistsSync, readdir, ensureDir, outputJson, outputFile, stat, truncate} from 'fs-extra';
import {read as readLines} from 'read-last-lines';
import {blue, red, blueBright} from 'chalk';
import * as yargs from 'yargs';
import rimraf from 'rimraf';
import awaitSpawn from 'await-spawn';
import editJsonFile from 'edit-json-file';
import replaceInFile from 'replace-in-file';

import {BuildLibs} from './scripts/build-libs';
import {BuildExtLibs} from './scripts/build-ext-libs';
import {BuildApps} from './scripts/build-apps';
import {BuildModals} from './scripts/build-modals';

process.on('unhandledRejection', (reason) => {
  throw reason;
});
process.on('uncaughtException', error => {
  if (error) {
    console.error('Uncaught Exception: ', error.toString());
    if (error.stack) {
      console.error(error.stack);
    }
  }
});

((): void => {
  const mainPathCwd = `${process.cwd()}`;

  let packageType;
  let packageLongType;
  let packagePrefix;
  let projectPath;

  const yarnInstall = async (argv) => {
    console.log(blueBright(`[anyOpsOS Cli. Internals] Running 'yarn install' on workspace @anyopsos/${packageType}-${argv.name}\n`));

    await awaitSpawn('yarn.cmd', ['workspace', `@anyopsos/${packageType}-${argv.name}`, 'install'], {
      cwd: mainPathCwd,
      stdio: 'inherit'
    });
  };

  /**
   * Set 'global' vars for other functions
   */
  const setVars = (argv): void => {
    packageType = argv.type === 'library' ? 'lib' :
      argv.type === 'external-library' ? 'ext-lib' :
        argv.type === 'application' ? 'app' :
          argv.type === 'modal' ? 'modal' :
            argv.type === 'api' ? 'api' :
              argv.type === 'module' ? 'module' :
                argv.type === 'websocket' ? 'websocket' :
                  argv.type;
    packageLongType = argv.type === 'library' ? 'libraries' :
      argv.type === 'external-library' ? 'external-libraries' :
        argv.type === 'application' ? 'applications' :
          argv.type === 'modal' ? 'modals' :
            argv.type === 'api' ? 'apis' :
              argv.type === 'api-middleware' ? 'api-middlewares' :
                argv.type === 'module' ? 'modules' :
                  argv.type === 'websocket' ? 'websockets' :
                    argv.type;
    packagePrefix = argv.type === 'library' ? 'al' :
      argv.type === 'external-library' ? 'ael' :
        argv.type === 'application' ? 'aa' :
          argv.type === 'modal' ? 'am' :
            argv.type;
    projectPath = `${process.cwd()}/projects/${packageLongType}/${argv.name ? argv.name : argv.moduleName}`;

    if (!argv.prefix) argv.prefix = argv.name;
  };

  /**
   * NEW COMMAND
   */

  /**
   * Creates main angular module (library)
   */
  const createLibrary = async (argv): Promise<void> => {
    console.log(blue(`[anyOpsOS Cli.] Generating module ${argv.name} of type ${packageType}`));
    console.log(red(`[anyOpsOS Cli.] Do not cancel this command...\n`));

    if (packageType === 'api' || packageType === 'module' || packageType === 'websocket') {

      await ensureDir(`${projectPath}/src`);
      await outputJson(`${projectPath}/tsconfig.json`, {
        extends: '../../../tsconfig.backend.json',
        compilerOptions: {
          outDir: `../../../dist/${packageLongType}/${argv.name}`,
          baseUrl: '.',
          paths: {
            '*': [
              'node_modules/*',
              'src/types/*'
            ]
          }
        },
        include: [
          'src/**/*'
        ]
      }, {spaces: 2});

    } else {

      // Frontend module type
      await awaitSpawn('ng.cmd', ['generate', 'library', `any-ops-o-s-${packageType}-${argv.name}`, '--prefix', `${packagePrefix}${argv.prefix}`, '--entry-file', 'public-api'], {
        cwd: mainPathCwd,
        stdio: 'inherit'
      });
    }

  };

  /**
   * Renames and moves the created project to its final location
   */
  const moveLibraryToFinalLocation = async (argv): Promise<void> => {
    console.log(blueBright(`[anyOpsOS Cli. Internals] Moving module ${argv.name} to its final location\n`));

    await move(
      `${process.cwd()}/projects/any-ops-o-s-${packageType}-${argv.name}`,
      `${projectPath}`
    );
  };

  /**
   * Sets correct parameters/paths on files like (tsconfig, tslint, package, ng-package, angular).json
   */
  const standarizeLibraryFiles = async (argv): Promise<void> => {
    console.log(blueBright(`[anyOpsOS Cli. Internals] Editing project files to include module ${argv.name}.\n`));

    const packageFile = editJsonFile(`${projectPath}/package.json`);
    const ngPackageFile = editJsonFile(`${projectPath}/ng-package.json`);
    const tsConfigLibFile = editJsonFile(`${projectPath}/tsconfig.lib.json`);
    const tsConfigSpecFile = editJsonFile(`${projectPath}/tsconfig.spec.json`);
    const tsLintFile = editJsonFile(`${projectPath}/tslint.json`);
    const modulesTsConfigFile = editJsonFile(`${process.cwd()}/projects/tsconfig.json`);
    const mainTsConfigFile = editJsonFile(`${process.cwd()}/tsconfig.json`);
    const mainAngularFile = editJsonFile(`${process.cwd()}/angular.json`);

    packageFile.set('name', `@anyopsos/${packageType}-${argv.name}`);
    packageFile.set('homepage', 'https://github.com/anyOpsOS/anyOpsOS#readme');
    packageFile.set('repository.type', 'git');
    packageFile.set('repository.url', 'https://github.com/anyOpsOS/anyOpsOS.git');
    packageFile.set('bugs', 'https://github.com/anyOpsOS/anyOpsOS/issues');
    packageFile.set('keywords', []);
    packageFile.set('description', `anyOpsOS ${argv.name} ${argv.type}`);
    packageFile.set('author', 'Isart Navarro <contact@isartnavarro.io> (https://isartnavarro.io)');
    packageFile.set('license', 'GPL-3.0-or-later');
    packageFile.set('private', false);
    await packageFile.save();

    ngPackageFile.set('dest', `../../../dist/${packageLongType}/${argv.name}`);
    ngPackageFile.set('$schema', '../../../node_modules/ng-packagr/ng-package.schema.json');
    await ngPackageFile.save();

    tsConfigLibFile.set('extends', '../../tsconfig.json');
    tsConfigLibFile.set('compilerOptions.outDir', '../../../out-tsc/lib');
    await tsConfigLibFile.save();

    tsConfigSpecFile.set('extends', '../../../tsconfig.json');
    tsConfigSpecFile.set('compilerOptions.outDir', '../../../out-tsc/spec');
    await tsConfigSpecFile.save();

    tsLintFile.set('extends', '../../../tslint.json');
    await tsLintFile.save();

    modulesTsConfigFile.set(`compilerOptions.paths.@anyopsos/${packageType}-${argv.name}`, [`dist/${packageLongType}/${argv.name}`]);
    modulesTsConfigFile.set(`compilerOptions.paths.@anyopsos/${packageType}-${argv.name}/*`, [`dist/${packageLongType}/${argv.name}/*`]);
    await modulesTsConfigFile.save();

    mainTsConfigFile.unset(`compilerOptions.paths.any-ops-o-s-${packageType}-${argv.name}`);
    mainTsConfigFile.unset(`compilerOptions.paths.any-ops-o-s-${packageType}-${argv.name}/*`);
    mainTsConfigFile.set(`compilerOptions.paths.@anyopsos/${packageType}-${argv.name}`, [`projects/${packageLongType}/${argv.name}/src/public-api`]);
    mainTsConfigFile.set(`compilerOptions.paths.@anyopsos/${packageType}-${argv.name}/*`, [`projects/${packageLongType}/${argv.name}/*`]);
    await mainTsConfigFile.save();

    let currentAngularProject = mainAngularFile.get(`projects.any-ops-o-s-${packageType}-${argv.name}`);
    currentAngularProject = JSON.parse(JSON.stringify(currentAngularProject).replace(/projects\/any-ops-o-s-(lib|ext-lib|modal|app)-[a-z-]*/gi, `projects/${packageLongType}/${argv.name}`));
    currentAngularProject.schematics = {
      '@schematics/angular:component': {
        style: 'scss'
      }
    };

    mainAngularFile.unset(`projects.any-ops-o-s-${packageType}-${argv.name}`);
    mainAngularFile.set(`projects.anyopsos-${packageType}-${argv.name}`, currentAngularProject);
    await mainAngularFile.save();
  };

  /**
   * Delete unwanted default files created by ng generate
   */
  const deleteDefaultFiles = async (argv): Promise<void> => {
    console.log(blueBright(`[anyOpsOS Cli. Internals] Deleting some angular default generated files.\n`));

    await unlink(`${projectPath}/src/lib/any-ops-o-s-${packageType}-${argv.name}.component.spec.ts`, (e) => { if (e) throw e; });
    await unlink(`${projectPath}/src/lib/any-ops-o-s-${packageType}-${argv.name}.component.ts`, (e) => { if (e) throw e; });
    await unlink(`${projectPath}/src/lib/any-ops-o-s-${packageType}-${argv.name}.service.spec.ts`, (e) => { if (e) throw e; });
    await unlink(`${projectPath}/src/lib/any-ops-o-s-${packageType}-${argv.name}.service.ts`, (e) => { if (e) throw e; });
  };

  /**
   * Sets correct name to library Module file
   */
  const renameLibraryModuleFile = async (argv): Promise<void> => {
    console.log(blueBright(`[anyOpsOS Cli. Internals] Renaming module.\n`));

    await move(
      `${projectPath}/src/lib/any-ops-o-s-${packageType}-${argv.name}.module.ts`,
      `${projectPath}/src/lib/anyopsos-${packageType}-${argv.name}.module.ts`
    );
  };

  const removeUnwantedCodeFromFiles = async (argv): Promise<void> => {
    console.log(blueBright(`[anyOpsOS Cli. Internals] Removing unwanted code from module files.\n`));

    // Remove unwanted exports from public-api
    await replaceInFile({
      files: `${projectPath}/src/public-api.ts`,
      from: [/.*\.(service|component)';*\n/gi, /any-ops-o-s-/gi],
      to: ['', 'anyopsos-'],
    });

    // Remove unwanted imports/exports and declarations from module
    await replaceInFile({
      files: `${projectPath}/src/lib/anyopsos-${packageType}-${argv.name}.module.ts`,
      from: [/.*'\.\/any-ops-o-s-.*\n/gi, /\[[a-zA-Z]*]/gi, /\n\n\n\n/g],
      to: ['', '[]', '\n\n'],
    });
  };

  const copyLicenseFile = async (): Promise<void> => {
    console.log(blue(`[anyOpsOS Cli.] Copying LICENSE file.\n`));

    await copy(`${process.cwd()}/LICENSE`, `${projectPath}/LICENSE`, (e) => { if (e) throw e; });
  };

  const createReadMe = async (argv): Promise<void> => {
    console.log(blue(`[anyOpsOS Cli.] Creating empty README.\n`));

    await outputFile(`${projectPath}/README.md`, `${packageType} ${argv.name}`);
  };

  /**
   * ----------
   */

  /**
   * Create base application type files
   */
  const createBaseApplicationFiles = async (argv): Promise<void> => {
    console.log(blueBright(`[anyOpsOS Cli. Internals] Generating Application base components.\n`));

    await awaitSpawn('ng.cmd', ['generate', 'component', `components/body`, '--project', `anyopsos-${packageType}-${argv.name}`], {
      cwd: mainPathCwd,
      stdio: 'inherit'
    });
    await awaitSpawn('ng.cmd', ['generate', 'component', `components/status`, '--project', `anyopsos-${packageType}-${argv.name}`], {
      cwd: mainPathCwd,
      stdio: 'inherit'
    });
    await awaitSpawn('ng.cmd', ['generate', 'component', `components/actions`, '--project', `anyopsos-${packageType}-${argv.name}`], {
      cwd: mainPathCwd,
      stdio: 'inherit'
    });
    await awaitSpawn('ng.cmd', ['generate', 'component', `components/menu`, '--project', `anyopsos-${packageType}-${argv.name}`], {
      cwd: mainPathCwd,
      stdio: 'inherit'
    });
  };

  /**
   * Create base modal type files
   */
  const createBaseModalFiles = async (argv): Promise<void> => {
    console.log(blueBright(`[anyOpsOS Cli. Internals] Generating Modal base components.\n`));

    await awaitSpawn('ng.cmd', ['generate', 'component', `entry`, '--project', `anyopsos-${packageType}-${argv.name}`], {
      cwd: mainPathCwd,
      stdio: 'inherit'
    });
    await awaitSpawn('ng.cmd', ['generate', 'component', `anyopsos-${packageType}-${argv.name}`, '--flat', '--project', `anyopsos-${packageType}-${argv.name}`], {
      cwd: mainPathCwd,
      stdio: 'inherit'
    });

    // Set package.json dependencies
    const packageFile = editJsonFile(`${projectPath}/package.json`);
    packageFile.set('dependencies', {
      '@anyopsos/lib-angular-material': '~0.0.1',
      '@anyopsos/lib-modal': '~0.0.1'
    });
    await packageFile.save();

    // Whitelist dependencies
    const ngPackageFile = editJsonFile(`${projectPath}/ng-package.json`);
    ngPackageFile.set('whitelistedNonPeerDependencies', [
      '@anyopsos/lib-angular-material',
      '@anyopsos/lib-modal'
    ]);
    await ngPackageFile.save();

    let dynamicModule = argv.name
      .toLowerCase()
      .replace(/-(.)/g, (match, group1) => group1.toUpperCase());

    dynamicModule = `${dynamicModule.charAt(0).toUpperCase()}${dynamicModule.slice(1)}`;

    const fulldynamicComponent = `AnyOpsOSModal${dynamicModule}Component`;
    const fulldynamicModule = `AnyOpsOSModal${dynamicModule}Module`;

    // Rewrite module file
    await outputFile(`${projectPath}/src/lib/anyopsos-modal-${argv.name}.module.ts`, `import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AnyOpsOSLibAngularMaterialModule} from '@anyopsos/lib-angular-material';
import {AnyOpsOSLibModalModule, AnyOpsOSLibModalRegisteredStateService} from '@anyopsos/lib-modal';

import {EntryComponent} from './entry/entry.component';
import {${fulldynamicComponent}} from './anyopsos-modal-${argv.name}.component';

@NgModule({
  declarations: [
    ${fulldynamicComponent},
    EntryComponent
  ],
  imports: [
    CommonModule,
    // Shared module import
    AnyOpsOSLibAngularMaterialModule,
    AnyOpsOSLibModalModule
  ],
  exports: [],
  providers: [],
  entryComponents: [
    ${fulldynamicComponent}
  ]
})
export class ${fulldynamicModule} {

  constructor(private readonly ModalRegisteredState: AnyOpsOSLibModalRegisteredStateService) {

    ModalRegisteredState.putModal({
      uuid: '${argv.name}',
      size: 'sm'
    });

  }

}
`);

    // Delete unwanted entry files
    await unlink(`${projectPath}/src/lib/entry/entry.component.html`);
    await unlink(`${projectPath}/src/lib/entry/entry.component.scss`);

    // Rewrite entry file
    await outputFile(`${projectPath}/src/lib/entry/entry.component.ts`, `import {Component, Input, OnInit, Output} from '@angular/core';

import {MatDialog, MatDialogConfig, MatDialogRef} from '@anyopsos/lib-angular-material';

import {${fulldynamicComponent}} from '../anyopsos-modal-${argv.name}.component';

/**
 * This file is called by @anyopsos/lib-modal and is used to open a Modal.
 * You should NOT edit any of this content.
 */
@Component({
  template: ''
})
export class EntryComponent implements OnInit {
  @Input() private readonly dialogConfig: MatDialogConfig;
  @Output() private dialogRef: MatDialogRef<any>;

  constructor(private readonly dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.dialogRef = this.dialog.open(${fulldynamicComponent}, this.dialogConfig);
  }
}
`);

    // Rewrite modal file
    await outputFile(`${projectPath}/src/lib/anyopsos-modal-${argv.name}.component.ts`, `import {Component, Inject, OnInit, ViewChild} from '@angular/core';

import {MAT_DIALOG_DATA, MatDialogRef} from '@anyopsos/lib-angular-material';
import {BodyComponent, ModalData} from '@anyopsos/lib-modal';

@Component({
  selector: 'am${argv.prefix}-anyopsos-modal-${argv.name}',
  templateUrl: './anyopsos-modal-${argv.name}.component.html',
  styleUrls: ['./anyopsos-modal-${argv.name}.component.scss']
})
export class ${fulldynamicComponent} implements OnInit {
  @ViewChild('modalBody', {static: true}) modalBody: BodyComponent;

  constructor(public readonly dialogRef: MatDialogRef<${fulldynamicComponent}>,
              @Inject(MAT_DIALOG_DATA) public readonly data: ModalData) {
  }

  ngOnInit(): void {

    // Do not delete this
    this.modalBody.dialogRef = this.dialogRef;
    this.modalBody.title = this.data.title;
    this.modalBody.type = this.data.type;
  }

}
`);

    // Rewrite modal html file
    await outputFile(`${projectPath}/src/lib/anyopsos-modal-${argv.name}.component.html`, `<almodal-body #modalBody>

  <!-- Put modal content here -->
  <span>Hello from ${argv.name} Modal!</span>

</almodal-body>

<!-- Put footer buttons here -->
<almodal-buttons>
  <button class="btn" type="button" (click)="dialogRef.close()" mat-flat-button>Close</button>
</almodal-buttons>
`);
  };

  /**
   * Create base library/external-library type files
   */
  const createBaseLibFiles = async (argv): Promise<void> => {
    console.log(blueBright(`[anyOpsOS Cli. Internals] Generating Library base components.\n`));

    await awaitSpawn('ng.cmd', ['generate', 'service', `services/anyopsos-${packageType}-${argv.name}`, '--project', `anyopsos-${packageType}-${argv.name}`], {
      cwd: mainPathCwd,
      stdio: 'inherit'
    });
  };

  /**
   * Create base api type files
   */
  const createBaseApiFiles = async (argv): Promise<void> => {
    console.log(blueBright(`[anyOpsOS Cli. Internals] Generating API base components.\n`));

    let dynamicModule = argv.name
      .toLowerCase()
      .replace(/-(.)/g, (match, group1) => group1.toUpperCase());

    dynamicModule = `${dynamicModule.charAt(0).toUpperCase()}${dynamicModule.slice(1)}`;

    const fulldynamicModule = `AnyOpsOS${dynamicModule}ApiController`;

    await outputJson(`${projectPath}/package.json`, {
      name: `@anyopsos/${packageType}-${argv.name}`,
      version: '0.0.1',
      main: 'src/index.ts',
      dependencies: {
        log4js: '^6.1.0',
      },
      peerDependencies: {
        '@anyopsos/module-api-globals': '~0.0.1'
      },
      devDependencies: {
        '@types/node': '^12.12.21',
        'class-validator': '^0.11.0',
        express: '^4.17.1',
        'routing-controllers': '^0.8.0',
        typescript: '^3.7.4'
      },
      homepage: 'https://github.com/anyOpsOS/anyOpsOS#readme',
      repository: {
        type: 'git',
        url: 'https://github.com/anyOpsOS/anyOpsOS.git'
      },
      bugs: 'https://github.com/anyOpsOS/anyOpsOS/issues',
      keywords: [],
      description: `anyOpsOS api ${argv.name}`,
      author: 'Isart Navarro <contact@isartnavarro.io> (https://isartnavarro.io)',
      license: 'GPL-3.0-or-later',
      private: true
    }, {spaces: 2});
    await outputFile(`${projectPath}/src/index.ts`, `export * from './lib/anyopsos-api-${argv.name}.module';`);
    await outputFile(`${projectPath}/src/lib/anyopsos-api-${argv.name}.module.ts`, `import {Controller, Get, Authorized, Req, Res} from 'routing-controllers';
import {Request, Response} from 'express';
import {getLogger} from 'log4js';

import {AnyOpsOSApiGlobalsModule} from '@anyopsos/module-api-globals';

const logger = getLogger('mainLog');

@Authorized()
@Controller('/api/${argv.name}')
export class ${fulldynamicModule} {

  @Get("/")
  get${dynamicModule}(@Req() request: Request,
                      @Res() response: Response) {
    logger.info(\`[API ${argv.name}] -> Default\`);

    return new AnyOpsOSApiGlobalsModule(request, response).validResponse();
  }

}
`);

  };

  /**
   * Create base module type files
   */
  const createBaseModuleFiles = async (argv): Promise<void> => {
    console.log(blueBright(`[anyOpsOS Cli. Internals] Generating Module base components.\n`));

    let dynamicModule = argv.name
      .toLowerCase()
      .replace(/-(.)/g, (match, group1) => group1.toUpperCase());

    dynamicModule = `AnyOpsOS${dynamicModule.charAt(0).toUpperCase()}${dynamicModule.slice(1)}Module`;

    await outputJson(`${projectPath}/package.json`, {
      name: `@anyopsos/${packageType}-${argv.name}`,
      version: '0.0.1',
      main: 'src/index.ts',
      devDependencies: {
        '@types/node': '^12.12.21',
        typescript: '^3.7.4'
      },
      homepage: 'https://github.com/anyOpsOS/anyOpsOS#readme',
      repository: {
        type: 'git',
        url: 'https://github.com/anyOpsOS/anyOpsOS.git'
      },
      bugs: 'https://github.com/anyOpsOS/anyOpsOS/issues',
      keywords: [],
      description: `anyOpsOS module ${argv.name}`,
      author: 'Isart Navarro <contact@isartnavarro.io> (https://isartnavarro.io)',
      license: 'GPL-3.0-or-later',
      private: true
    }, {spaces: 2});
    await outputFile(`${projectPath}/src/index.ts`, `export * from './lib/anyopsos-module-${argv.name}.module';`);
    await outputFile(`${projectPath}/src/lib/anyopsos-module-${argv.name}.module.ts`, `export class ${dynamicModule} {

  constructor() {
  }

}
`);

  };

  /**
   * Create base api type files
   */
  const createBaseWebsocketFiles = async (argv): Promise<void> => {
    console.log(blueBright(`[anyOpsOS Cli. Internals] Generating WebSocket base components.\n`));

    let dynamicModule = argv.name
      .toLowerCase()
      .replace(/-(.)/g, (match, group1) => group1.toUpperCase());

    dynamicModule = `${dynamicModule.charAt(0).toUpperCase()}${dynamicModule.slice(1)}`;

    const fulldynamicModule = `AnyOpsOS${dynamicModule}WebsocketController`;

    await outputJson(`${projectPath}/package.json`, {
      name: `@anyopsos/${packageType}-${argv.name}`,
      version: '0.0.1',
      main: 'src/index.ts',
      dependencies: {
        log4js: '^6.1.0',
      },
      peerDependencies: {
      },
      devDependencies: {
        '@types/node': '^12.12.21',
        'socket.io': '^2.3.0',
        'socket-controllers': '^0.0.5',
        typescript: '^3.7.4'
      },
      homepage: 'https://github.com/anyOpsOS/anyOpsOS#readme',
      repository: {
        type: 'git',
        url: 'https://github.com/anyOpsOS/anyOpsOS.git'
      },
      bugs: 'https://github.com/anyOpsOS/anyOpsOS/issues',
      keywords: [],
      description: `anyOpsOS websocket ${argv.name}`,
      author: 'Isart Navarro <contact@isartnavarro.io> (https://isartnavarro.io)',
      license: 'GPL-3.0-or-later',
      private: true
    }, {spaces: 2});
    await outputFile(`${projectPath}/src/index.ts`, `export * from './lib/anyopsos-websocket-${argv.name}.module';`);
    await outputFile(`${projectPath}/src/lib/anyopsos-websocket-${argv.name}.module.ts`, `import {SocketController, ConnectedSocket, SocketId, MessageBody, OnMessage} from 'socket-controllers';
import {getLogger} from 'log4js';
import {Socket} from 'socket.io';

const logger = getLogger('mainLog');

@SocketController()
export class ${fulldynamicModule} {

  @OnMessage("new_message")
  newMessageReceived(@ConnectedSocket() socket: Socket,
                     @SocketId() id: string,
                     @MessageBody() message: any) {
    logger.info(\`[Websocket ${argv.name}] -> new message -> id [\${id}]\`);

    socket.emit('message_received', message);
  }

}
`);

  };

  /**
   * BUILD COMMAND
   */

  // TODO: provably we can do this modifying the angular.json file
  const removeSourceMaps = async (filename: string): Promise<void> => {
    console.log(blueBright(`[anyOpsOS Cli. Internals] Removing sourcemap line from bundle.`));

    const lines2nuke = 1;

    return new Promise((resolve, reject) => {
      readLines(filename, lines2nuke).then((lines) => {
        const toVanquish = lines.length;
        stat(filename, (err, stats) => {
          if (err) return reject(err);
          truncate(filename, stats.size - toVanquish, (e: Error) => {
            if (e) return reject(err);

            return resolve();
          });
        });
      });
    });
  };

  const buildModules = async (argv): Promise<void> => {

    if (argv.moduleName) {

      console.log(blue(`[anyOpsOS Cli.] Building module ${argv.moduleName}.\n`));
      await awaitSpawn('tsc.cmd', ['--build', `${projectPath}/tsconfig.json`], {
        cwd: `${process.cwd()}`,
        stdio: 'inherit'
      });

      // Copy to filesystem
      console.log(blueBright(`[anyOpsOS Cli. Internals] Copying module ${argv.moduleName} to anyOpsOS filesystem.\n`));
      await copy(
        `${process.cwd()}/dist/modules/${argv.moduleName}/`,
        `${process.cwd()}/dist/anyOpsOS/fileSystem/filesystem/bin/modules/module-${argv.moduleName}`
      );

    } else {

      const projectsFiles = await readdir(`${process.cwd()}/projects/modules/`);

      for (const directory of projectsFiles) {
        console.log(blue(`[anyOpsOS Cli.] Building module ${directory}.\n`));
        await awaitSpawn('tsc.cmd', ['--build', `${process.cwd()}/projects/modules/${directory}/tsconfig.json`], {
          cwd: `${process.cwd()}`,
          stdio: 'inherit'
        });
      }

      // Copy to filesystem
      const directoryFiles = await readdir(`${process.cwd()}/dist/modules/`);
      await directoryFiles.map(async (directory: string): Promise<void> => {

        console.log(blueBright(`[anyOpsOS Cli. Internals] Copying module ${directory} to anyOpsOS filesystem.`));
        await copy(
          `${process.cwd()}/dist/modules/${directory}/`,
          `${process.cwd()}/dist/anyOpsOS/fileSystem/filesystem/bin/modules/module-${directory}`
        );
      });

      console.log('\n');

    }

  };

  const buildApiMiddlewares = async (argv): Promise<void> => {

    if (argv.moduleName) {

      console.log(blue(`[anyOpsOS Cli.] Building API Middleware ${argv.moduleName}.\n`));
      await awaitSpawn('tsc.cmd', ['--build', `${projectPath}/tsconfig.json`], {
        cwd: `${process.cwd()}`,
        stdio: 'inherit'
      });

      // Copy to filesystem
      console.log(blueBright(`[anyOpsOS Cli. Internals] Copying API Middleware ${argv.moduleName} to anyOpsOS filesystem.\n`));
      await copy(
        `${process.cwd()}/dist/api-middlewares/${argv.moduleName}/`,
        `${process.cwd()}/dist/anyOpsOS/fileSystem/filesystem/bin/modules/api-middleware-${argv.moduleName}`
      );

    } else {

      const projectsFiles = await readdir(`${process.cwd()}/projects/api-middlewares/`);

      for (const directory of projectsFiles) {
        console.log(blue(`[anyOpsOS Cli.] Building API Middleware ${directory}.\n`));
        await awaitSpawn('tsc.cmd', ['--build', `${process.cwd()}/projects/api-middlewares/${directory}/tsconfig.json`], {
          cwd: `${process.cwd()}`,
          stdio: 'inherit'
        });
      }

      // Copy to filesystem
      const directoryFiles = await readdir(`${process.cwd()}/dist/api-middlewares/`);
      await directoryFiles.map(async (directory: string): Promise<void> => {

        console.log(blueBright(`[anyOpsOS Cli. Internals] Copying API Middleware ${directory} to anyOpsOS filesystem.`));
        await copy(
          `${process.cwd()}/dist/api-middlewares/${directory}/`,
          `${process.cwd()}/dist/anyOpsOS/fileSystem/filesystem/bin/modules/api-middleware-${directory}`
        );
      });

      console.log('\n');

    }

  };

  const buildApis = async (argv): Promise<void> => {

    if (argv.moduleName) {

      console.log(blue(`[anyOpsOS Cli.] Building API ${argv.moduleName}.\n`));
      await awaitSpawn('tsc.cmd', ['--build', `${projectPath}/tsconfig.json`], {
        cwd: `${process.cwd()}`,
        stdio: 'inherit'
      });

      // Copy to filesystem
      console.log(blueBright(`[anyOpsOS Cli. Internals] Copying API ${argv.moduleName} to anyOpsOS filesystem.\n`));
      await copy(
        `${process.cwd()}/dist/apis/${argv.moduleName}/`,
        `${process.cwd()}/dist/anyOpsOS/fileSystem/filesystem/bin/apis/${argv.moduleName}`
      );

    } else {

      const projectsFiles = await readdir(`${process.cwd()}/projects/apis/`);

      for (const directory of projectsFiles) {
        // TODO hardcoded end to not check swagger file. Test if its a directory with fs.stat
        if (directory === 'swagger.json') continue;

        console.log(blue(`[anyOpsOS Cli.] Building API ${directory}.\n`));
        await awaitSpawn('tsc.cmd', ['--build', `${process.cwd()}/projects/apis/${directory}/tsconfig.json`], {
          cwd: `${process.cwd()}`,
          stdio: 'inherit'
        });
      }

      // Copy to filesystem
      console.log(blueBright(`[anyOpsOS Cli. Internals] Copying APIs to anyOpsOS filesystem.\n`));
      await copy(
        `${process.cwd()}/dist/apis/`,
        `${process.cwd()}/dist/anyOpsOS/fileSystem/filesystem/bin/apis/`
      );
    }

    // Generate APIS swagger.json
    await require('./swagger-generator');

  };

  const buildWebsockets = async (argv): Promise<void> => {

    if (argv.moduleName) {

      console.log(blue(`[anyOpsOS Cli.] Building WebSocket ${argv.moduleName}.\n`));
      await awaitSpawn('tsc.cmd', ['--build', `${projectPath}/tsconfig.json`], {
        cwd: `${process.cwd()}`,
        stdio: 'inherit'
      });

      // Copy to filesystem
      console.log(blueBright(`[anyOpsOS Cli. Internals] Copying WebSocket ${argv.moduleName} to anyOpsOS filesystem.\n`));
      await copy(
        `${process.cwd()}/dist/websockets/${argv.moduleName}/`,
        `${process.cwd()}/dist/anyOpsOS/fileSystem/filesystem/bin/websockets/${argv.moduleName}`
      );

    } else {

      const projectsFiles = await readdir(`${process.cwd()}/projects/websockets/`);

      for (const directory of projectsFiles) {
        console.log(blue(`[anyOpsOS Cli.] Building WebSocket ${directory}.\n`));
        await awaitSpawn('tsc.cmd', ['--build', `${process.cwd()}/projects/websockets/${directory}/tsconfig.json`], {
          cwd: `${process.cwd()}`,
          stdio: 'inherit'
        });
      }

      // Copy to filesystem
      console.log(blueBright(`[anyOpsOS Cli. Internals] Copying WebSockets to anyOpsOS filesystem.\n`));
      await copy(
        `${process.cwd()}/dist/websockets/`,
        `${process.cwd()}/dist/anyOpsOS/fileSystem/filesystem/bin/websockets/`
      );
    }

  };

  const buildBackend = async (): Promise<void> => {

    console.log(blue(`[anyOpsOS Cli.] Building anyOpsOS Backend fileSystem.\n`));
    await awaitSpawn('tsc.cmd', ['--build', 'src/backend-fileSystem/tsconfig.json'], {
      cwd: `${process.cwd()}`,
      stdio: 'inherit'
    });

    console.log(blue(`[anyOpsOS Cli.] Building anyOpsOS Backend Auth.\n`));
    await awaitSpawn('tsc.cmd', ['--build', 'src/backend-auth/tsconfig.json'], {
      cwd: `${process.cwd()}`,
      stdio: 'inherit'
    });

    console.log(blue(`[anyOpsOS Cli.] Building anyOpsOS Backend Core.\n`));
    await awaitSpawn('tsc.cmd', ['--build', 'src/backend-core/tsconfig.json'], {
      cwd: `${process.cwd()}`,
      stdio: 'inherit'
    });
  };

  const buildFrontend = async (): Promise<void> => {

    console.log(blue(`[anyOpsOS Cli.] Building anyOpsOS Frontend.\n`));
    await awaitSpawn('ng.cmd', ['build'], {
      cwd: mainPathCwd,
      stdio: 'inherit'
    });
  };

  const buildLibrary = async (argv): Promise<void> => {

    if (argv.moduleName) {

      console.log(blue(`[anyOpsOS Cli.] Building anyOpsOS Library ${argv.moduleName}.\n`));
      await awaitSpawn('ng.cmd', ['build', `anyopsos-lib-${argv.moduleName}`], {
        cwd: mainPathCwd,
        stdio: 'inherit'
      });
    } else {

      console.log(blue(`[anyOpsOS Cli.] Building anyOpsOS Libraries.\n`));
      await new BuildLibs().build();
    }

  };

  const moveExternalLibraryAsDep = async (): Promise<void> => {

    // Move Netdata to Deps
    console.log(blueBright(`[anyOpsOS Cli. Internals] Moving fileSystem dependencies.\n`));
    if (pathExistsSync(`${process.cwd()}/dist/anyOpsOS/fileSystem/filesystem/bin/libs/anyopsos-ext-lib-netdata.umd.js`)) {
      await move(
        `${process.cwd()}/dist/anyOpsOS/fileSystem/filesystem/bin/libs/anyopsos-ext-lib-netdata.umd.js`,
        `${process.cwd()}/dist/anyOpsOS/fileSystem/filesystem/bin/libs/deps/anyopsos-ext-lib-netdata.umd.js`,
        {
          overwrite: true
        }
      );
    }

  };

  const buildExternalLibrary = async (argv): Promise<void> => {

    if (argv.moduleName) {

      // Build
      console.log(blue(`[anyOpsOS Cli.] Building anyOpsOS External Library ${argv.moduleName}.\n`));
      await awaitSpawn('ng.cmd', ['build', `anyopsos-ext-lib-${argv.moduleName}`], {
        cwd: mainPathCwd,
        stdio: 'inherit'
      });

      await removeSourceMaps(`${process.cwd()}/dist/external-libraries/${argv.moduleName}/bundles/anyopsos-ext-lib-${argv.moduleName}.umd.js`);

      // Run postbuild script if exists
      if (pathExistsSync(`${projectPath}/scripts/postbuild.js`)) {

        console.log(blue(`[anyOpsOS Cli.] Running anyOpsOS External Library ${argv.moduleName} postbuild script.\n`));
        await require(`${projectPath}/scripts/postbuild.js`);
      }

      // Copy to filesystem
      console.log(blueBright(`[anyOpsOS Cli. Internals] Copying External Library ${argv.moduleName} to anyOpsOS filesystem.\n`));
      await copy(
        `${process.cwd()}/dist/external-libraries/${argv.moduleName}/bundles/anyopsos-ext-lib-${argv.moduleName}.umd.js`,
        `${process.cwd()}/dist/anyOpsOS/fileSystem/filesystem/bin/libs/anyopsos-ext-lib-${argv.moduleName}.umd.js`
      );
    } else {

      // Build
      console.log(blue(`[anyOpsOS Cli.] Building anyOpsOS External Libraries.\n`));
      await new BuildExtLibs().build();

      // Run postbuild script if exists
      const projectsFiles = await readdir(`${process.cwd()}/projects/external-libraries/`);
      await Promise.all(projectsFiles.map(async (directory: string): Promise<void> => {

        if (pathExistsSync(`${process.cwd()}/projects/external-libraries/${directory}/scripts/postbuild.js`)) {

          console.log(blue(`[anyOpsOS Cli.] Running anyOpsOS External Library ${directory} postbuild script.\n`));
          await require(`${process.cwd()}/projects/external-libraries/${directory}/scripts/postbuild.js`);
        }

      }));

      // Copy to filesystem
      const directoryFiles = await readdir(`${process.cwd()}/dist/external-libraries/`);
      await Promise.all(directoryFiles.map(async (directory: string): Promise<void> => {

        await removeSourceMaps(`${process.cwd()}/dist/external-libraries/${directory}/bundles/anyopsos-ext-lib-${directory}.umd.js`);

        console.log(blueBright(`[anyOpsOS Cli. Internals] Copying External Library ${directory} to anyOpsOS filesystem.`));
        await copy(
          `${process.cwd()}/dist/external-libraries/${directory}/bundles/anyopsos-ext-lib-${directory}.umd.js`,
          `${process.cwd()}/dist/anyOpsOS/fileSystem/filesystem/bin/libs/anyopsos-ext-lib-${directory}.umd.js`
        );
      }));

      console.log('\n');
    }

    await moveExternalLibraryAsDep();

  };

  const buildApplication = async (argv): Promise<void> => {

    if (argv.moduleName) {

      // Build
      console.log(blue(`[anyOpsOS Cli.] Building anyOpsOS Application ${argv.moduleName}.\n`));
      await awaitSpawn('ng.cmd', ['build', `anyopsos-app-${argv.moduleName}`], {
        cwd: mainPathCwd,
        stdio: 'inherit'
      });

      await removeSourceMaps(`${process.cwd()}/dist/applications/${argv.moduleName}/bundles/anyopsos-app-${argv.moduleName}.umd.js`);

      // Run postbuild script if exists
      if (pathExistsSync(`${projectPath}/scripts/postbuild.js`)) {

        console.log(blue(`[anyOpsOS Cli.] Running anyOpsOS Application ${argv.moduleName} postbuild script.\n`));
        await require(`${projectPath}/scripts/postbuild.js`);
      }

      // Copy to filesystem
      console.log(blueBright(`[anyOpsOS Cli. Internals] Copying Application ${argv.moduleName} to anyOpsOS filesystem.\n`));
      await copy(
        `${process.cwd()}/dist/applications/${argv.moduleName}/bundles/anyopsos-app-${argv.moduleName}.umd.js`,
        `${process.cwd()}/dist/anyOpsOS/fileSystem/filesystem/bin/applications/anyopsos-app-${argv.moduleName}.umd.js`
      );
    } else {

      // Build
      console.log(blue(`[anyOpsOS Cli.] Building anyOpsOS Applications.\n`));
      await new BuildApps().build();

      // Run postbuild script if exists
      const projectsFiles = await readdir(`${process.cwd()}/projects/applications/`);
      await projectsFiles.map(async (directory: string): Promise<void> => {

        if (pathExistsSync(`${process.cwd()}/projects/applications/${directory}/scripts/postbuild.js`)) {

          console.log(blue(`[anyOpsOS Cli.] Running anyOpsOS Application ${directory} postbuild script.\n`));
          await require(`${process.cwd()}/projects/applications/${directory}/scripts/postbuild.js`);
        }

      });

      // Copy to filesystem
      const directoryFiles = await readdir(`${process.cwd()}/dist/applications/`);
      await directoryFiles.map(async (directory: string): Promise<void> => {

        await removeSourceMaps(`${process.cwd()}/dist/applications/${directory}/bundles/anyopsos-app-${directory}.umd.js`);

        console.log(blueBright(`[anyOpsOS Cli. Internals] Copying Application ${directory} to anyOpsOS filesystem.`));
        await copy(
          `${process.cwd()}/dist/applications/${directory}/bundles/anyopsos-app-${directory}.umd.js`,
          `${process.cwd()}/dist/anyOpsOS/fileSystem/filesystem/bin/applications/anyopsos-app-${directory}.umd.js`
        );
      });

      console.log('\n');
    }

  };

  const buildModal = async (argv): Promise<void> => {

    if (argv.moduleName) {

      // Build
      console.log(blue(`[anyOpsOS Cli.] Building anyOpsOS Modal ${argv.moduleName}.\n`));
      await awaitSpawn('ng.cmd', ['build', `anyopsos-modal-${argv.moduleName}`], {
        cwd: mainPathCwd,
        stdio: 'inherit'
      });

      await removeSourceMaps(`${process.cwd()}/dist/modals/${argv.moduleName}/bundles/anyopsos-modal-${argv.moduleName}.umd.js`);

      // Run postbuild script if exists
      if (pathExistsSync(`${projectPath}/scripts/postbuild.js`)) {

        console.log(blue(`[anyOpsOS Cli.] Running anyOpsOS Modal ${argv.moduleName} postbuild script.\n`));
        await require(`${projectPath}/scripts/postbuild.js`);
      }

      // Copy to filesystem
      console.log(blueBright(`[anyOpsOS Cli. Internals] Copying Modal ${argv.moduleName} to anyOpsOS filesystem.\n`));
      await copy(
        `${process.cwd()}/dist/modals/${argv.moduleName}/bundles/anyopsos-modal-${argv.moduleName}.umd.js`,
        `${process.cwd()}/dist/anyOpsOS/fileSystem/filesystem/bin/modals/anyopsos-modal-${argv.moduleName}.umd.js`
      );
    } else {

      // Build
      console.log(blue(`[anyOpsOS Cli.] Building anyOpsOS Modals.\n`));
      await new BuildModals().build();

      // Run postbuild script if exists
      const projectsFiles = await readdir(`${process.cwd()}/projects/modals/`);
      await projectsFiles.map(async (directory: string): Promise<void> => {

        if (pathExistsSync(`${process.cwd()}/projects/modals/${directory}/scripts/postbuild.js`)) {

          console.log(blue(`[anyOpsOS Cli.] Running anyOpsOS Modal ${directory} postbuild script.\n`));
          await require(`${process.cwd()}/projects/modals/${directory}/scripts/postbuild.js`);
        }

      });

      // Copy to filesystem
      const directoryFiles = await readdir(`${process.cwd()}/dist/modals/`);
      await directoryFiles.map(async (directory: string): Promise<void> => {

        await removeSourceMaps(`${process.cwd()}/dist/modals/${directory}/bundles/anyopsos-modal-${directory}.umd.js`);

        console.log(blueBright(`[anyOpsOS Cli. Internals] Copying Modal ${directory} to anyOpsOS filesystem.`));
        await copy(
          `${process.cwd()}/dist/modals/${directory}/bundles/anyopsos-modal-${directory}.umd.js`,
          `${process.cwd()}/dist/anyOpsOS/fileSystem/filesystem/bin/modals/anyopsos-modal-${directory}.umd.js`
        );
      });

      console.log('\n');
    }

  };

  const buildAll = async (argv): Promise<void> => {

    console.log(red(`[anyOpsOS Cli.] Erasing destination folder.\n`));

    // TODO delete this with glob (all but 'cli' folder)
    await rimraf(`${process.cwd()}/dist/anyOpsOS`, (e) => { if (e) throw e; });
    await rimraf(`${process.cwd()}/dist/api-middlewares`, (e) => { if (e) throw e; });
    await rimraf(`${process.cwd()}/dist/apis`, (e) => { if (e) throw e; });
    await rimraf(`${process.cwd()}/dist/applications`, (e) => { if (e) throw e; });
    await rimraf(`${process.cwd()}/dist/external-libraries`, (e) => { if (e) throw e; });
    await rimraf(`${process.cwd()}/dist/libraries`, (e) => { if (e) throw e; });
    await rimraf(`${process.cwd()}/dist/modals`, (e) => { if (e) throw e; });
    await rimraf(`${process.cwd()}/dist/modules`, (e) => { if (e) throw e; });
    await rimraf(`${process.cwd()}/dist/websockets`, (e) => { if (e) throw e; });

    await buildModules(argv);
    await buildApiMiddlewares(argv);
    await buildApis(argv);
    await buildWebsockets(argv);

    await buildBackend();

    console.log(blueBright(`[anyOpsOS Cli. Internals] Generating default anyOpsOS fileSystem.\n`));
    await copy(`${process.cwd()}/src/backend-fileSystem/app/filesystem`, `${process.cwd()}/dist/anyOpsOS/fileSystem/filesystem`);

    await buildLibrary(argv);
    await buildFrontend();
    await buildExternalLibrary(argv);
    await buildApplication(argv);
    await buildModal(argv);
  };

  const lintAll = async (argv): Promise<void> => {

    console.log(red(`[anyOpsOS Cli.] Erasing destination folder.\n`));

    await lintModules(argv);
    await lintApiMiddlewares(argv);
    await lintApis(argv);
    await lintWebsockets(argv);

    await lintBackend();

    await lintLibrary(argv);
    await lintFrontend();
    await lintExternalLibrary(argv);
    await lintApplication(argv);
    await lintModal(argv);
  };

  const lintModules = async (argv): Promise<void> => {
    if (argv.moduleName) {

      console.log(blue(`[anyOpsOS Cli.] Linting Module ${argv.moduleName}.\n`));
      await awaitSpawn('tslint.cmd', ['-p', `${projectPath}/tsconfig.json`], {
        cwd: `${process.cwd()}`,
        stdio: 'inherit'
      });

    } else {

      const projectsFiles = await readdir(`${process.cwd()}/projects/modules/`);

      for (const directory of projectsFiles) {
        console.log(blue(`[anyOpsOS Cli.] Linting Module ${directory}.\n`));
        await awaitSpawn('tslint.cmd', ['-p', `${process.cwd()}/projects/modules/${directory}/tsconfig.json`], {
          cwd: `${process.cwd()}`,
          stdio: 'inherit'
        });
      }

    }
  };
  const lintApiMiddlewares = async (argv): Promise<void> => {
    if (argv.moduleName) {

      console.log(blue(`[anyOpsOS Cli.] Linting API Middleware ${argv.moduleName}.\n`));
      await awaitSpawn('tslint.cmd', ['-p', `${projectPath}/tsconfig.json`], {
        cwd: `${process.cwd()}`,
        stdio: 'inherit'
      });

    } else {

      const projectsFiles = await readdir(`${process.cwd()}/projects/api-middlewares/`);

      for (const directory of projectsFiles) {
        console.log(blue(`[anyOpsOS Cli.] Linting API Middleware ${directory}.\n`));
        await awaitSpawn('tslint.cmd', ['-p', `${process.cwd()}/projects/api-middlewares/${directory}/tsconfig.json`], {
          cwd: `${process.cwd()}`,
          stdio: 'inherit'
        });
      }

    }
  };
  const lintApis = async (argv): Promise<void> => {
    if (argv.moduleName) {

      console.log(blue(`[anyOpsOS Cli.] Linting API ${argv.moduleName}.\n`));
      await awaitSpawn('tslint.cmd', ['-p', `${projectPath}/tsconfig.json`], {
        cwd: `${process.cwd()}`,
        stdio: 'inherit'
      });

    } else {

      const projectsFiles = await readdir(`${process.cwd()}/projects/apis/`);

      for (const directory of projectsFiles) {
        // TODO hardcoded end to not check swagger file. Test if its a directory with fs.stat
        if (directory === 'swagger.json') continue;

        console.log(blue(`[anyOpsOS Cli.] Linting API ${directory}.\n`));
        await awaitSpawn('tslint.cmd', ['-p', `${process.cwd()}/projects/apis/${directory}/tsconfig.json`], {
          cwd: `${process.cwd()}`,
          stdio: 'inherit'
        });
      }

    }
  };
  const lintWebsockets = async (argv): Promise<void> => {
    if (argv.moduleName) {

      console.log(blue(`[anyOpsOS Cli.] Linting WebSocket ${argv.moduleName}.\n`));
      await awaitSpawn('tslint.cmd', ['-p', `${projectPath}/tsconfig.json`], {
        cwd: `${process.cwd()}`,
        stdio: 'inherit'
      });

    } else {

      const projectsFiles = await readdir(`${process.cwd()}/projects/websockets/`);

      for (const directory of projectsFiles) {
        console.log(blue(`[anyOpsOS Cli.] Linting WebSocket ${directory}.\n`));
        await awaitSpawn('tslint.cmd', ['-p', `${process.cwd()}/projects/websockets/${directory}/tsconfig.json`], {
          cwd: `${process.cwd()}`,
          stdio: 'inherit'
        });
      }

    }
  };
  const lintBackend = async (): Promise<void> => {
    await awaitSpawn('tslint.cmd', ['-p', 'src/backend-fileSystem/tsconfig.json'], {
      cwd: `${process.cwd()}`,
      stdio: 'inherit'
    });
    await awaitSpawn('tslint.cmd', ['-p', 'src/backend-auth/tsconfig.json'], {
      cwd: `${process.cwd()}`,
      stdio: 'inherit'
    });
    await awaitSpawn('tslint.cmd', ['-p', 'src/backend-core/tsconfig.json'], {
      cwd: `${process.cwd()}`,
      stdio: 'inherit'
    });
  };
  const lintLibrary = async (argv): Promise<void> => {};
  const lintFrontend = async (): Promise<void> => {
    await awaitSpawn('ng.cmd', ['lint'], {
      cwd: mainPathCwd,
      stdio: 'inherit'
    });
  };
  const lintExternalLibrary = async (argv): Promise<void> => {};
  const lintApplication = async (argv): Promise<void> => {};
  const lintModal = async (argv): Promise<void> => {};

  // tslint:disable-next-line:no-unused-expression
  yargs
    .usage('Usage: $0 <command> [options]')
    .command({
      aliases: 'n',
      command: 'new <type> <name> [prefix]',
      describe: 'creates a new anyOpsOS module of defined type',
      builder: {
        type: {
          alias: 't',
          demand: true,
          describe: 'specify module type',
          hidden: true,
          choices: ['library', 'external-library', 'application', 'modal', 'api', 'module', 'websocket']
        }
      },
      handler: async (argv: & { type: string; name: string; prefix: string; }) => {
        try {
          setVars(argv);

          if (pathExistsSync(projectPath)) return console.log('Module already exists');

          await createLibrary(argv);

          if (packageType === 'app' || packageType === 'modal' || packageType === 'lib' || packageType === 'ext-lib') {
            await moveLibraryToFinalLocation(argv);

            await standarizeLibraryFiles(argv);

            await deleteDefaultFiles(argv);

            await renameLibraryModuleFile(argv);

            await removeUnwantedCodeFromFiles(argv);
          }

          await copyLicenseFile();

          if (packageType === 'app') await createBaseApplicationFiles(argv);

          if (packageType === 'modal') await createBaseModalFiles(argv);

          if (packageType === 'lib' || packageType === 'ext-lib') await createBaseLibFiles(argv);

          if (packageType === 'api') await createBaseApiFiles(argv);

          if (packageType === 'module') await createBaseModuleFiles(argv);

          if (packageType === 'websocket') await createBaseWebsocketFiles(argv);

          if (packageType === 'api' || packageType === 'module' || packageType === 'websocket') {
            if (packageType !== 'api') await createReadMe(argv);
            await yarnInstall(argv);
          }

        } catch (err) {
          console.error(err);
          process.exit(1);
        }
      }
    })
    .command({
      aliases: 'b',
      command: 'build <type> [moduleName]',
      describe: 'builds anyOpsOS module type',
      builder: {
        type: {
          alias: 't',
          demand: true,
          describe: 'specify module type',
          hidden: true,
          choices: ['all', 'backend', 'frontend', 'library', 'external-library', 'application', 'modal', 'module', 'api-middleware', 'api', 'websocket']
        }
      },
      handler: async (argv: & { type: string; moduleName?: string }) => {
        try {

          if (argv.moduleName) setVars(argv);

          if (argv.type === 'all') return await buildAll(argv);
          if (argv.type === 'module') return await buildModules(argv);
          if (argv.type === 'api-middleware') return await buildApiMiddlewares(argv);
          if (argv.type === 'api') return await buildApis(argv);
          if (argv.type === 'websocket') return await buildWebsockets(argv);
          if (argv.type === 'backend') return await buildBackend();
          if (argv.type === 'frontend') return await buildFrontend();
          if (argv.type === 'library') return await buildLibrary(argv);
          if (argv.type === 'external-library') return await buildExternalLibrary(argv);
          if (argv.type === 'application') return await buildApplication(argv);
          if (argv.type === 'modal') return await buildModal(argv);
        } catch (err) {
          console.error(err);
          process.exit(1);
        }
      }
    })
    .command({
      aliases: 'l',
      command: 'lint <type> [moduleName]',
      describe: 'lints anyOpsOS module type',
      builder: {
        type: {
          alias: 't',
          demand: true,
          describe: 'specify module type',
          hidden: true,
          choices: ['all', 'backend', 'frontend', 'library', 'external-library', 'application', 'modal', 'module', 'api-middleware', 'api', 'websocket']
        }
      },
      handler: async (argv: & { type: string; moduleName?: string }) => {
        try {

          if (argv.moduleName) setVars(argv);

          if (argv.type === 'all') return await lintAll(argv);
          if (argv.type === 'module') return await lintModules(argv);
          if (argv.type === 'api-middleware') return await lintApiMiddlewares(argv);
          if (argv.type === 'api') return await lintApis(argv);
          if (argv.type === 'websocket') return await lintWebsockets(argv);
          if (argv.type === 'backend') return await lintBackend();
          if (argv.type === 'frontend') return await lintFrontend();
          if (argv.type === 'library') return await lintLibrary(argv);
          if (argv.type === 'external-library') return await lintExternalLibrary(argv);
          if (argv.type === 'application') return await lintApplication(argv);
          if (argv.type === 'modal') return await lintModal(argv);

        } catch (err) {
          console.error(err);
          process.exit(1);
        }
      }
    })
    .command({
      aliases: 's',
      command: 'start',
      describe: 'start anyOpsOS',
      handler: () => {
        try {

          awaitSpawn('node', ['dist/anyOpsOS/index.js'], {
            cwd: mainPathCwd,
            stdio: 'inherit'
          });

        } catch (err) {
          console.error(err);
          process.exit(1);
        }
      }
    })
    .command({
      command: 'devel',
      describe: 'Runs a Docker container with anyOpsOS files mounted on /var/www',
      handler: async () => {
        try {

          // Check if devel container is already created
          const dockerContainers: string = await awaitSpawn('docker', ['ps', '-a'], {
            cwd: mainPathCwd
          });

          console.log(dockerContainers.toString());

          // Get local yarn cache directory
          const localYarnCacheDir: string = await awaitSpawn('docker', ['ps', '-a'], {
            cwd: mainPathCwd
          });

          // Build devel image
          await awaitSpawn('docker', ['build', '-f', 'docker/Dockerfile.devel', '-t', 'anyopsos-devel', './docker'], {
            cwd: mainPathCwd,
            stdio: 'inherit'
          });

          // Run image
          await awaitSpawn('docker', ['run', '--rm', '-ti', '-v', `${process.cwd()}:/var/www`, '-v', `${localYarnCacheDir.toString()}:/usr/local/share/.cache/yarn/v6`, '--name', 'anyopsos-devel', 'anyopsos-devel'], {
            cwd: mainPathCwd,
            stdio: 'inherit'
          });

        } catch (err) {
          console.error(err);
          process.exit(1);
        }
      }
    })
    .example('$0 new library file-system fs', 'Will create a new local library with prefix \'alfs\'')
    .example('$0 n external-library file-system fs', 'Will create a new external library with prefix \'aelfs\'')
    .example('$0 new application file-system fs', 'Will create a new application with prefix \'aafs\'')
    .example('$0 new modal file-system fs', 'Will create a new modal with prefix \'amfs\'')
    .help()
    .strict()
    .showHelpOnFail(true)
    .demandCommand(1, '')
    .epilogue(`For more information, see https://github.com/anyopsos/anyopsos`)
    .wrap(yargs.terminalWidth())
    .argv;
})();


