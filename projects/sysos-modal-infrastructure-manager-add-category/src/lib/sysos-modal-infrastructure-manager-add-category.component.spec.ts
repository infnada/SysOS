import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SysosModalInfrastructureManagerAddCategoryComponent } from './sysos-modal-infrastructure-manager-add-category.component';

describe('SysosModalInfrastructureManagerAddCategoryComponent', () => {
  let component: SysosModalInfrastructureManagerAddCategoryComponent;
  let fixture: ComponentFixture<SysosModalInfrastructureManagerAddCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SysosModalInfrastructureManagerAddCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SysosModalInfrastructureManagerAddCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
