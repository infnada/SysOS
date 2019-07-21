import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyVmwareResourcePoolComponent } from './body-vmware-resource-pool.component';

describe('BodyVmwareResourcePoolComponent', () => {
  let component: BodyVmwareResourcePoolComponent;
  let fixture: ComponentFixture<BodyVmwareResourcePoolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BodyVmwareResourcePoolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BodyVmwareResourcePoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
