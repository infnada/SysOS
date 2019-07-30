import { TestBed } from '@angular/core/testing';

import { SysosLibNetappServiceProcessorService } from './sysos-lib-netapp-service-processor.service';

describe('SysosLibNetappServiceProcessorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibNetappServiceProcessorService = TestBed.get(SysosLibNetappServiceProcessorService);
    expect(service).toBeTruthy();
  });
});
