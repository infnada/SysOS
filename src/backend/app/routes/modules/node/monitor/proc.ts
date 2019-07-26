import {GlobalsModule} from '../../globals';
import {SshSessionsModule} from '../../../../socket/modules/ssh/ssh-sessions';

export class ProckMonitorModule {

  private GlobalsModule: GlobalsModule = new GlobalsModule(this.Connection);

  constructor(private Connection: SshSessionsModule) {

  }

  getPsVersion(): Promise<number> {
    return this.GlobalsModule.execAsync('ps V 2>&1').then((data) => {
      let m;

      m = /version\s+([0-9\.]+)\./.exec(data);
      if (m) {
        return m[1];
      }

      m = /\S+\s+([3-9][0-9\.]+)\./.exec(data);
      if (m) {
        return m[1];
      }

    });
  }

  listProcesses(): Promise<Array<any>> {
    return this.getPsVersion().then((psVersion) => {
      const processList = [];

      if (psVersion >= 2) {
        const width = ':80';
        return this.GlobalsModule.execAsync(`ps --cols 2048 -eo user${width},ruser${width},group${width},rgroup${width},pid,ppid,pgid,pcpu,vsz,nice,etime,time,stime,tty,args 2>/dev/null`)
          .then((data) => {

          data = data.split(/\r?\n/);
          data.shift();
          data.pop();

          for (let i = 0, len = data.length; i < len; i++) {
            const currentData = data[i].split(/\s+/);
            const argsData = data[i].split(/\s+/);
            argsData.splice(0, 14);

            processList.push({
              pid: currentData[4],
              ppid: currentData[5],
              user: currentData[0],
              cpu: `${currentData[7]} %`,
              size: `${currentData[8]} kB`,
              bytes: currentData[8] * 1024,
              time: currentData[11],
              stime: currentData[12],
              nice: currentData[9],
              args: argsData.join(' '),
              _group: currentData[2],
              _ruser: currentData[1],
              _rgroup: currentData[3],
              _tty: (currentData[13] === '?' ? 'none' : `/dev/${currentData[13]}`)
            });

          }

          return processList;

        });
      }

      return null;
    });
  }

}
