import {GlobalsModule} from '../../../globals';
import {SshSessionsModule} from '../../../../../socket/modules/ssh/ssh-sessions';

export class SoftwareMonitorModule {

  private GlobalsModule: GlobalsModule = new GlobalsModule(this.Connection);

  constructor(private Connection: SshSessionsModule) {

  }

  getUpdates(): Promise<{}[]> {
    return this.GlobalsModule.execAsync('yum check-update').then((data)  => {
      const packages = [];
      let m;

      data = data.split(/\r?\n/);

      // Parse data
      for (let i = 0, len = data.length; i < len; i++) {
        m = /^(\S+)\.([^\.]+)\s+(\S+)\s+(\S+)/.exec(data[i]);
        if (m) {

          // Extract epoch
          const e = /^(\S+):/.exec(m[3]);

          packages.push({
            name: m[1],
            arch: m[2],
            version: m[3],
            source: m[4],
            epoch: (e ? e[0] : null)
          });

        }

      }

      return packages;

    }).catch((e) => {
      return e;
    });
  }

}
