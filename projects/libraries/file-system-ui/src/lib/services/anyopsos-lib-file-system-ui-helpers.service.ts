import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSLibFileSystemUiHelpersService {

  constructor() {
  }

  /**
   * Get File type by extension
   */
  getFileType(longName: string): string {
    if (longName.charAt(0) === 'd') return 'folder';
    if (longName.charAt(0) === 'l') return 'folder';
    if (longName.substr(-4) === '.vmx') return 'file-code';
    if (longName.substr(-4) === '.log') return 'file-alt';
    if (longName.substr(-6) === '.nvram') return 'file';
    if (longName.substr(-5) === '.vmdk') return 'hdd';
    if (longName.substr(-5) === '.vmem') return 'file';
    if (longName.substr(-5) === '.vmsd') return 'file';
    if (longName.substr(-5) === '.vmsn') return 'file';
    if (longName.substr(-5) === '.vmss') return 'file';
    if (longName.substr(-5) === '.vmxf') return 'file';
    if (longName.substr(-5) === '.vmtm') return 'file';
    if (longName.substr(-5) === '.iso') return 'file-archive';
    if (longName.charAt(0) === '-' && (longName.charAt(3) === 'x')) return 'file-code';
    if (longName.charAt(0) === '-') return 'file';
    return 'file';
  }

}
