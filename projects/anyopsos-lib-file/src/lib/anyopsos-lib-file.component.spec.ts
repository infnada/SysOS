import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnyOpsOSLibFileComponent } from './anyopsos-lib-file.component';

describe('AnyOpsOSLibFileComponent', () => {
  let component: AnyOpsOSLibFileComponent;
  let fixture: ComponentFixture<AnyOpsOSLibFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnyOpsOSLibFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnyOpsOSLibFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
