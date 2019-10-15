import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SysosLibExtWeavescopeComponent } from './sysos-lib-ext-weavescope.component';

describe('SysosLibExtWeavescopeComponent', () => {
  let component: SysosLibExtWeavescopeComponent;
  let fixture: ComponentFixture<SysosLibExtWeavescopeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SysosLibExtWeavescopeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SysosLibExtWeavescopeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
