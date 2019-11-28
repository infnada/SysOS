import { TestBed } from '@angular/core/testing';

import { AnyOpsOSModalInfrastructureManagerKubernetesCreateResourceService } from './anyopsos-modal-infrastructure-manager-kubernetes-create-resource.service';

describe('AnyOpsOSModalInfrastructureManagerKubernetesCreateResourceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSModalInfrastructureManagerKubernetesCreateResourceService = TestBed.get(AnyOpsOSModalInfrastructureManagerKubernetesCreateResourceService);
    expect(service).toBeTruthy();
  });
});
