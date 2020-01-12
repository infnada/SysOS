import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnyOpsOSLibFolderComponent } from './anyopsos-lib-folder.component';

describe('AnyOpsOSLibFolderComponent', () => {
  let component: AnyOpsOSLibFolderComponent;
  let fixture: ComponentFixture<AnyOpsOSLibFolderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnyOpsOSLibFolderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnyOpsOSLibFolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
