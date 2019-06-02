import {Component, Input, OnInit} from '@angular/core';
import {Application} from '../../../../interfaces/application';

@Component({
  selector: 'app-sftp-body-exchange',
  templateUrl: './sftp-body-exchange.component.html',
  styleUrls: ['./sftp-body-exchange.component.scss']
})
export class SftpBodyExchangeComponent implements OnInit {
  @Input() application: Application;

  constructor() { }

  ngOnInit() {
  }

}
