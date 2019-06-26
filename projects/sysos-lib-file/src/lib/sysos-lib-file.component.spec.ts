import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SysosLibFileComponent } from './sysos-lib-file.component';

describe('SysosLibFileComponent', () => {
  let component: SysosLibFileComponent;
  let fixture: ComponentFixture<SysosLibFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SysosLibFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SysosLibFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
