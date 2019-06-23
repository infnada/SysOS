import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskBarItemsComponent } from './task-bar-items.component';

describe('TaskBarItemsComponent', () => {
  let component: TaskBarItemsComponent;
  let fixture: ComponentFixture<TaskBarItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskBarItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskBarItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
