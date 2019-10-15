import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdgeContainerComponent } from './edge-container.component';

describe('EdgeContainerComponent', () => {
  let component: EdgeContainerComponent;
  let fixture: ComponentFixture<EdgeContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdgeContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdgeContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
