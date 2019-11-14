import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnyOpsOSModalPlainComponent } from './anyopsos-modal-plain.component';

describe('AnyOpsOSModalPlainComponent', () => {
  let component: AnyOpsOSModalPlainComponent;
  let fixture: ComponentFixture<AnyOpsOSModalPlainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnyOpsOSModalPlainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnyOpsOSModalPlainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
