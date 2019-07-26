import {GlobalsModule} from '../../globals';
import {SshSessionsModule} from '../../../../socket/modules/ssh/ssh-sessions';

export class InitServiceManagementModule {

  private GlobalsModule: GlobalsModule = new GlobalsModule(this.Connection);

  constructor(private Connection: SshSessionsModule) {

  }

  // Returns an error message if program is not installed, bin location if all is OK
  checkOrogram(program: string): Promise<string> {
    return this.GlobalsModule.execAsync(`command -v ${program} || { echo >&2 "no_program"; }`).then((data) => {
      return data.replace(/(\n|\r)+$/, '');
    });
  }

  startActionAsync(service: string): Promise<string> {
    return this.GlobalsModule.execAsync(`systemctl start ${service}`).then((data) => {
      return data;
    });
  }

  stopActionAsync(service: string): Promise<string> {
    return this.GlobalsModule.execAsync(`systemctl stop ${service}`).then((data) => {
      return data;
    });
  }

}
