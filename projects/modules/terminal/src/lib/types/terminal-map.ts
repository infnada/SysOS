import {Terminal} from './terminal';

export interface TerminalMap {
  userUuid: string;
  workspaceUuid: string;
  connectionUuid: string;
  terminalUuid: string;
  terminal: Terminal;
}
