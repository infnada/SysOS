import {Component, Input, OnInit} from '@angular/core';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {SysosLibServiceInjectorService} from '@sysos/lib-service-injector';

@Component({
  selector: 'smmi-sysos-modal-monitor-import',
  templateUrl: './sysos-modal-monitor-import.component.html',
  styleUrls: ['./sysos-modal-monitor-import.component.scss']
})
export class SysosModalMonitorImportComponent implements OnInit {
  @Input() connection: any;

  private Monitor;
  NETDATA;
  Math = Math;

  snapshotStatusText: string = 'Browse for a snapshot file (or drag it and drop it here), then click <b>Import</b> to render it.';
  snapshotStatusType: string = 'info';

  readyToImport: boolean = false;
  fileName: string;
  fileResult = null;

  dateAfter;
  dateBefore;

  constructor(public activeModal: NgbActiveModal,
              private serviceInjector: SysosLibServiceInjectorService) {
  }

  ngOnInit() {
    this.Monitor = this.serviceInjector.get('SysosAppMonitorService');

    // https://github.com/anyOpsOS/anyOpsOS/issues/3
    setTimeout(() => {
      this.NETDATA = this.connection.NETDATA;
    }, 0);
  }

  loadSnapshotPreflight(fileInput: any) {
    const files = fileInput.target.files;
    if (files.length <= 0) {
      this.snapshotStatusText = 'No file selected';
      this.snapshotStatusType = 'danger';
      return;
    }

    this.snapshotStatusText = 'Loading file...';
    this.snapshotStatusType = 'info';

    this.loadSnapshotPreflightFile(files.item(0));
  }

  private loadSnapshotPreflightFile(file: File) {
    this.fileName = this.NETDATA.xss.string(file.name);
    const fr = new FileReader();

    fr.onload = (e: any) => {
      try {
        this.fileResult = this.NETDATA.xss.checkAlways('snapshot', JSON.parse(e.target.result), /^(snapshot\.info|snapshot\.data)$/);

        this.dateAfter = new Date(this.fileResult.after_ms);
        this.dateBefore = new Date(this.fileResult.before_ms);

        if (typeof this.fileResult.charts_ok === 'undefined') this.fileResult.charts_ok = 'unknown';
        if (typeof this.fileResult.charts_failed === 'undefined') this.fileResult.charts_failed = 0;
        if (typeof this.fileResult.compression === 'undefined') this.fileResult.compression = 'none';
        if (typeof this.fileResult.data_size === 'undefined') this.fileResult.data_size = 0;

        this.snapshotStatusText = 'File loaded, click <b>Import</b> to render it!';
        this.snapshotStatusType = 'success';

        this.readyToImport = true;
      } catch (e) {
        console.log(e);
        this.snapshotStatusText = 'Failed to parse this file!';
        this.snapshotStatusType = 'danger';
      }
    };

    fr.readAsText(file);
  }

  loadSnapshot() {
    this.readyToImport = false;

    if (this.fileResult === null) {
      this.snapshotStatusText = 'No data have been loaded';
      this.snapshotStatusType = 'danger';
      return;
    }

    this.snapshotStatusText = 'Please wait, activating snapshot...';
    this.snapshotStatusType = 'info';

    this.activeModal.close();

    this.Monitor.connect({
      description: 'Netdata Snapshot',
      url: this.fileResult.server,
      credential: '',
      save: false,
      autologin: false,
      uuid: null,
      type: 'snapshot',
      snapshotData: this.fileResult
    });
  }

}
