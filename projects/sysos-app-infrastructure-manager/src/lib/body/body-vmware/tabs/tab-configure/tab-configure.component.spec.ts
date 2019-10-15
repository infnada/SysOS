import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabConfigureComponent } from './tab-configure.component';

describe('TabConfigureComponent', () => {
  let component: TabConfigureComponent;
  let fixture: ComponentFixture<TabConfigureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabConfigureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabConfigureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
