import {GlobalsModule} from '../../../globals';
import {SshSessionsModule} from '../../../../../socket/modules/ssh/ssh-sessions';

export class ServerMonitorModule {

  private GlobalsModule: GlobalsModule = new GlobalsModule(this.Connection);

  constructor(private Connection: SshSessionsModule) {

  }

  getRelease(): Promise<string> {
    return this.GlobalsModule.execAsync('cat /etc/centos-release').then((data) => {
      return data.replace(/(\n|\r)+$/, '');
    });
  }

  getKernel(): Promise<string> {
    return this.GlobalsModule.execAsync('uname -r').then((data) => {
      return data.replace(/(\n|\r)+$/, '');
    });
  }

  getCpu(): Promise<{}[]> {
    const cpuOptions = [];

    return Promise.all([
      this.GlobalsModule.execAsync('lscpu'),
      this.GlobalsModule.execAsync('cat /proc/loadavg')
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

  getDisk(): Promise<{}[]> {
    const diskOptions = [];

    return this.GlobalsModule.execAsync('df -h -x tmpfs -x devtmpfs').then((data) => {
      data = data.split(/\r?\n/);
      data.shift();
      data.pop();

      for (let i = 0, len = data.length; i < len; i++) {
        const currentData = data[i].split(/\s+/);

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
    });
  }

  getMemType(): Promise<string> {
    return this.GlobalsModule.execAsync('dmidecode --type 17 | grep -i "deta" |head -1').then((data) => {
      data = data.split(/\r?\n/);

      return data[0].substr(data[0].indexOf(':') + 2);
    });
  }

  getMemSpeed(): Promise<string> {
    return this.GlobalsModule.execAsync('dmidecode  | grep -i "Current speed" |grep "MHz" |head -1').then((data) => {
      data = data.split(/\r?\n/);

      return data[0].substr(data[0].indexOf(':') + 2);
    });
  }

  getMem(): Promise<{}[]> {
    const memOptions = [];

    return Promise.all([
      this.getMemSpeed(),
      this.getMemType()
    ]).then((result) => {

      return this.GlobalsModule.execAsync('free -m').then((data) => {
        data = data.split(/\r?\n/);
        data.shift();
        data.pop();

        const currentData = data[0].split(/\s+/);

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
    });
  }

}
