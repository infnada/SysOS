import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SysosLibsApplicationComponent } from './sysos-libs-application.component';

describe('SysosLibsApplicationComponent', () => {
  let component: SysosLibsApplicationComponent;
  let fixture: ComponentFixture<SysosLibsApplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SysosLibsApplicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SysosLibsApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
