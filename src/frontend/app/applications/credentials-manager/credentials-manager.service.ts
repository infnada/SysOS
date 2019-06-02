import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {BehaviorSubject, Observable} from 'rxjs';
import {ToastrService} from 'ngx-toastr';

import {Credential} from './credential';

@Injectable({
  providedIn: 'root'
})
export class CredentialsManagerService {

  private _credentials: BehaviorSubject<Credential[]>;
  private _activeCredential: BehaviorSubject<string>;
  private dataStore: {  // This is where we will store our data in memory
    credentials: Credential[],
    activeCredential: string
  };
  credentials: Observable<any>;
  activeCredential: Observable<any>;

  constructor(private http: HttpClient,
              private toastr: ToastrService) {

    this.dataStore = { credentials: [], activeCredential: null };
    this._credentials = <BehaviorSubject<Credential[]>> new BehaviorSubject([]);
    this._activeCredential = <BehaviorSubject<string>> new BehaviorSubject(null);
    this.credentials = this._credentials.asObservable();
    this.activeCredential = this._activeCredential.asObservable();
  }

  setActiveCredential(uuid: string): void {
    this.dataStore.activeCredential = uuid;

    // broadcast data to subscribers
    this._activeCredential.next(Object.assign({}, this.dataStore).activeCredential);
  }

  initCredentials(): void {
    this.http.get('/api/credential/init').subscribe(
      (res: Credential[]) => {
        console.debug('Credentials Factory -> Get credentials successfully');

        this.dataStore.credentials = res;

        // broadcast data to subscribers
        this._credentials.next(Object.assign({}, this.dataStore).credentials);
      },
      error => {
        console.error('Credentials Factory -> Error while getting credentials -> ', error);
        return this.toastr.error('Error getting credentials.', 'Credential Manager');
      });
  }

  deleteCredential(uuid: string): void {
    this.http.post('/api/credential/delete', {
      uuid
    }).subscribe(
      () => {
        this.dataStore.activeCredential = null;

        this.dataStore.credentials = this.dataStore.credentials.filter((el) => {
          return el.uuid !== uuid;
        });

        // broadcast data to subscribers
        this._credentials.next(Object.assign({}, this.dataStore).credentials);
        this._activeCredential.next(Object.assign({}, this.dataStore).activeCredential);

        console.debug('Credentials Factory -> Deleted credential successfully');
        return this.toastr.success('Credential deleted.', 'Credential Manager');
      },
      error => {
        console.error('Credentials Factory -> Error while deleting credentials -> ', error);
        return this.toastr.error('Error deleting credential.', 'Credential Manager');
      });
  }

  saveCredential(credential: Credential): Promise<null> {

    return new Promise((resolve, reject) => {

      this.http.post('/api/credential/save', {
        credential
      }).subscribe(
        (res: { data: { response: string } }) => {
          const credentialExists = this.dataStore.credentials.filter(el => {
            return el.uuid === credential.uuid;
          })[0];

          if (credentialExists) {
            credentialExists.description = credential.description;
            credentialExists.username = credential.username;
          } else {
            this.dataStore.credentials.push({
              uuid: res.data.response,
              description: credential.description,
              username: credential.username
            });
          }

          this.dataStore.activeCredential = null;

          // broadcast data to subscribers
          this._credentials.next(Object.assign({}, this.dataStore).credentials);
          this._activeCredential.next(Object.assign({}, this.dataStore).activeCredential);

          console.debug('Credentials Factory -> Saved credential successfully');
          this.toastr.success('Credential saved.', 'Credential Manager');
          return resolve();
        },
        error => {
          console.error('Credentials Factory -> Error while saving credentials -> ', error);
          this.toastr.error('Error saving credential.', 'Credential Manager');
          return reject();
        });

    });
  }
}
