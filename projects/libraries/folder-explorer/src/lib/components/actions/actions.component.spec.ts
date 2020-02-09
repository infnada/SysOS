import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FolderExplorerActionsComponent } from './actions.component';

describe('FolderExplorerActionsComponent', () => {
  let component: FolderExplorerActionsComponent;
  let fixture: ComponentFixture<FolderExplorerActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FolderExplorerActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FolderExplorerActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
