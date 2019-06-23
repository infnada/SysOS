import {Component, OnInit, ViewContainerRef} from '@angular/core';

import {CookieService} from 'ngx-cookie-service';
import {NGXLogger} from 'ngx-logger';

import {SysosLibsUserService} from '@sysos/libs-user';
import {SysosLibsModalService} from '@sysos/libs-modal';
import {Application} from '@sysos/libs-application';

import {MainService} from './services/main.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  openedApplications: Application[];
  userLoggedIn: boolean;

  constructor(private viewContainerRef: ViewContainerRef,
              private cookieService: CookieService,
              private logger: NGXLogger,
              private Main: MainService,
              private Modal: SysosLibsModalService,
              private UserState: SysosLibsUserService) {

    this.Modal.setMainContainerRef(this.viewContainerRef);
  }

  ngOnInit() {
    this.logger.info('[SysOS] Initializing APP');
    this.UserState.currentState.subscribe(state => this.userLoggedIn = state.userLoggedIn);

    if (this.cookieService.check('uniqueId')) {

      this.logger.debug('[SysOS] Getting session');
      this.UserState.getSession().subscribe(
        (res: { status: string }) => {
          if (res.status === 'ok') {
            this.logger.info('[SysOS] Getting session -> User logged in');
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
            this.logger.debug('[SysOS] Getting session -> Removing uniqueId cookie');
            return this.cookieService.delete('uniqueId');
          }
        },
        error => {
          this.logger.error('[SysOS] Getting session -> ', error);
        });

    }
  }
}
