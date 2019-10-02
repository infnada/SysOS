import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SysosModalInfrastructureManagerRemoveTagComponent } from './sysos-modal-infrastructure-manager-remove-tag.component';

describe('SysosModalInfrastructureManagerRemoveTagComponent', () => {
  let component: SysosModalInfrastructureManagerRemoveTagComponent;
  let fixture: ComponentFixture<SysosModalInfrastructureManagerRemoveTagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SysosModalInfrastructureManagerRemoveTagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SysosModalInfrastructureManagerRemoveTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
