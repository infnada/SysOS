import {Injectable} from '@angular/core';

import {map} from 'rxjs/operators';

import {AnyOpsOSLibVmwareHelperService} from '../anyopsos-lib-vmware-helper.service';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSLibVmwareGuestFileManagerService {

  constructor(private AnyOpsOSLibVmwareHelper: AnyOpsOSLibVmwareHelperService) {
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
