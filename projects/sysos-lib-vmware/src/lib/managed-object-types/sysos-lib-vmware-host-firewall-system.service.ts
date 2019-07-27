import {Injectable} from '@angular/core';

import {map} from 'rxjs/operators';

import {SysosLibVmwareHelperService} from '../sysos-lib-vmware-helper.service';
import {ConnectionData} from '../types/connection-data';
import {ManagedObjectReference} from '../types/managed-object-reference';
import {HostFirewallRulesetRulesetSpec} from '../types/host-firewall-ruleset-ruleset-spec';

@Injectable({
  providedIn: 'root'
})
export class SysosLibVmwareHostFirewallSystemService {

  constructor(private SysosLibVmwareHelper: SysosLibVmwareHelperService) {
  }

  DisableRuleset() {

  }

  EnableRuleset() {

  }

  RefreshFirewall() {

  }

  UpdateDefaultPolicy() {

  }

  UpdateRuleset(
    connectionData: ConnectionData,
    managedFirewallSystem: ManagedObjectReference & { $type: 'HostFirewallSystem' },
    id: string,
    spec: HostFirewallRulesetRulesetSpec
  ) {
    const xml = `<UpdateRuleset xmlns='urn:vim25'>
      <_this type='HostFirewallSystem'>${managedFirewallSystem._value}</_this>
      <id>${id}</id>
      <spec>${this.SysosLibVmwareHelper.setDynamicProperties(spec)}</spec>
    </UpdateRuleset>`;
    return this.SysosLibVmwareHelper.doCallSoap(connectionData, xml).pipe(map((data: any) => {
      return this.SysosLibVmwareHelper.validResponse(data.UpdateRulesetResponse[0]);
    })).toPromise();
  }
}
