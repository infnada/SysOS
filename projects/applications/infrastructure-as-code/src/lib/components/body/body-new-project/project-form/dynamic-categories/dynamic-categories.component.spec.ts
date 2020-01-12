import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicCategoriesComponent } from './dynamic-categories.component';

describe('DynamicCategoriesComponent', () => {
  let component: DynamicCategoriesComponent;
  let fixture: ComponentFixture<DynamicCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
