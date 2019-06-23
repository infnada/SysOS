import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SysosAppBackupsManagerComponent } from './sysos-app-backups-manager.component';

describe('SysosAppBackupsManagerComponent', () => {
  let component: SysosAppBackupsManagerComponent;
  let fixture: ComponentFixture<SysosAppBackupsManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SysosAppBackupsManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SysosAppBackupsManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
