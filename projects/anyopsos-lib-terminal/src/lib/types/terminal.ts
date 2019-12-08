import {Terminal as xtermTerminal} from 'xterm';
import {FitAddon} from 'xterm-addon-fit';

export interface Terminal {
  terminal: xtermTerminal;
  fitAddon: FitAddon;
  state: string;
}
