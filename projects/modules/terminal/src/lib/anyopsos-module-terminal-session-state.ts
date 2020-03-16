import {v4 as uuidv4} from 'uuid';

import {AnyOpsOSConfigFileModule} from '@anyopsos/module-config-file';
import {AnyOpsOSCredentialModule} from '@anyopsos/module-credential';

import {TerminalMap} from './types/terminal-map';
import {Terminal} from './types/terminal';
import {TerminalTypes} from './types/terminal-types';


const terminalSessions: TerminalMap[] = [];

export class AnyOpsOSTerminalSessionStateModule {

  private readonly ConfigFileModule: AnyOpsOSConfigFileModule;
  private readonly CredentialModule: AnyOpsOSCredentialModule;

  constructor(private readonly userUuid: string,
              private readonly sessionUuid: string,
              private readonly workspaceUuid: string,
              private readonly connectionUuid: string) {

    this.ConfigFileModule = new AnyOpsOSConfigFileModule(this.userUuid, this.sessionUuid, this.workspaceUuid);
    this.CredentialModule = new AnyOpsOSCredentialModule(this.userUuid, this.sessionUuid, this.workspaceUuid);
  }

  /**
   * Terminal Connections
   */
  async createSession(type: TerminalTypes): Promise<TerminalMap> {
    const terminalUuid = uuidv4();

    const currentTerminal: Terminal = {
      uuid: terminalUuid,
      cols: 80,
      rows: 24,
      type,
      stream: null,
      stdin: null,
      stdout: null
    };

    const session: TerminalMap = {
      userUuid: this.userUuid,
      workspaceUuid: this.workspaceUuid,
      connectionUuid: this.connectionUuid,
      terminalUuid,
      terminal: currentTerminal
    };

    terminalSessions.push(session);
    return session;
  }

  /**
   * Disconnects a Terminal
   */
  async disconnectSession(terminalUuid: string): Promise<void> {

    const currentTerminal: TerminalMap = this.getSessionByTerminalUuid(terminalUuid);
    currentTerminal.terminal.stream?.end();
    currentTerminal.terminal.stdout?.end();

    // TODO remove terminal from sessionArray
  }

  getSessionByTerminalUuid(terminalUuid: string): TerminalMap {
    const currentSession: TerminalMap | undefined = terminalSessions.find((session: TerminalMap) => {
      return session.userUuid === this.userUuid &&
        session.workspaceUuid === this.workspaceUuid &&
        session.connectionUuid === this.connectionUuid &&
        session.terminalUuid === terminalUuid;
    });

    if (!currentSession) throw new Error('resource_invalid');

    return currentSession;
  }

}
