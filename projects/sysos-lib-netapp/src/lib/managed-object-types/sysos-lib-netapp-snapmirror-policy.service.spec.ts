import { TestBed } from '@angular/core/testing';

import { SysosLibNetappSnapmirrorPolicyService } from './sysos-lib-netapp-snapmirror-policy.service';

describe('SysosLibNetappSnapmirrorPolicyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibNetappSnapmirrorPolicyService = TestBed.get(SysosLibNetappSnapmirrorPolicyService);
    expect(service).toBeTruthy();
  });
});
