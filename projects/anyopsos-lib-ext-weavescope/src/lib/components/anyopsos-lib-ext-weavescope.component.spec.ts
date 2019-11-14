import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnyOpsOSLibExtWeavescopeComponent } from './anyopsos-lib-ext-weavescope.component';

describe('AnyOpsOSLibExtWeavescopeComponent', () => {
  let component: AnyOpsOSLibExtWeavescopeComponent;
  let fixture: ComponentFixture<AnyOpsOSLibExtWeavescopeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnyOpsOSLibExtWeavescopeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnyOpsOSLibExtWeavescopeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
