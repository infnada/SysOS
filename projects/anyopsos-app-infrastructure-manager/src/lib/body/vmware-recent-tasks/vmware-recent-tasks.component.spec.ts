import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VmwareRecentTasksComponent } from './vmware-recent-tasks.component';

describe('VmwareRecentTasksComponent', () => {
  let component: VmwareRecentTasksComponent;
  let fixture: ComponentFixture<VmwareRecentTasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VmwareRecentTasksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VmwareRecentTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
