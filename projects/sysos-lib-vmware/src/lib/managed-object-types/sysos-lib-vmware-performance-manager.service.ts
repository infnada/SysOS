import {Injectable} from '@angular/core';

import {map} from 'rxjs/operators';

import {SysosLibVmwareHelperService} from '../sysos-lib-vmware-helper.service';
import {ConnectionData} from '../types/connection-data';
import {PerfQuerySpec} from '../types/perf-query-spec';
import {ManagedObjectReference} from '../types/managed-object-reference';
import {DateTime} from '../types/date-time';

@Injectable({
  providedIn: 'root'
})
export class SysosLibVmwarePerformanceManagerService {

  constructor(private SysosLibVmwareHelper: SysosLibVmwareHelperService) {
  }

  CreatePerfInterval() {

  }

  QueryAvailablePerfMetric(
    connectionData: ConnectionData,
    managedObject: ManagedObjectReference,
    beginTime?: DateTime,
    endTime?: DateTime,
    intervalId?: number
  ) {
    const xml = `<QueryAvailablePerfMetric xmlns='urn:vim25'>
      <_this type='PerformanceManager'>PerfMgr</_this>
      <entity type='${managedObject.$type}'>${managedObject._value}</entity>
      <beginTime>${beginTime}</beginTime>
      <endTime>${endTime}</endTime>
      <intervalId>${intervalId}</intervalId>
    </QueryAvailablePerfMetric>`;
    return this.SysosLibVmwareHelper.doCallSoap(connectionData, xml).pipe(map((data: any) => {
      const res = [];

      data.QueryAvailablePerfMetricResponse[0].returnval.forEach(value => {
        res.push(this.SysosLibVmwareHelper.parseVMwareObject(value));
      });

      return this.SysosLibVmwareHelper.validResponse(res);
    })).toPromise();
  }

  QueryPerf(
    connectionData: ConnectionData,
    querySpec: PerfQuerySpec[]
  ) {
    const xml = `<QueryPerf xmlns='urn:vim25'>
      <_this type='PerformanceManager'>PerfMgr</_this>
      <querySpec>${this.SysosLibVmwareHelper.setDynamicProperties(querySpec)}</querySpec>
    </QueryPerf>`;
    return this.SysosLibVmwareHelper.doCallSoap(connectionData, xml).pipe(map((data: any) => {
      return this.SysosLibVmwareHelper.validResponse(data.QueryPerfResponse[0].returnval[0]);
    })).toPromise();
  }

  QueryPerfComposite() {

  }

  QueryPerfCounter(
    connectionData: ConnectionData,
    counterId: number[]
  ) {
    const xml = `<QueryPerfCounter xmlns='urn:vim25'>
      <_this type='PerformanceManager'>PerfMgr</_this>
      ${counterId.forEach((counter) => {
      return `<counterId>${counter}</counterId>`;
    })}
    </QueryPerfCounter>`;
    return this.SysosLibVmwareHelper.doCallSoap(connectionData, xml).pipe(map((data: any) => {
      return this.SysosLibVmwareHelper.validResponse(data.QueryPerfCounterResponse[0].returnval[0]);
    })).toPromise();
  }

  QueryPerfCounterByLevel(
    connectionData: ConnectionData,
    level: number
  ) {
    const xml = `<QueryPerfCounterByLevel xmlns='urn:vim25'>
      <_this type='PerformanceManager'>PerfMgr</_this>
      <level>${level}</level>
    </QueryPerfCounterByLevel>`;
    return this.SysosLibVmwareHelper.doCallSoap(connectionData, xml).pipe(map((data: any) => {
      const res = [];

      data.QueryPerfCounterByLevelResponse[0].returnval.forEach(value => {
        res.push(this.SysosLibVmwareHelper.parseVMwareObject(value));
      });

      return this.SysosLibVmwareHelper.validResponse(res);
    })).toPromise();
  }

  QueryPerfProviderSummary(
    connectionData: ConnectionData,
    managedObject: ManagedObjectReference
  ) {
    const xml = `<QueryPerfProviderSummary xmlns='urn:vim25'>
      <_this type='PerformanceManager'>PerfMgr</_this>
      <entity type='${managedObject.$type}'>${managedObject._value}</entity>
    </QueryPerfProviderSummary>`;
    return this.SysosLibVmwareHelper.doCallSoap(connectionData, xml).pipe(map((data: any) => {
      return this.SysosLibVmwareHelper.validResponse(data.QueryPerfProviderSummaryResponse[0].returnval[0]);
    })).toPromise();
  }

  RemovePerfInterval() {

  }

  ResetCounterLevelMapping() {

  }

  UpdateCounterLevelMapping() {

  }

  UpdatePerfInterval() {

  }
}
