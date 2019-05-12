import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WmksMenuComponent } from './wmks-menu.component';

describe('WmksMenuComponent', () => {
  let component: WmksMenuComponent;
  let fixture: ComponentFixture<WmksMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WmksMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WmksMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
