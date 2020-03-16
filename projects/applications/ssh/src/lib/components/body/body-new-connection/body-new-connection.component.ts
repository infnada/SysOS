import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';

import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

import {MatDialogRef} from '@anyopsos/lib-angular-material';
import {AnyOpsOSLibLoggerService} from '@anyopsos/lib-logger';
import {AnyOpsOSLibApplicationService} from '@anyopsos/lib-application';
import {AnyOpsOSLibModalService} from '@anyopsos/lib-modal';
import {AnyOpsOSLibCredentialHelpersService} from '@anyopsos/lib-credential';
import {AnyOpsOSLibSshHelpersService} from '@anyopsos/lib-ssh';
import {Credential} from '@anyopsos/module-credential';
import {ConnectionSsh, ConnectionSftp} from '@anyopsos/module-ssh';

import {AnyOpsOSAppSshService} from '../../../services/anyopsos-app-ssh.service';


@Component({
  selector: 'aassh-body-new-connection',
  templateUrl: './body-new-connection.component.html',
  styleUrls: ['./body-new-connection.component.scss']
})
export class BodyNewConnectionComponent implements OnDestroy, OnInit {
  private readonly destroySubject$: Subject<void> = new Subject();

  credentials: Credential[];
  connections: ConnectionSsh[];
  connectionForm: FormGroup;

  constructor(private readonly formBuilder: FormBuilder,
              private readonly logger: AnyOpsOSLibLoggerService,
              private readonly LibApplication: AnyOpsOSLibApplicationService,
              private readonly LibModal: AnyOpsOSLibModalService,
              private readonly LibCredentialHelpers: AnyOpsOSLibCredentialHelpersService,
              private readonly LibSshHelpers: AnyOpsOSLibSshHelpersService,
              private readonly Ssh: AnyOpsOSAppSshService) {
  }

  ngOnInit(): void {

    // Create main Form
    this.connectionForm = this.formBuilder.group({
      description: ['', Validators.required],
      host: ['', Validators.required],
      port: [22, Validators.required],
      credential: ['', Validators.required],
      hopServerUuid: [],
      autoLogin: [false],
      uuid: [null],
      type: ['ssh']
    });

    // Listen for credentials changes
    this.LibCredentialHelpers.getAllCredentialsObserver()
      .pipe(takeUntil(this.destroySubject$)).subscribe((credentials: Credential[]) => this.credentials = credentials);

    // Listen for connections changes
    this.LibSshHelpers.getAllConnectionsObserver()
      .pipe(takeUntil(this.destroySubject$)).subscribe((connections: (ConnectionSsh | ConnectionSftp)[]) => {

      const sshConnections: ConnectionSsh[] = connections.filter((connection: ConnectionSsh | ConnectionSftp) => connection.type === 'ssh') as ConnectionSsh[];
      this.onConnectionsChange(sshConnections);
    });

    // Listen for activeConnectionUuid change
    this.Ssh.activeConnectionUuid
      .pipe(takeUntil(this.destroySubject$)).subscribe((activeConnectionUuid: string) => this.onActiveConnectionChange(activeConnectionUuid));
  }

  ngOnDestroy(): void {
    this.connectionForm.reset();

    // Remove all listeners
    this.destroySubject$.next();
  }

  private onConnectionsChange(connections: ConnectionSsh[]): void {
    this.connections = connections;

    if (this.connections.length === 0) return this.connectionForm.controls.hopServerUuid.disable();
    this.connectionForm.controls.hopServerUuid.enable();
  }

  private onActiveConnectionChange(activeConnectionUuid: string): void {

    // Reset main Form
    if (!activeConnectionUuid) {
      return this.connectionForm.reset({
        port: 22,
        autoLogin: false,
        hopServerUuid: null,
        uuid: null
      });
    }

    // Set Form controls with currentConnection data
    const currentConnection: ConnectionSsh = this.Ssh.getActiveConnection();
    Object.keys(currentConnection).forEach((item: string) => {
      if (this.connectionForm.controls[item]) this.connectionForm.controls[item].setValue(currentConnection[item]);
    });
  }

  /**
   * Form getter
   */
  get f(): { [key: string]: AbstractControl } { return this.connectionForm.controls; }

  /**
   * Initialize connection with main Form data
   */
  async sendConnect(saveOnly: boolean = false): Promise<void> {

    // stop here if form is invalid
    if (this.connectionForm.invalid) return;

    const littleModalRef: MatDialogRef<any> = await this.LibModal.openLittleModal(
      this.Ssh.getBodyContainerRef(),
      'PLEASE WAIT',
      (saveOnly ? 'Saving connection...' : 'Connecting to server...')
    );

    this.Ssh.connect(this.connectionForm.value, saveOnly).then((connection: ConnectionSsh) => {
      this.Ssh.setActiveConnectionUuid(connection.uuid);

      this.LibModal.closeModal(littleModalRef.id);
    }).catch((e: any) => {
      this.logger.error('Ssh', 'Error while connecting', null, e);

      this.LibModal.changeModalType(littleModalRef.id, 'danger');
      this.LibModal.changeModalText(littleModalRef.id, e);
    });
  }

  manageCredentials(): void {
    this.LibApplication.openApplication('credentials-manager');
  }
}
