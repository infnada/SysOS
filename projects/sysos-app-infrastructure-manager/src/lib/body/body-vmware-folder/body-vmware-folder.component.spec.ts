import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyVmwareFolderComponent } from './body-vmware-folder.component';

describe('BodyVmwareFolderComponent', () => {
  let component: BodyVmwareFolderComponent;
  let fixture: ComponentFixture<BodyVmwareFolderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BodyVmwareFolderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BodyVmwareFolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
