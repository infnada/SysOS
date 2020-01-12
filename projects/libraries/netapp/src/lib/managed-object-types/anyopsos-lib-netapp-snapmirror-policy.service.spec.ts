import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibNetappSnapmirrorPolicyService } from './anyopsos-lib-netapp-snapmirror-policy.service';

describe('AnyOpsOSLibNetappSnapmirrorPolicyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibNetappSnapmirrorPolicyService = TestBed.get(AnyOpsOSLibNetappSnapmirrorPolicyService);
    expect(service).toBeTruthy();
  });
});
