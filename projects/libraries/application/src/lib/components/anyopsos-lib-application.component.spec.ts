import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnyOpsOSLibApplicationComponent } from './anyopsos-lib-application.component';

describe('AnyOpsOSLibApplicationComponent', () => {
  let component: AnyOpsOSLibApplicationComponent;
  let fixture: ComponentFixture<AnyOpsOSLibApplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnyOpsOSLibApplicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnyOpsOSLibApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
