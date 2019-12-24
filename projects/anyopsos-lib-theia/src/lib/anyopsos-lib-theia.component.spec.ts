import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnyOpsOSLibTheiaComponent } from './anyopsos-lib-theia.component';

describe('AnyOpsOSLibTheiaComponent', () => {
  let component: AnyOpsOSLibTheiaComponent;
  let fixture: ComponentFixture<AnyOpsOSLibTheiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnyOpsOSLibTheiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnyOpsOSLibTheiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
