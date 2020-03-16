import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeStaticComponent } from './node-static.component';

describe('NodeStaticComponent', () => {
  let component: NodeStaticComponent;
  let fixture: ComponentFixture<NodeStaticComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NodeStaticComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeStaticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
