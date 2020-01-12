import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnyOpsOSExtLibWeavescopeComponent } from './anyopsos-ext-lib-weavescope.component';

describe('AnyOpsOSExtLibWeavescopeComponent', () => {
  let component: AnyOpsOSExtLibWeavescopeComponent;
  let fixture: ComponentFixture<AnyOpsOSExtLibWeavescopeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnyOpsOSExtLibWeavescopeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnyOpsOSExtLibWeavescopeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
