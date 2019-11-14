import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnyOpsOSAppWmksComponent } from './anyopsos-app-wmks.component';

describe('AnyOpsOSAppWmksComponent', () => {
  let component: AnyOpsOSAppWmksComponent;
  let fixture: ComponentFixture<AnyOpsOSAppWmksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnyOpsOSAppWmksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnyOpsOSAppWmksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
