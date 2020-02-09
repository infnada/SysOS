import {AnyOpsOSSshSessionStateModule} from '@anyopsos/module-ssh';

export class SoftwareMonitorModule {

  private readonly SshSessionStateModule: AnyOpsOSSshSessionStateModule;

  constructor(private readonly userUuid: string,
              private readonly sessionUuid: string,
              private readonly workspaceUuid: string,
              private readonly connectionUuid: string) {

    this.SshSessionStateModule = new AnyOpsOSSshSessionStateModule(this.userUuid, this.sessionUuid, this.workspaceUuid, this.connectionUuid);
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
    const cmdResult: string = await this.SshSessionStateModule.execAsync('yum', ['check-update']);
    const cmdData: string[] = cmdResult.split(/\r?\n/);

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
          epoch: e?.[0]
        });
      }
    }

    return packages;
  }

}
