import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SysosLibFolderComponent } from './sysos-lib-folder.component';

describe('SysosLibFolderComponent', () => {
  let component: SysosLibFolderComponent;
  let fixture: ComponentFixture<SysosLibFolderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SysosLibFolderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SysosLibFolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
