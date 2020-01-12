import {SshSessionsModule} from '@anyopsos/module-ssh';

export class InitServiceManagementModule {

  constructor(private readonly userUuid: string,
              private readonly sessionUuid: string,
              private readonly connectionUuid: string) {
  }

  // Returns an error message if program is not installed, bin location if all is OK
  async checkOrogram(program: string): Promise<string> {
    const cmdData = await new SshSessionsModule().execAsync(this.userUuid, this.sessionUuid, this.connectionUuid, `command -v ${program} || { echo >&2 "no_program"; }`);
    return cmdData.replace(/(\n|\r)+$/, '');
  }

  async startActionAsync(service: string): Promise<string> {
    const cmdData = await new SshSessionsModule().execAsync(this.userUuid, this.sessionUuid, this.connectionUuid, `systemctl start ${service}`);
    return cmdData;
  }

  async stopActionAsync(service: string): Promise<string> {
    const cmdData = await new SshSessionsModule().execAsync(this.userUuid, this.sessionUuid, this.connectionUuid, `systemctl stop ${service}`);
    return cmdData;
  }

}
