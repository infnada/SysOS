import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SftpBodyComponent } from './sftp-body.component';

describe('SftpBodyComponent', () => {
  let component: SftpBodyComponent;
  let fixture: ComponentFixture<SftpBodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SftpBodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SftpBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
