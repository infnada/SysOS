import {AnyOpsOSSshSessionStateModule} from '@anyopsos/module-ssh';

export class ServerMonitorModule {

  private readonly SshSessionStateModule: AnyOpsOSSshSessionStateModule;

  constructor(private readonly userUuid: string,
              private readonly sessionUuid: string,
              private readonly workspaceUuid: string,
              private readonly connectionUuid: string) {

    this.SshSessionStateModule = new AnyOpsOSSshSessionStateModule(this.userUuid, this.sessionUuid, this.workspaceUuid, this.connectionUuid);
  }

  async getRelease(): Promise<string> {
    const cmdData = await this.SshSessionStateModule.execAsync('cat', ['/etc/centos-release']);
    return cmdData.replace(/(\n|\r)+$/, '');
  }

  async getKernel(): Promise<string> {
    const cmdData = await this.SshSessionStateModule.execAsync('uname', ['-r']);
    return cmdData.replace(/(\n|\r)+$/, '');
  }

  async getCpu(): Promise<{option: unknown, data: unknown}[]> {
    const cpuOptions: {option: unknown, data: unknown}[] = [];

    return Promise.all([
      this.SshSessionStateModule.execAsync('lscpu'),
      this.SshSessionStateModule.execAsync('cat', ['/proc/loadavg'])
    ]).then((cmdResult: [string, string]) => {

      const cpuResult: string[] = cmdResult[0].split(/\r?\n/);
      cpuResult.pop();

      for (let i = 0, len = cpuResult.length; i < len; i++) {
        const currentData = cpuResult[i].split(/:\s+/);

        cpuOptions.push({
          option: currentData[0],
          data: currentData[1]
        });
      }

      cpuOptions.push({
        option: 'Load average',
        data: cmdResult[1].replace(/\r?\n/, '')
      });

      return cpuOptions;
    });
  }

  async getDisk(): Promise<{}[]> {
    const diskOptions = [];

    const cmdResult: string = await this.SshSessionStateModule.execAsync('df', ['-h', '-x', 'tmpfs', '-x', 'devtmpfs']);
    const cmdData = cmdResult.split(/\r?\n/);
    cmdData.shift();
    cmdData.pop();

    for (let i = 0, len = cmdData.length; i < len; i++) {
      const currentData = cmdData[i].split(/\s+/);

      diskOptions.push({
        disk: currentData[0],
        size: currentData[1],
        used_space: currentData[2],
        used_percent: currentData[4],
        free_space: currentData[3],
        free_percent: `${100 - parseInt(currentData[4].slice(0, -1), 10)}%`,
        mount_point: currentData[5]
      });
    }

    return diskOptions;
  }

  async getMemType(): Promise<string> {
    const cmdResult: string = await this.SshSessionStateModule.execAsync('dmidecode', ['--type', '17', '|', 'grep', '-i', '"deta"', '|', 'head', '-1']);
    const cmdData: string[] = cmdResult.split(/\r?\n/);

    return cmdData[0].substr(cmdData[0].indexOf(':') + 2);
  }

  async getMemSpeed(): Promise<string> {
    const cmdResult: string = await this.SshSessionStateModule.execAsync('dmidecode', ['|', 'grep', '-i', '"Current speed"', '|', 'grep', '"MHz"', '|', 'head', '-1']);
    const cmdData: string[] = cmdResult.split(/\r?\n/);

    return cmdData[0].substr(cmdData[0].indexOf(':') + 2);
  }

  async getMem(): Promise<{}[]> {
    const memOptions: {}[] = [];

    return Promise.all([
      this.getMemSpeed(),
      this.getMemType()
    ]).then(async (result) => {

      const cmdResult: string = await this.SshSessionStateModule.execAsync('free', ['-m']);
      const cmdData: string[] = cmdResult.split(/\r?\n/);
      cmdData.shift();
      cmdData.pop();

      const currentData = cmdData[0].split(/\s+/);

      memOptions.push({
        total: currentData[1],
        used: currentData[2],
        free: currentData[3],
        shared: currentData[4],
        cache: currentData[5],
        available: currentData[6],
        type: result[1],
        speed: result[0]
      });

      return memOptions;
    });
  }

}
