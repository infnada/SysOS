import { TestBed } from '@angular/core/testing';

import { AnyOpsOSLibKubernetesFileSystemHandlersService } from './anyopsos-lib-kubernetes-file-system-handlers.service';

describe('AnyOpsOSLibKubernetesFileSystemHandlersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOpsOSLibKubernetesFileSystemHandlersService = TestBed.get(AnyOpsOSLibKubernetesFileSystemHandlersService);
    expect(service).toBeTruthy();
  });
});
