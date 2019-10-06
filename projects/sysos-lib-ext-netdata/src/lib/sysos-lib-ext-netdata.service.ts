import {Injectable} from '@angular/core';

declare let NETDATA: any;
declare let netdataShowAlarms: boolean;
declare let netdataSnapshotData: any;
declare let netdataCheckXSS: boolean;
declare let connection: any;

import * as Dashboard from 'netdata/web/gui/dashboard';
import * as DashboardInfo from 'netdata/web/gui/dashboard_info';

@Injectable({
  providedIn: 'root'
})
export class SysosLibExtNetdataService {

  Dashboard;
  DashboardInfo;
  NETDATA = NETDATA;

  constructor() {
    this.Dashboard = Dashboard;
    this.DashboardInfo = DashboardInfo;
  }

  setNetdataShowAlarms(value): void {
    netdataShowAlarms = value;
  }

  setNetdataSnapshotData(value): void {
    netdataSnapshotData = value;
  }

  getNetdataSnapshotData() {
    return netdataSnapshotData;
  }

  setNetdataCheckXSS(value): void {
    netdataCheckXSS = value;
  }

  getNetdataCheckXSS() {
   return netdataCheckXSS;
  }

  setConnection(value): void {
    connection = value;
  }

  getConnection() {
    return connection;
  }


}
