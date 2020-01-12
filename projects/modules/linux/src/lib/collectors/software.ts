import {SshSessionsModule} from '@anyopsos/module-ssh';

export class SoftwareMonitorModule {

  constructor(private readonly userUuid: string,
              private readonly sessionUuid: string,
              private readonly connectionUuid: string) {
  }

  async getUpdates(): Promise<{
    name: string;
    arch: string;
    version: string;
    source: string;
    epoch?: string;
  }[]> {
    const packages = [];
    let m;
    let cmdData = await new SshSessionsModule().execAsync(this.userUuid, this.sessionUuid, this.connectionUuid, 'yum', ['check-update']);

    cmdData = cmdData.split(/\r?\n/);

    // Parse data
    for (let i = 0, len = cmdData.length; i < len; i++) {
      m = /^(\S+)\.([^\.]+)\s+(\S+)\s+(\S+)/.exec(cmdData[i]);
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
  }

}
