import {readFile} from 'fs-extra';
import awaitSpawn from 'await-spawn';

const projectInOrder = [
  'anyopsos-ext-lib-perfect-scrollbar',
  'anyopsos-ext-lib-pako'
];

export class BuildExtLibs {

  constructor() {

  }

  async build() {
    await this.buildExtLibs();
  }

  private async buildExtLibs() {

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
      if (!project.startsWith('anyopsos-ext-lib-')) continue;
      if (projectInOrder.includes(project)) continue;

      await awaitSpawn('npm.cmd', ['run', 'ng', 'build', project], {
        cwd: `${__dirname}/../../../src/frontend`,
        stdio: 'inherit'
      });
    }
  }

}
