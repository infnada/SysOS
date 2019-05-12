import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SftpMenuComponent } from './sftp-menu.component';

describe('SftpMenuComponent', () => {
  let component: SftpMenuComponent;
  let fixture: ComponentFixture<SftpMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SftpMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SftpMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
