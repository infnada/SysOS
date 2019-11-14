import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NodesErrorComponent } from './nodes-error.component';

describe('NodesErrorComponent', () => {
  let component: NodesErrorComponent;
  let fixture: ComponentFixture<NodesErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NodesErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NodesErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
