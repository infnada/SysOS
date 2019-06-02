import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import {ApplicationsService} from '../../../../services/applications.service';
import {CredentialsManagerService} from '../../../credentials-manager/credentials-manager.service';
import {SftpService} from '../../services/sftp.service';

import {Application} from '../../../../interfaces/application';
import {Credential} from '../../../credentials-manager/credential';
import {SftpConnection} from '../../SftpConnection';

@Component({
  selector: 'app-sftp-body-new-connection',
  templateUrl: './sftp-body-new-connection.component.html',
  styleUrls: ['./sftp-body-new-connection.component.scss']
})
export class SftpBodyNewConnectionComponent implements OnInit {
  @Input() application: Application;

  credentials: Credential[];
  connectionForm: FormGroup;
  submitted: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private SftpService: SftpService,
              private ApplicationsService: ApplicationsService,
              private CredentialsManagerService: CredentialsManagerService) {

    this.CredentialsManagerService.credentials.subscribe(credentials => this.credentials = credentials);
  }

  ngOnInit() {
    this.connectionForm = this.formBuilder.group({
      description: ['', Validators.required],
      host: ['', Validators.required],
      port: [22, Validators.required],
      credential: ['', [Validators.required]],
      save: [false],
      autologin: [false],
      uuid: [null]
    });

    this.SftpService.activeConnection.subscribe((activeConnection: string) => {

      if (!activeConnection) return;

      (<FormControl> this.connectionForm.controls['description']).setValue(this.getActiveConnection().description);
      (<FormControl> this.connectionForm.controls['host']).setValue(this.getActiveConnection().host);
      (<FormControl> this.connectionForm.controls['port']).setValue(this.getActiveConnection().port);
      (<FormControl> this.connectionForm.controls['credential']).setValue(this.getActiveConnection().credential);
      (<FormControl> this.connectionForm.controls['save']).setValue(this.getActiveConnection().save);
      (<FormControl> this.connectionForm.controls['autologin']).setValue(this.getActiveConnection().autologin);
      (<FormControl> this.connectionForm.controls['uuid']).setValue(this.getActiveConnection().uuid);
    });
  }

  get f() { return this.connectionForm.controls; }

  sendConnect(): void {
    this.submitted = true;

    // stop here if form is invalid
    if (this.connectionForm.invalid) {
      return;
    }

    this.SftpService.connect(this.connectionForm.value);

    this.submitted = false;
    this.connectionForm.reset();
  }

  manageCredentials() {
    this.ApplicationsService.openApplication('credentials-manager');
    this.ApplicationsService.toggleApplication('credentials-manager');
  }

  getActiveConnection(): SftpConnection {
    return this.SftpService.getActiveConnection();
  }

}
