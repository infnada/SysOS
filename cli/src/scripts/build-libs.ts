import {readFile} from 'fs-extra';
import awaitSpawn from 'await-spawn';

const projectInOrder = [
  'anyopsos-lib-angular-material',
  'anyopsos-lib-pipes',
  'anyopsos-lib-logger',
  'anyopsos-lib-file-system',
  'anyopsos-lib-application',
  'anyopsos-lib-modal',
  'anyopsos-lib-netapp',
  'anyopsos-lib-selectable',
  'anyopsos-lib-types',
  'anyopsos-lib-user',
  'anyopsos-lib-vmware',
  'anyopsos-lib-file-system-ui',
  'anyopsos-lib-file',
  'anyopsos-lib-folder',
  'anyopsos-lib-service-injector',
  'anyopsos-lib-scroll-spy',
  'anyopsos-lib-utils'
];

export class BuildLibs {

  constructor() {

  }

  async build() {
    await this.buildLibs();
  }

  private async buildLibs() {

    // Build projects in order
    for (const project of projectInOrder) {

      await awaitSpawn('npm.cmd', ['run', 'ng', 'build', project], {
        cwd: `${__dirname}/../../../src/frontend`,
        stdio: 'inherit'
      });

    }

    // Build others
    const data = await readFile(`${__dirname}/../../../angular.json`, 'utf8');
    const ngCli = JSON.parse(data);

    for (const project of Object.keys(ngCli.projects)) {

      // Perform build operation only on libraries not already built
      if (!project.startsWith('anyopsos-lib-')) continue;
      if (projectInOrder.includes(project)) continue;

      await awaitSpawn('npm.cmd', ['run', 'ng', 'build', project], {
        cwd: `${__dirname}/../../../src/frontend`,
        stdio: 'inherit'
      });
    }
  }

}
