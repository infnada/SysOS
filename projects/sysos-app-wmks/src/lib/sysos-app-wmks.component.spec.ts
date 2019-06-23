import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SysosAppWmksComponent } from './sysos-app-wmks.component';

describe('SysosAppWmksComponent', () => {
  let component: SysosAppWmksComponent;
  let fixture: ComponentFixture<SysosAppWmksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SysosAppWmksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SysosAppWmksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
