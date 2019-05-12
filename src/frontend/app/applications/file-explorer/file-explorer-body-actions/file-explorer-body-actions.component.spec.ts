import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileExplorerBodyActionsComponent } from './file-explorer-body-actions.component';

describe('FileExplorerBodyActionsComponent', () => {
  let component: FileExplorerBodyActionsComponent;
  let fixture: ComponentFixture<FileExplorerBodyActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileExplorerBodyActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileExplorerBodyActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
