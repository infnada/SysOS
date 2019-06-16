import {Component, Input, OnInit} from '@angular/core';
import {Application} from '../../../../interfaces/application';
import {Subscription} from 'rxjs';
import {SysOSFile} from '../../../../interfaces/file';
import {FileSystemUiService} from '../../../../services/file-system-ui.service';
import {DatastoreExplorerLocalService} from '../../services/datastore-explorer-local.service';

@Component({
  selector: 'app-datastore-explorer-actions-local',
  templateUrl: './datastore-explorer-actions-local.component.html',
  styleUrls: ['./datastore-explorer-actions-local.component.scss']
})
export class DatastoreExplorerActionsLocalComponent implements OnInit {
  @Input() application: Application;

  goPathBackSubscription: Subscription;
  goToPathSubscription: Subscription;

  currentPath: string;
  currentData: SysOSFile[];
  viewAsList: boolean;
  search: {filename: string} = null;

  lastPath: string[] = [];
  nextPath: string[] = [];

  constructor(private FileSystemUi: FileSystemUiService,
              private DatastoreExplorerLocal: DatastoreExplorerLocalService) {

    this.goPathBackSubscription = this.DatastoreExplorerLocal.getObserverGoPathBack().subscribe(() => {
      this.goPathBack();
    });

    this.goToPathSubscription = this.FileSystemUi.getObserverGoToPath().subscribe((data) => {
      if (data.application === 'datastore-explorer#local') this.goToPath(data.path);
    });
  }

  ngOnInit(): void {
    this.DatastoreExplorerLocal.currentPath.subscribe(path => this.currentPath = path);
    this.DatastoreExplorerLocal.currentData.subscribe(data => this.currentData = data);
    this.DatastoreExplorerLocal.viewAsList.subscribe(data => this.viewAsList = data);
    this.DatastoreExplorerLocal.search.subscribe(data => this.search = data);
  }

  /**
   * Creates a new folder
   */
  UIcreateFolder(): void {
    this.FileSystemUi.UIcreateFolder(null, this.currentPath, '.window--datastore-explorer .window__main');
  }

  /**
   * Sets view mode (icons, detailed...)
   */
  toggleView(): void {
    this.DatastoreExplorerLocal.toggleView();
  }

  /**
   * Get current path data
   */
  reloadPath(newPath?: string): void {
    this.DatastoreExplorerLocal.reloadPath(newPath);
    this.searchChange(null);
  }

  /**
   * Checks the last visited path and go to it
   */
  goPathBack(): void {
    if (this.lastPath.length === 0) return;
    const newPath = this.lastPath.pop();

    // Push the actual path to nextPath array (used by goPathForward())
    this.nextPath.push(this.currentPath);

    this.reloadPath(newPath);
  }

  /**
   * If called goPathBack this function goes a path forward
   */
  goPathForward(): void {
    if (this.nextPath.length === 0) return;
    const newPath = this.nextPath.pop();

    // Push the actual path to nextPath array (used by goPathForward())
    this.lastPath.push(this.currentPath);

    this.reloadPath(newPath);
  }

  /**
   * Go to any folders by a given path
   */
  goToPath(path: string|number): void {
    const newPath = (typeof path === 'string' ? path : this.currentPath.split('/').splice(0, path + 1).join('/') + '/');

    // Push the actual path to lastPath array (used by goPathBack()) when currentPath exists.
    // This happens when the application is opened for 1st time.
    if (typeof this.currentPath !== 'undefined') this.lastPath.push(this.currentPath);

    // Reset nextPath
    this.nextPath = [];

    this.reloadPath(newPath);
  }

  searchChange(event: string): void {
    this.DatastoreExplorerLocal.setSearch(event);
  }

}
