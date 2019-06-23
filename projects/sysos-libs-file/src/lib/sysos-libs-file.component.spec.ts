import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SysosLibsFileComponent } from './sysos-libs-file.component';

describe('SysosLibsFileComponent', () => {
  let component: SysosLibsFileComponent;
  let fixture: ComponentFixture<SysosLibsFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SysosLibsFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SysosLibsFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
