import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyKubernetesComponent } from './body-kubernetes.component';

describe('BodyKubernetesComponent', () => {
  let component: BodyKubernetesComponent;
  let fixture: ComponentFixture<BodyKubernetesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BodyKubernetesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BodyKubernetesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
