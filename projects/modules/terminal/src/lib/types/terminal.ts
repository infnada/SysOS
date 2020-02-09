import {ClientChannel} from 'ssh2';
import {Readable, Writable} from 'stream';

import {TerminalTypes} from './terminal-types';

export interface Terminal {
  uuid: string;
  cols: number;
  rows: number;
  type: TerminalTypes;
  stream: ClientChannel | null;
  stdin: Readable | null;
  stdout: Writable | null;
}
