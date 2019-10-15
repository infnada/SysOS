import {Component, Input, AfterViewInit} from '@angular/core';

import {SysosLibExtJqueryService} from '@sysos/lib-ext-jquery';
import {SysosLibExtDygraphsService} from '@sysos/lib-ext-dygraphs';
import {SysosLibExtGaugejsService} from '@sysos/lib-ext-gaugejs';
import {SysosLibExtPerfectscrollbarService} from '@sysos/lib-ext-perfectscrollbar';
import {SysosLibExtNetdataService} from '@sysos/lib-ext-netdata';

import {SysosAppInfrastructureVmwareTemplateHelpersService} from '../../../services/vmware/sysos-app-infrastructure-vmware-template-helpers.service';
import {VMWareObject} from '../../../types/vmware-object';

@Component({
  selector: 'saim-object',
  templateUrl: './object.component.html',
  styleUrls: ['./object.component.scss']
})
export class ObjectComponent implements AfterViewInit {
  @Input() vmwareObject: VMWareObject;

  constructor(private jQuery: SysosLibExtJqueryService,
              private Dygraphs: SysosLibExtDygraphsService,
              private gaugeJS: SysosLibExtGaugejsService,
              private Ps: SysosLibExtPerfectscrollbarService,
              private NetdataService: SysosLibExtNetdataService,
              public VmwareTemplateHelpers: SysosAppInfrastructureVmwareTemplateHelpersService) {
  }

  ngAfterViewInit() {
    this.jQuery.$.fn.popover = () => {
      console.log('popover');
    };
    new this.NetdataService.Dashboard(this.jQuery.$, this.Dygraphs.Dygraph, this.gaugeJS.gaugeJS.Gauge, this.Ps.PerfectScrollbar);
    this.NetdataService.setNetdataShowAlarms(false);
  }

  haveMonitor() {
    return this.VmwareTemplateHelpers.getObjectType(this.vmwareObject) === 'VirtualMachine' ||
      this.VmwareTemplateHelpers.getObjectType(this.vmwareObject) === 'VirtualMachine';
  }

}
