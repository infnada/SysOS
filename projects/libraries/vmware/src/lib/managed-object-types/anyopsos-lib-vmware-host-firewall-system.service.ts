import {Injectable} from '@angular/core';

import {map} from 'rxjs/operators';

import {AnyOpsOSLibVmwareHelperService} from '../anyopsos-lib-vmware-helper.service';
import {ConnectionData} from '../types/connection-data';
import {ManagedObjectReference} from '../types/managed-object-reference';
import {HostFirewallRulesetRulesetSpec} from '../types/host-firewall-ruleset-ruleset-spec';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSLibVmwareHostFirewallSystemService {

  constructor(private AnyOpsOSLibVmwareHelper: AnyOpsOSLibVmwareHelperService) {
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
      <spec>${this.AnyOpsOSLibVmwareHelper.setDynamicProperties(spec)}</spec>
    </UpdateRuleset>`;
    return this.AnyOpsOSLibVmwareHelper.doCallSoap(connectionData, xml).pipe(map((data: any) => {
      return this.AnyOpsOSLibVmwareHelper.validResponse(data.UpdateRulesetResponse[0]);
    })).toPromise();
  }
}
