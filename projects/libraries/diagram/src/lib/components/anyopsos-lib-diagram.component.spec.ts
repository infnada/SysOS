import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnyOpsOSLibDiagramComponent } from './anyopsos-lib-diagram.component';

describe('AnyOpsOSLibDiagramComponent', () => {
  let component: AnyOpsOSLibDiagramComponent;
  let fixture: ComponentFixture<AnyOpsOSLibDiagramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnyOpsOSLibDiagramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnyOpsOSLibDiagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
