import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SysosModalEsxiSelectableComponent } from './sysos-modal-esxi-selectable.component';

describe('SysosModalEsxiSelectableComponent', () => {
  let component: SysosModalEsxiSelectableComponent;
  let fixture: ComponentFixture<SysosModalEsxiSelectableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SysosModalEsxiSelectableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SysosModalEsxiSelectableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
