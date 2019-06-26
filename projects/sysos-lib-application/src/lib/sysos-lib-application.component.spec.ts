import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SysosLibApplicationComponent } from './sysos-lib-application.component';

describe('SysosLibApplicationComponent', () => {
  let component: SysosLibApplicationComponent;
  let fixture: ComponentFixture<SysosLibApplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SysosLibApplicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SysosLibApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
