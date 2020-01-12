import {readFile} from 'fs-extra';
import awaitSpawn from 'await-spawn';

export class BuildModals {

  constructor() {

  }

  async build() {
    await this.buildodals();
  }

  private async buildodals() {

    // Build others
    const data = await readFile(`${__dirname}/../../../angular.json`, 'utf8');
    const ngCli = JSON.parse(data);

    for (const project of Object.keys(ngCli.projects)) {

      // Perform build operation only on applications not already built
      if (!project.startsWith('anyopsos-modal-')) continue;

      await awaitSpawn('npm.cmd', ['run', 'ng', 'build', project], {
        cwd: `${__dirname}/../../../src/frontend`,
        stdio: 'inherit'
      });
    }
  }

}
