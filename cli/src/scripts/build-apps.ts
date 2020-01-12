import {readFile} from 'fs-extra';
import awaitSpawn from 'await-spawn';

const projectInOrder = [
  'anyopsos-app-credentials-manager',
  'anyopsos-app-ssh',
  'anyopsos-app-infrastructure-manager'
];

export class BuildApps {

  constructor() {

  }

  async build() {
    await this.buildApps();
  }

  private async buildApps() {

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

      // Perform build operation only on applications not already built
      if (!project.startsWith('anyopsos-app-')) continue;
      if (projectInOrder.includes(project)) continue;

      await awaitSpawn('npm.cmd', ['run', 'ng', 'build', project], {
        cwd: `${__dirname}/../../../src/frontend`,
        stdio: 'inherit'
      });
    }
  }

}
