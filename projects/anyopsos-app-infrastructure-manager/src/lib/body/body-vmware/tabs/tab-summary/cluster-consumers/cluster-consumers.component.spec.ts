import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClusterConsumersComponent } from './cluster-consumers.component';

describe('ClusterConsumersComponent', () => {
  let component: ClusterConsumersComponent;
  let fixture: ComponentFixture<ClusterConsumersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClusterConsumersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClusterConsumersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
