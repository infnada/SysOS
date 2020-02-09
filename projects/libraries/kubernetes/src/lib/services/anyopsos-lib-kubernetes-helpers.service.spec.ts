import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibKubernetesHelpersService } from './anyopsos-lib-kubernetes-helpers.service';

describe('AnyOpsOSLibKubernetesHelpersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibKubernetesHelpersService = TestBed.get(AnyOpsOSLibKubernetesHelpersService);
    expect(service).toBeTruthy();
  });
});
