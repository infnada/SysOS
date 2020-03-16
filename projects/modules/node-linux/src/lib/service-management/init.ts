import {AnyOpsOSSshSessionStateModule} from '@anyopsos/module-ssh';

export class InitServiceManagementModule {

  private readonly SshSessionStateModule: AnyOpsOSSshSessionStateModule;

  constructor(private readonly userUuid: string,
              private readonly sessionUuid: string,
              private readonly workspaceUuid: string,
              private readonly connectionUuid: string) {

    this.SshSessionStateModule = new AnyOpsOSSshSessionStateModule(this.userUuid, this.sessionUuid, this.workspaceUuid, this.connectionUuid);
  }

  // Returns an error message if program is not installed, bin location if all is OK
  async checkOrogram(program: string): Promise<string> {
    const cmdData = await this.SshSessionStateModule.execAsync(`command -v ${program} || { echo >&2 "no_program"; }`);
    return cmdData.replace(/(\n|\r)+$/, '');
  }

  async startActionAsync(service: string): Promise<string> {
    const cmdData = await this.SshSessionStateModule.execAsync(`systemctl start ${service}`);
    return cmdData;
  }

  async stopActionAsync(service: string): Promise<string> {
    const cmdData = await this.SshSessionStateModule.execAsync(`systemctl stop ${service}`);
    return cmdData;
  }

}
