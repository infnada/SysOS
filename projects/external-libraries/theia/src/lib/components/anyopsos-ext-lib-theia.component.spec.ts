import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnyOpsOSExtLibTheiaComponent } from './anyopsos-ext-lib-theia.component';

describe('AnyOpsOSExtLibTheiaComponent', () => {
  let component: AnyOpsOSExtLibTheiaComponent;
  let fixture: ComponentFixture<AnyOpsOSExtLibTheiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnyOpsOSExtLibTheiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnyOpsOSExtLibTheiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
