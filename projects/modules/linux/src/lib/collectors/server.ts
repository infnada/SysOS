import {SshSessionsModule} from '@anyopsos/module-ssh';

export class ServerMonitorModule {

  constructor(private readonly userUuid: string,
              private readonly sessionUuid: string,
              private readonly connectionUuid: string) {
  }

  async getRelease(): Promise<string> {
    const cmdData = await new SshSessionsModule().execAsync(this.userUuid, this.sessionUuid, this.connectionUuid, 'cat', ['/etc/centos-release']);
    return cmdData.replace(/(\n|\r)+$/, '');
  }

  async getKernel(): Promise<string> {
    const cmdData = await new SshSessionsModule().execAsync(this.userUuid, this.sessionUuid, this.connectionUuid, 'uname', ['-r']);
    return cmdData.replace(/(\n|\r)+$/, '');
  }

  async getCpu(): Promise<{option: unknown, data: unknown}[]> {
    const cpuOptions: {option: unknown, data: unknown}[] = [];

    return Promise.all([
      new SshSessionsModule().execAsync(this.userUuid, this.sessionUuid, this.connectionUuid, 'lscpu'),
      new SshSessionsModule().execAsync(this.userUuid, this.sessionUuid, this.connectionUuid, 'cat', ['/proc/loadavg'])
    ]).then((data) => {

      data[0] = data[0].split(/\r?\n/);
      data[0].pop();

      for (let i = 0, len = data[0].length; i < len; i++) {
        const currentData = data[0][i].split(/:\s+/);

        cpuOptions.push({
          option: currentData[0],
          data: currentData[1]
        });
      }

      cpuOptions.push({
        option: 'Load average',
        data: data[1].replace(/\r?\n/, '')
      });

      return cpuOptions;
    });
  }

  async getDisk(): Promise<{}[]> {
    const diskOptions = [];

    let cmdData = await new SshSessionsModule().execAsync(this.userUuid, this.sessionUuid, this.connectionUuid, 'df', ['-h', '-x', 'tmpfs', '-x', 'devtmpfs']);
    cmdData = cmdData.split(/\r?\n/);
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
    let cmdData = await new SshSessionsModule().execAsync(this.userUuid, this.sessionUuid, this.connectionUuid,
      'dmidecode', ['--type', '17', '|', 'grep', '-i', '"deta"', '|', 'head', '-1']);
    cmdData = cmdData.split(/\r?\n/);

    return cmdData[0].substr(cmdData[0].indexOf(':') + 2);
  }

  async getMemSpeed(): Promise<string> {
    let cmdData = await new SshSessionsModule().execAsync(this.userUuid, this.sessionUuid, this.connectionUuid,
      'dmidecode', ['|', 'grep', '-i', '"Current speed"', '|', 'grep', '"MHz"', '|', 'head', '-1']);
    cmdData = cmdData.split(/\r?\n/);

    return cmdData[0].substr(cmdData[0].indexOf(':') + 2);
  }

  async getMem(): Promise<{}[]> {
    const memOptions: {}[] = [];

    return Promise.all([
      this.getMemSpeed(),
      this.getMemType()
    ]).then(async (result) => {

      let cmdData = await new SshSessionsModule().execAsync(this.userUuid, this.sessionUuid, this.connectionUuid, 'free', ['-m']);
      cmdData = cmdData.split(/\r?\n/);
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
