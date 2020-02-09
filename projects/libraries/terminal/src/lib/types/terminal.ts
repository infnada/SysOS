import {Terminal as xtermTerminal} from 'xterm';
import {FitAddon} from 'xterm-addon-fit';

export interface Terminal {
  workspaceUuid: string;
  connectionUuid: string;
  terminal: xtermTerminal;
  fitAddon: FitAddon;
  state: string;
}
