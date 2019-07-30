import { TestBed } from '@angular/core/testing';

import { SysosLibNetappQosService } from './sysos-lib-netapp-qos.service';

describe('SysosLibNetappQosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysosLibNetappQosService = TestBed.get(SysosLibNetappQosService);
    expect(service).toBeTruthy();
  });
});
