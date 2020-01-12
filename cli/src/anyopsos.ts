import {copy, move, unlink, pathExistsSync, readdir, ensureDir, outputJson, outputFile, stat, truncate} from 'fs-extra';
import {read as readLines} from 'read-last-lines';
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
  const mainPathCwd = `${__dirname}/../../`;

  let packageType;
  let packageLongType;
  let packagePrefix;
  let projectPath;

  const yarnInstall = async (argv) => {
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
    projectPath = `${__dirname}/../../projects/${packageLongType}/${argv.name ? argv.name : argv.moduleName}`;
  };

  /**
   * NEW COMMAND
   */

  /**
   * Creates main angular module (library)
   */
  const createLibrary = async (argv): Promise<void> => {
    console.log('Creating module');

    if (packageType === 'api' || packageType === 'module' || packageType === 'websocket') {

      await ensureDir(`${projectPath}/src`);
      await outputJson(`${projectPath}/tsconfig.lib.json`, {
        extends: '../../tsconfig.json',
        compilerOptions: {
          emitDecoratorMetadata: true,
          experimentalDecorators: true,
          module: 'commonjs',
          esModuleInterop: true,
          allowSyntheticDefaultImports: true,
          target: 'es2015',
          noImplicitAny: true,
          moduleResolution: 'node',
          sourceMap: true,
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
    console.log('Moving module');

    await move(
      `${__dirname}/../../projects/any-ops-o-s-${packageType}-${argv.name}`,
      `${projectPath}`
    );
  };

  /**
   * Sets correct parameters/paths on files like (tsconfig, tslint, package, ng-package, angular).json
   */
  const standarizeLibraryFiles = async (argv): Promise<void> => {
    console.log('Editing module files');

    const packageFile = editJsonFile(`${projectPath}/package.json`);
    const ngPackageFile = editJsonFile(`${projectPath}/ng-package.json`);
    const tsConfigLibFile = editJsonFile(`${projectPath}/tsconfig.lib.json`);
    const tsConfigSpecFile = editJsonFile(`${projectPath}/tsconfig.spec.json`);
    const tsLintFile = editJsonFile(`${projectPath}/tslint.json`);
    const modulesTsConfigFile = editJsonFile(`${__dirname}/../../projects/tsconfig.json`);
    const mainTsConfigFile = editJsonFile(`${__dirname}/../../tsconfig.json`);
    const mainAngularFile = editJsonFile(`${__dirname}/../../angular.json`);

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
    currentAngularProject = JSON.parse(JSON.stringify(currentAngularProject).replace(/projects\/any-ops-o-s-(lib|ext-lib|module|app)-[a-z-]*/gi, `projects/${packageLongType}/${argv.name}`));
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
    console.log('Deleting default files');

    await unlink(`${projectPath}/src/lib/any-ops-o-s-${packageType}-${argv.name}.component.spec.ts`, (e) => { if (e) throw e; });
    await unlink(`${projectPath}/src/lib/any-ops-o-s-${packageType}-${argv.name}.component.ts`, (e) => { if (e) throw e; });
    await unlink(`${projectPath}/src/lib/any-ops-o-s-${packageType}-${argv.name}.service.spec.ts`, (e) => { if (e) throw e; });
    await unlink(`${projectPath}/src/lib/any-ops-o-s-${packageType}-${argv.name}.service.ts`, (e) => { if (e) throw e; });
  };

  /**
   * Sets correct name to library Module file
   */
  const renameLibraryModuleFile = async (argv): Promise<void> => {
    console.log('Rename module file');

    await move(
      `${projectPath}/src/lib/any-ops-o-s-${packageType}-${argv.name}.module.ts`,
      `${projectPath}/src/lib/anyopsos-${packageType}-${argv.name}.module.ts`
    );
  };

  const removeUnwantedCodeFromFiles = async (argv): Promise<void> => {
    console.log('Remove unwanted code from files');

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
    await copy(`${__dirname}/../../LICENSE`, `${projectPath}/LICENSE`, (e) => { if (e) throw e; });
  };

  const createReadMe = async (argv): Promise<void> => {
    await outputFile(`${projectPath}/README.md`, `${packageType} ${argv.name}`);
  };

  /**
   * ----------
   */

  /**
   * Create base application type files
   */
  const createBaseApplicationFiles = async (argv): Promise<void> => {
    console.log('Generating new components');

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
   * Create base library/external-library type files
   */
  const createBaseLibFiles = async (argv): Promise<void> => {
    console.log('Generating new services');

    await awaitSpawn('ng.cmd', ['generate', 'service', `services/anyopsos-${packageType}-${argv.name}`, '--project', `anyopsos-${packageType}-${argv.name}`], {
      cwd: mainPathCwd,
      stdio: 'inherit'
    });
  };

  /**
   * Create base api type files
   */
  const createBaseApiFiles = async (argv): Promise<void> => {
    console.log('Generating new api files');

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

const logger = getLogger('mainlog');

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
    console.log('Generating new module files');

    let dynamicModule = argv.name
      .toLowerCase()
      .replace(/-(.)/g, (match, group1) => group1.toUpperCase());

    dynamicModule = `AnyOpsOS${dynamicModule.charAt(0).toUpperCase()}${dynamicModule.slice(1)}Module`;

    await outputJson(`${projectPath}/package.json`, {
      name: `@anyopsos/${packageType}-${argv.name}`,
      version: '0.0.1',
      main: 'src/index.ts',
      devDependencies: {
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
    console.log('Generating new api files');

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

const logger = getLogger('mainlog');

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
    const lines2nuke = 1;

    return new Promise((resolve, reject) => {
      readLines(filename, lines2nuke).then((lines) => {
        const toVanquish = lines.length;
        stat(filename, (err, stats) => {
          if (err) return reject(err);
          truncate(filename, stats.size - toVanquish, (e: Error) => {
            if (e) return reject(err);

            console.log(`${filename} truncated!`);
            return resolve();
          });
        });
      });
    });
  };

  const buildModules = async (argv): Promise<void> => {

    console.log('Building modules');

    if (argv.moduleName) {

      await awaitSpawn('tsc.cmd', ['--build', `${projectPath}/tsconfig.lib.json`], {
        cwd: `${__dirname}/../../`,
        stdio: 'inherit'
      });

      // Copy to filesystem
      console.log(`Copying module ${argv.moduleName}`);
      await copy(
        `${__dirname}/../../dist/modules/${argv.moduleName}/`,
        `${__dirname}/../../dist/anyOpsOS/filesystem/bin/modules/module-${argv.moduleName}`
      );

    } else {

      const projectsFiles = await readdir(`${__dirname}/../../projects/modules/`);
      await Promise.all(projectsFiles.map(async (directory: string): Promise<void> => {

        console.log(`Building module ${directory}`);
        await awaitSpawn('tsc.cmd', ['--build', `${__dirname}/../../projects/modules/${directory}/tsconfig.lib.json`], {
          cwd: `${__dirname}/../../`,
          stdio: 'inherit'
        });
        console.log(`End building module ${directory}`);

      }));

      // Copy to filesystem
      const directoryFiles = await readdir(`${__dirname}/../../dist/modules/`);
      await directoryFiles.map(async (directory: string): Promise<void> => {

        console.log(`Copying module ${directory}`);
        await copy(
          `${__dirname}/../../dist/modules/${directory}/`,
          `${__dirname}/../../dist/anyOpsOS/filesystem/bin/modules/module-${directory}`
        );
      });

    }

  };

  const buildApiMiddlewares = async (argv): Promise<void> => {

    console.log('Building api middlewares');

    if (argv.moduleName) {

      await awaitSpawn('tsc.cmd', ['--build', `${projectPath}/tsconfig.lib.json`], {
        cwd: `${__dirname}/../../`,
        stdio: 'inherit'
      });

      // Copy to filesystem
      console.log(`Copying api middleware ${argv.moduleName}`);
      await copy(
        `${__dirname}/../../dist/api-middlewares/${argv.moduleName}/`,
        `${__dirname}/../../dist/anyOpsOS/filesystem/bin/modules/api-middleware-${argv.moduleName}`
      );

    } else {

      const projectsFiles = await readdir(`${__dirname}/../../projects/api-middlewares/`);
      await Promise.all(projectsFiles.map(async (directory: string): Promise<void> => {

        console.log(`Building api-middleware ${directory}`);
        await awaitSpawn('tsc.cmd', ['--build', `${__dirname}/../../projects/api-middlewares/${directory}/tsconfig.lib.json`], {
          cwd: `${__dirname}/../../`,
          stdio: 'inherit'
        });
        console.log(`End building module ${directory}`);

      }));

      // Copy to filesystem
      const directoryFiles = await readdir(`${__dirname}/../../dist/api-middlewares/`);
      await directoryFiles.map(async (directory: string): Promise<void> => {

        console.log(`Copying api-middleware ${directory}`);
        await copy(
          `${__dirname}/../../dist/api-middlewares/${directory}/`,
          `${__dirname}/../../dist/anyOpsOS/filesystem/bin/modules/api-middleware-${directory}`
        );
      });

    }

  };

  const buildApis = async (argv): Promise<void> => {

    console.log('Building apis');

    if (argv.moduleName) {

      await awaitSpawn('tsc.cmd', ['--build', `${projectPath}/tsconfig.lib.json`], {
        cwd: `${__dirname}/../../`,
        stdio: 'inherit'
      });

      // Copy to filesystem
      console.log(`Copying api ${argv.moduleName}`);
      await copy(
        `${__dirname}/../../dist/apis/${argv.moduleName}/`,
        `${__dirname}/../../dist/anyOpsOS/filesystem/bin/apis/${argv.moduleName}`
      );

    } else {

      const projectsFiles = await readdir(`${__dirname}/../../projects/apis/`);
      await Promise.all(projectsFiles.map(async (directory: string): Promise<void> => {

        // TODO hardcoded end to not check swagger file. Test if its a directory with fs.stat
        if (directory === 'swagger.json') return;

        console.log(`Building api ${directory}`);
        await awaitSpawn('tsc.cmd', ['--build', `${__dirname}/../../projects/apis/${directory}/tsconfig.lib.json`], {
          cwd: `${__dirname}/../../`,
          stdio: 'inherit'
        });
        console.log(`End building api ${directory}`);

      }));

      // Copy to filesystem
      console.log(`Copying apis`);
      await copy(
        `${__dirname}/../../dist/apis/`,
        `${__dirname}/../../dist/anyOpsOS/filesystem/bin/apis/`
      );
    }

    // Generate APIS swagger.json
    await require('./swagger-generator');

  };

  const buildWebsockets = async (argv): Promise<void> => {

    console.log('Building websockets');

    if (argv.moduleName) {

      await awaitSpawn('tsc.cmd', ['--build', `${projectPath}/tsconfig.lib.json`], {
        cwd: `${__dirname}/../../`,
        stdio: 'inherit'
      });

      // Copy to filesystem
      console.log(`Copying websocket ${argv.moduleName}`);
      await copy(
        `${__dirname}/../../dist/websockets/${argv.moduleName}/`,
        `${__dirname}/../../dist/anyOpsOS/filesystem/bin/websockets/${argv.moduleName}`
      );

    } else {

      const projectsFiles = await readdir(`${__dirname}/../../projects/websockets/`);
      await Promise.all(projectsFiles.map(async (directory: string): Promise<void> => {

        console.log(`Building websocket ${directory}`);
        await awaitSpawn('tsc.cmd', ['--build', `${__dirname}/../../projects/websockets/${directory}/tsconfig.lib.json`], {
          cwd: `${__dirname}/../../`,
          stdio: 'inherit'
        });
        console.log(`End building websocket ${directory}`);

      }));

      // Copy to filesystem
      console.log(`Copying websockets`);
      await copy(
        `${__dirname}/../../dist/websockets/`,
        `${__dirname}/../../dist/anyOpsOS/filesystem/bin/websockets/`
      );
    }

  };

  const buildBackend = async (): Promise<void> => {

    console.log('Building backend');
    await awaitSpawn('tsc.cmd', ['--build', 'src/backend/tsconfig.json'], {
      cwd: `${__dirname}/../../`,
      stdio: 'inherit'
    });
  };

  const buildFrontend = async (): Promise<void> => {

    console.log('Building frontend');
    await awaitSpawn('ng.cmd', ['build'], {
      cwd: mainPathCwd,
      stdio: 'inherit'
    });
  };

  const buildLibrary = async (argv): Promise<void> => {

    if (argv.moduleName) {
      await awaitSpawn('ng.cmd', ['build', `anyopsos-lib-${argv.moduleName}`], {
        cwd: mainPathCwd,
        stdio: 'inherit'
      });
    } else {
      await new BuildLibs().build();
    }

  };

  const moveExternalLibraryAsDep = async (): Promise<void> => {

    // Move Netdata to Deps
    if (pathExistsSync(`${__dirname}/../../dist/anyOpsOS/filesystem/bin/libs/anyopsos-ext-lib-netdata.umd.js`)) {
      await move(
        `${__dirname}/../../dist/anyOpsOS/filesystem/bin/libs/anyopsos-ext-lib-netdata.umd.js`,
        `${__dirname}/../../dist/anyOpsOS/filesystem/bin/libs/deps/anyopsos-ext-lib-netdata.umd.js`,
        {
          overwrite: true
        }
      );
    }

  };

  const buildExternalLibrary = async (argv): Promise<void> => {

    if (argv.moduleName) {

      // Build
      await awaitSpawn('ng.cmd', ['build', `anyopsos-ext-lib-${argv.moduleName}`], {
        cwd: mainPathCwd,
        stdio: 'inherit'
      });

      await removeSourceMaps(`${__dirname}/../../dist/external-libraries/${argv.moduleName}/bundles/anyopsos-ext-lib-${argv.moduleName}.umd.js`);

      // Run postbuild script if exists
      if (pathExistsSync(`${projectPath}/scripts/postbuild.js`)) {

        console.log(`Running postbuild script for ${argv.moduleName}`);
        await require(`${projectPath}/scripts/postbuild.js`);
      }

      // Copy to filesystem
      console.log(`Copying library ${argv.moduleName}`);
      await copy(
        `${__dirname}/../../dist/external-libraries/${argv.moduleName}/bundles/anyopsos-ext-lib-${argv.moduleName}.umd.js`,
        `${__dirname}/../../dist/anyOpsOS/filesystem/bin/libs/anyopsos-ext-lib-${argv.moduleName}.umd.js`
      );
    } else {

      // Build
      await new BuildExtLibs().build();

      // Run postbuild script if exists
      const projectsFiles = await readdir(`${__dirname}/../../projects/external-libraries/`);
      await Promise.all(projectsFiles.map(async (directory: string): Promise<void> => {

        if (pathExistsSync(`${__dirname}/../../projects/external-libraries/${directory}/scripts/postbuild.js`)) {

          console.log(`Running postbuild script for ${directory}`);
          await require(`${__dirname}/../../projects/external-libraries/${directory}/scripts/postbuild.js`);
        }

      }));

      // Copy to filesystem
      const directoryFiles = await readdir(`${__dirname}/../../dist/external-libraries/`);
      await directoryFiles.map(async (directory: string): Promise<void> => {

        await removeSourceMaps(`${__dirname}/../../dist/external-libraries/${directory}/bundles/anyopsos-ext-lib-${directory}.umd.js`);

        console.log(`Copying library ${directory}`);
        await copy(
          `${__dirname}/../../dist/external-libraries/${directory}/bundles/anyopsos-ext-lib-${directory}.umd.js`,
          `${__dirname}/../../dist/anyOpsOS/filesystem/bin/libs/anyopsos-ext-lib-${directory}.umd.js`
        );
      });
    }

    await moveExternalLibraryAsDep();

  };

  const buildApplication = async (argv): Promise<void> => {

    if (argv.moduleName) {

      // Build
      await awaitSpawn('ng.cmd', ['build', `anyopsos-app-${argv.moduleName}`], {
        cwd: mainPathCwd,
        stdio: 'inherit'
      });

      await removeSourceMaps(`${__dirname}/../../dist/applications/${argv.moduleName}/bundles/anyopsos-app-${argv.moduleName}.umd.js`);

      // Run postbuild script if exists
      if (pathExistsSync(`${projectPath}/scripts/postbuild.js`)) {

        console.log(`Running postbuild script for ${argv.moduleName}`);
        await require(`${projectPath}/scripts/postbuild.js`);
      }

      // Copy to filesystem
      console.log(`Copying application ${argv.moduleName}`);
      await copy(
        `${__dirname}/../../dist/applications/${argv.moduleName}/bundles/anyopsos-app-${argv.moduleName}.umd.js`,
        `${__dirname}/../../dist/anyOpsOS/filesystem/bin/applications/anyopsos-app-${argv.moduleName}.umd.js`
      );
    } else {

      // Build
      await new BuildApps().build();

      // Run postbuild script if exists
      const projectsFiles = await readdir(`${__dirname}/../../projects/applications/`);
      await projectsFiles.map(async (directory: string): Promise<void> => {

        if (pathExistsSync(`${__dirname}/../../projects/applications/${directory}/scripts/postbuild.js`)) {

          console.log(`Running postbuild script for ${directory}`);
          await require(`${__dirname}/../../projects/applications/${directory}/scripts/postbuild.js`);
        }

      });

      // Copy to filesystem
      const directoryFiles = await readdir(`${__dirname}/../../dist/applications/`);
      await directoryFiles.map(async (directory: string): Promise<void> => {

        await removeSourceMaps(`${__dirname}/../../dist/applications/${directory}/bundles/anyopsos-app-${directory}.umd.js`);

        console.log(`Copying application ${directory}`);
        await copy(
          `${__dirname}/../../dist/applications/${directory}/bundles/anyopsos-app-${directory}.umd.js`,
          `${__dirname}/../../dist/anyOpsOS/filesystem/bin/applications/anyopsos-app-${directory}.umd.js`
        );
      });
    }

  };

  const buildModal = async (argv): Promise<void> => {

    if (argv.moduleName) {

      // Build
      await awaitSpawn('ng.cmd', ['build', `anyopsos-modal-${argv.moduleName}`], {
        cwd: mainPathCwd,
        stdio: 'inherit'
      });

      // Run postbuild script if exists
      if (pathExistsSync(`${projectPath}/scripts/postbuild.js`)) {

        console.log(`Running postbuild script for ${argv.moduleName}`);
        await require(`${projectPath}/scripts/postbuild.js`);
      }

      // Copy to filesystem
      console.log(`Copying modal ${argv.moduleName}`);
      await copy(
        `${__dirname}/../../dist/modals/${argv.moduleName}/bundles/anyopsos-modal-${argv.moduleName}.umd.js`,
        `${__dirname}/../../dist/anyOpsOS/filesystem/bin/modals/anyopsos-modal-${argv.moduleName}.umd.js`
      );
    } else {

      // Build
      await new BuildModals().build();

      // Run postbuild script if exists
      const projectsFiles = await readdir(`${__dirname}/../../projects/modals/`);
      await projectsFiles.map(async (directory: string): Promise<void> => {

        if (pathExistsSync(`${__dirname}/../../projects/modals/${directory}/scripts/postbuild.js`)) {

          console.log(`Running postbuild script for ${directory}`);
          await require(`${__dirname}/../../projects/modals/${directory}/scripts/postbuild.js`);
        }

      });

      // Copy to filesystem
      const directoryFiles = await readdir(`${__dirname}/../../dist/modals/`);
      await directoryFiles.map(async (directory: string): Promise<void> => {

        console.log(`Copying modal ${directory}`);
        await copy(
          `${__dirname}/../../dist/modals/${directory}/bundles/anyopsos-modal-${directory}.umd.js`,
          `${__dirname}/../../dist/anyOpsOS/filesystem/bin/modals/anyopsos-modal-${directory}.umd.js`
        );
      });
    }

  };

  const buildAll = async (argv): Promise<void> => {

    console.log('Erasing \'dist\'');
    await rimraf(`${__dirname}/../../dist/`, (e) => { if (e) throw e; });

    await buildModules(argv);
    await buildApiMiddlewares(argv);
    await buildApis(argv);
    await buildWebsockets(argv);

    await buildBackend();

    await copy(`${__dirname}/../../src/backend/app/ssl`, `${__dirname}/../../dist/anyOpsOS/ssl`);
    await copy(`${__dirname}/../../src/backend/app/filesystem`, `${__dirname}/../../dist/anyOpsOS/filesystem`);

    await buildLibrary(argv);
    await buildFrontend();
    await buildExternalLibrary(argv);
    await buildApplication(argv);
    await buildModal(argv);
  };

  // tslint:disable-next-line:no-unused-expression
  yargs
    .usage('Usage: $0 <command> [options]')
    .command({
      aliases: 'n',
      command: 'new <type> <name> [prefix]',
      describe: 'creates a new anyOpsOS module type',
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

          if (packageType !== 'api' && packageType !== 'module' && packageType !== 'websocket') {
            await moveLibraryToFinalLocation(argv);

            await standarizeLibraryFiles(argv);

            await deleteDefaultFiles(argv);

            await renameLibraryModuleFile(argv);

            await removeUnwantedCodeFromFiles(argv);
          }

          await copyLicenseFile();

          if (packageType === 'application') await createBaseApplicationFiles(argv);

          if (packageType === 'library' || packageType === 'external-library') await createBaseLibFiles(argv);

          if (packageType === 'api') await createBaseApiFiles(argv);

          if (packageType === 'module') await createBaseModuleFiles(argv);

          if (packageType === 'websocket') await createBaseWebsocketFiles(argv);

          if (packageType === 'api' || packageType === 'module' || packageType === 'websocket') {
            await createReadMe(argv);
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
      command: 'lint <type>',
      describe: 'lints anyOpsOS module type',
      builder: {
        type: {
          alias: 't',
          demand: true,
          describe: 'specify module type',
          hidden: true,
          choices: ['all', 'backend', 'frontend']
        }
      },
      handler: (argv: & { type: string; }) => {
        try {

          if (argv.type === 'backend' || argv.type === 'all') {
            awaitSpawn('tslint', ['-p', 'backend/tsconfig.json'], {
              cwd: `${__dirname}/../../`,
              stdio: 'inherit'
            });
          }

          if (argv.type === 'frontend' || argv.type === 'all') {
            awaitSpawn('ng.cmd', ['lint'], {
              cwd: mainPathCwd,
              stdio: 'inherit'
            });
          }
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


