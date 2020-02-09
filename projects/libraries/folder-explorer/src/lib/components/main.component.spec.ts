import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FolderExplorerMainComponent } from './main.component';

describe('FolderExplorerComponent', () => {
  let component: FolderExplorerMainComponent;
  let fixture: ComponentFixture<FolderExplorerMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FolderExplorerMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FolderExplorerMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
