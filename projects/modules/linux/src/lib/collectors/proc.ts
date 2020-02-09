import {AnyOpsOSSshSessionStateModule} from '@anyopsos/module-ssh';

export class ProckMonitorModule {

  private readonly SshSessionStateModule: AnyOpsOSSshSessionStateModule;

  constructor(private readonly userUuid: string,
              private readonly sessionUuid: string,
              private readonly workspaceUuid: string,
              private readonly connectionUuid: string) {

    this.SshSessionStateModule = new AnyOpsOSSshSessionStateModule(this.userUuid, this.sessionUuid, this.workspaceUuid, this.connectionUuid);
  }

  async getPsVersion(): Promise<number> {
    const cmdData = await this.SshSessionStateModule.execAsync('ps', ['V', '2>&1']);
    let m;

    m = /version\s+([0-9\.]+)\./.exec(cmdData);
    if (m) {
      return parseInt(m[1], 10);
    }

    m = /\S+\s+([3-9][0-9\.]+)\./.exec(cmdData);
    if (m) {
      return parseInt(m[1], 10);
    }

    return 0;
  }

  async listProcesses(): Promise<{}[] | void> {
    const psVersion: number = await this.getPsVersion();
    const processList: {}[] = [];

    if (psVersion >= 2) {
      const width = ':80';
      const cmdResult = await this.SshSessionStateModule.execAsync(
        'ps', ['--cols', '2048', '-eo', `user${width},ruser${width},group${width},rgroup${width},pid,ppid,pgid,pcpu,vsz,nice,etime,time,stime,tty,args`, '2>/dev/null']);

      let cmdData: string[] = cmdResult.split(/\r?\n/);
      cmdData.shift();
      cmdData.pop();

      for (let i = 0, len = cmdData.length; i < len; i++) {
        const currentData = cmdData[i].split(/\s+/);
        const argsData = cmdData[i].split(/\s+/);
        argsData.splice(0, 14);

        processList.push({
          pid: currentData[4],
          ppid: currentData[5],
          user: currentData[0],
          cpu: `${currentData[7]} %`,
          size: `${currentData[8]} kB`,
          bytes: parseInt(currentData[8], 10) * 1024,
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
    }

    return;
  }

}
