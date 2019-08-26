import {Component, OnInit, ViewContainerRef} from '@angular/core';

import {CookieService} from 'ngx-cookie-service';
import {SysosLibLoggerService} from '@sysos/lib-logger';

import {SysosLibUserService} from '@sysos/lib-user';
import {SysosLibModalService} from '@sysos/lib-modal';
import {Application} from '@sysos/lib-application';

import {MainService} from './services/main.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  openedApplications: Application[];
  userLoggedIn: boolean;
  appBootstrapped: boolean;

  constructor(private viewContainerRef: ViewContainerRef,
              private cookieService: CookieService,
              private logger: SysosLibLoggerService,
              private Main: MainService,
              private Modal: SysosLibModalService,
              private UserState: SysosLibUserService) {

    this.Modal.setMainContainerRef(this.viewContainerRef);
  }

  ngOnInit() {
    this.logger.info('SysOS', 'Initializing APP', null);
    this.Main.currentBootstrapState.subscribe(state => this.appBootstrapped = state.appBootstrapped);
    this.UserState.currentState.subscribe(state => this.userLoggedIn = state.userLoggedIn);

    if (this.cookieService.check('uniqueId')) {

      this.logger.debug('SysOS', 'Getting session', null);
      this.UserState.getSession().subscribe(
        (res: { status: string }) => {
          if (res.status === 'ok') {
            this.logger.info('SysOS', 'Getting session -> User logged in', null);
            this.UserState.setState({
              userLoggedIn: true,
              username: 'root'
            });

            /**
             * INIT
             */
            this.Main.init();
          }

          if (res.status === 'error') {
            this.logger.debug('SysOS', 'Getting session -> Removing uniqueId cookie', null);
            return this.cookieService.delete('uniqueId');
          }
        },
        error => {
          this.logger.error('SysOS', 'Error while getting session', null, error);
        });

    }
  }
}
