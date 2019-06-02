import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SftpBodyLocalComponent } from './sftp-body-local.component';

describe('SftpBodyLocalComponent', () => {
  let component: SftpBodyLocalComponent;
  let fixture: ComponentFixture<SftpBodyLocalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SftpBodyLocalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SftpBodyLocalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
