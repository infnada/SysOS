import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';

import {AnyOpsOSLibWorkspaceService} from '@anyopsos/lib-workspace';
import {Credential} from '@anyopsos/module-credential';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSLibCredentialApiService {

  constructor(private readonly http: HttpClient,
              private readonly LibWorkspace: AnyOpsOSLibWorkspaceService) {
  }

  getCredentials(): Observable<Object> {
    return this.http.get(`/api/credential/${this.LibWorkspace.getCurrentWorkspaceUuid()}`);
  }

  putCredential(credential: Credential): Observable<Object> {
    return this.http.put(`/api/credential/${this.LibWorkspace.getCurrentWorkspaceUuid()}`, {
      credential
    });
  }

  patchCredential(credentialUuid: string, credential: Credential): Observable<Object> {
    return this.http.patch(`/api/credential/${this.LibWorkspace.getCurrentWorkspaceUuid()}/${encodeURIComponent(credentialUuid)}`, {
      credential
    })
  }

  deleteCredential(credentialUuid: string): Observable<Object> {
    return this.http.delete(`/api/credential/${this.LibWorkspace.getCurrentWorkspaceUuid()}/${encodeURIComponent(credentialUuid)}`)
  }
}
