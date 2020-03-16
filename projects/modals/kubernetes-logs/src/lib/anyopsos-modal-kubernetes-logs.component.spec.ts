import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnyopsosModalKubernetesLogsComponent } from './anyopsos-modal-kubernetes-logs.component';

describe('AnyopsosModalKubernetesLogsComponent', () => {
  let component: AnyopsosModalKubernetesLogsComponent;
  let fixture: ComponentFixture<AnyopsosModalKubernetesLogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnyopsosModalKubernetesLogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnyopsosModalKubernetesLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
