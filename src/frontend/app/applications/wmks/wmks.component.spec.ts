import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WmksComponent } from './wmks.component';

describe('WmksComponent', () => {
  let component: WmksComponent;
  let fixture: ComponentFixture<WmksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WmksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WmksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
