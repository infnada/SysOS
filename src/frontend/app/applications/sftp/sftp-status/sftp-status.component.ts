import {Component, Input, OnInit} from '@angular/core';
import {SftpService} from '../services/sftp.service';
import {Application} from '../../../interfaces/application';
import {SftpConnection} from '../SftpConnection';

@Component({
  selector: 'app-sftp-status',
  templateUrl: './sftp-status.component.html',
  styleUrls: ['./sftp-status.component.scss']
})
export class SftpStatusComponent implements OnInit {
  @Input() application: Application;

  constructor(private SftpService: SftpService) {
  }

  ngOnInit() {
  }

  getActiveConnection(): SftpConnection {
    return this.SftpService.getActiveConnection();
  }

}
