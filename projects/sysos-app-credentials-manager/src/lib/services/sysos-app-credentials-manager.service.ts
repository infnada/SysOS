import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';
import {SysosLibLoggerService} from '@sysos/lib-logger';

import {Credential} from '../types/credential';

@Injectable({
  providedIn: 'root'
})
export class SysosAppCredentialsManagerService {
  private $credentials: BehaviorSubject<Credential[]>;
  private $activeCredential: BehaviorSubject<string>;
  private dataStore: {  // This is where we will store our data in memory
    credentials: Credential[],
    activeCredential: string
  };
  credentials: Observable<any>;
  activeCredential: Observable<any>;

  constructor(private http: HttpClient,
              private logger: SysosLibLoggerService,
              private Toastr: ToastrService) {

    this.dataStore = { credentials: [], activeCredential: null };
    this.$credentials = new BehaviorSubject([]) as BehaviorSubject<Credential[]>;
    this.$activeCredential = new BehaviorSubject(null) as BehaviorSubject<string>;
    this.credentials = this.$credentials.asObservable();
    this.activeCredential = this.$activeCredential.asObservable();
  }

  setActiveCredential(uuid: string): void {
    this.dataStore.activeCredential = uuid;

    // broadcast data to subscribers
    this.$activeCredential.next(Object.assign({}, this.dataStore).activeCredential);
  }

  initCredentials(): void {
    this.http.get('/api/credential/').subscribe(
      (res: { data: Credential[] }) => {
        this.logger.info('Credentials Manager', 'Got credentials successfully');

        this.dataStore.credentials = res.data;

        // broadcast data to subscribers
        this.$credentials.next(Object.assign({}, this.dataStore).credentials);
      },
      error => {
        this.logger.error('Credentials Manager', 'Error while getting credentials', null, error);
        return this.Toastr.error('Error getting credentials.', 'Credential Manager');
      });
  }

  deleteCredential(uuid: string): void {
    const loggerArgs = arguments;

    this.http.delete(`/api/credential/${uuid}`).subscribe(
      () => {
        this.dataStore.activeCredential = null;

        this.dataStore.credentials = this.dataStore.credentials.filter((el) => {
          return el.uuid !== uuid;
        });

        // broadcast data to subscribers
        this.$credentials.next(Object.assign({}, this.dataStore).credentials);
        this.$activeCredential.next(Object.assign({}, this.dataStore).activeCredential);

        this.logger.debug('Credentials Manager', 'Deleted credential successfully', loggerArgs);
        return this.Toastr.success('Credential deleted.', 'Credential Manager');
      },
      error => {
        this.logger.error('Credentials Manager', 'Error while deleting credentials', loggerArgs, error);
        return this.Toastr.error('Error deleting credential.', 'Credential Manager');
      });
  }

  saveCredential(credential: Credential): Promise<null> {

    return new Promise((resolve, reject) => {

      this.http.put('/api/credential/', {
        credential
      }).subscribe(
        (res: { data: string }) => {
          const credentialExists = this.dataStore.credentials.filter(el => {
            return el.uuid === credential.uuid;
          })[0];

          if (credentialExists) {
            credentialExists.description = credential.description;
            credentialExists.username = credential.username;
          } else {
            this.dataStore.credentials.push({
              uuid: res.data,
              description: credential.description,
              type: credential.type,
              username: credential.username
            });
          }

          this.dataStore.activeCredential = null;

          // broadcast data to subscribers
          this.$credentials.next(Object.assign({}, this.dataStore).credentials);
          this.$activeCredential.next(Object.assign({}, this.dataStore).activeCredential);

          this.logger.debug('Credentials Manager', 'Saved credential successfully');
          this.Toastr.success('Credential saved.', 'Credential Manager');
          return resolve();
        },
        error => {
          this.logger.error('Credentials Manager', 'Error while saving credentials', null, error);
          this.Toastr.error('Error saving credential.', 'Credential Manager');
          return reject();
        });

    });
  }
}
