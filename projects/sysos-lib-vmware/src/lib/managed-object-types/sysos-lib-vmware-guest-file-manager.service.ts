import {Injectable} from '@angular/core';

import {map} from "rxjs/operators";

import {SysosLibVmwareHelperService} from "../sysos-lib-vmware-helper.service";

@Injectable({
  providedIn: 'root'
})
export class SysosLibVmwareGuestFileManagerService {

  constructor(private SysosLibVmwareHelper: SysosLibVmwareHelperService) {
  }

  ChangeFileAttributesInGuest() {

  }

  CreateTemporaryDirectoryInGuest() {

  }

  CreateTemporaryFileInGuest() {

  }

  DeleteDirectoryInGuest() {

  }

  DeleteFileInGuest() {

  }

  InitiateFileTransferFromGuest() {

  }

  InitiateFileTransferToGuest() {

  }

  ListFilesInGuest() {

  }

  MakeDirectoryInGuest() {

  }

  MoveDirectoryInGuest() {

  }

  MoveFileInGuest() {

  }
}
