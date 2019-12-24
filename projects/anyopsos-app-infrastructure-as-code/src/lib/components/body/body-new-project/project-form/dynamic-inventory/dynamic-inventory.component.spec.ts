import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicInventoryComponent } from './dynamic-inventory.component';

describe('DynamicInventoryComponent', () => {
  let component: DynamicInventoryComponent;
  let fixture: ComponentFixture<DynamicInventoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicInventoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
