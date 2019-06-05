import {Component, OnInit, ViewContainerRef} from '@angular/core';

import {CookieService} from 'ngx-cookie-service';
import {NGXLogger} from 'ngx-logger';

import {UserStateService} from './services/user-state.service';
import {MainService} from './services/main.service';
import {ModalService} from './services/modal.service';

import {Application} from './interfaces/application';

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
              private Modal: ModalService,
              private UserState: UserStateService) {

    this.Modal.setMainContainerRef(this.viewContainerRef);
  }

  ngOnInit() {
    this.logger.debug('[SysOS] Initializing APP');
    this.UserState.currentState.subscribe(state => this.userLoggedIn = state.userLoggedIn);

    if (this.cookieService.check('uniqueId')) {

      this.logger.debug('[SysOS] Getting session');
      this.UserState.getSession().subscribe(
        (res: { status: string }) => {
          if (res.status === 'ok') {
            this.logger.debug('[SysOS] Getting session -> User logged in');
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