import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopologiesComponent } from './topologies.component';

describe('TopologiesComponent', () => {
  let component: TopologiesComponent;
  let fixture: ComponentFixture<TopologiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopologiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopologiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
