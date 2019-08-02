import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomAttributesComponent } from './custom-attributes.component';

describe('CustomAttributesComponent', () => {
  let component: CustomAttributesComponent;
  let fixture: ComponentFixture<CustomAttributesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomAttributesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomAttributesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
