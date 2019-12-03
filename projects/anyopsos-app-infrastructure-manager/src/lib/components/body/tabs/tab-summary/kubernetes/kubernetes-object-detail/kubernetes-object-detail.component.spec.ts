import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KubernetesObjectDetailComponent } from './kubernetes-object-detail.component';

describe('KubernetesObjectDetailComponent', () => {
  let component: KubernetesObjectDetailComponent;
  let fixture: ComponentFixture<KubernetesObjectDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KubernetesObjectDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KubernetesObjectDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
