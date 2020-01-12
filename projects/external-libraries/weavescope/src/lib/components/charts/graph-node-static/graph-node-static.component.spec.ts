import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphNodeStaticComponent } from './graph-node-static.component';

describe('GraphNodeStaticComponent', () => {
  let component: GraphNodeStaticComponent;
  let fixture: ComponentFixture<GraphNodeStaticComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphNodeStaticComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphNodeStaticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
