import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopologyOptionsComponent } from './topology-options.component';

describe('TopologyOptionsComponent', () => {
  let component: TopologyOptionsComponent;
  let fixture: ComponentFixture<TopologyOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopologyOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopologyOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
