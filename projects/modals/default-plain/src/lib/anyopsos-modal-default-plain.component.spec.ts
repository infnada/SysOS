import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnyOpsOSModalDefaultPlainComponent } from './anyopsos-modal-default-plain.component';

describe('AnyOpsOSModalDefaultPlainComponent', () => {
  let component: AnyOpsOSModalDefaultPlainComponent;
  let fixture: ComponentFixture<AnyOpsOSModalDefaultPlainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnyOpsOSModalDefaultPlainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnyOpsOSModalDefaultPlainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
