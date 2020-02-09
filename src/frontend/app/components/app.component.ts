import {Component, OnInit, ViewContainerRef} from '@angular/core';

import {CookieService} from 'ngx-cookie-service';

import {AnyOpsOSLibLoggerService} from '@anyopsos/lib-logger';
import {AnyOpsOSLibUserService} from '@anyopsos/lib-user';
import {AnyOpsOSLibModalService} from '@anyopsos/lib-modal';
import {BackendResponse} from '@anyopsos/backend/app/types/backend-response';

import {MainService} from '../services/main.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  userLoggedIn: boolean;
  appBootstrapped: boolean;

  constructor(private viewContainerRef: ViewContainerRef,
              private cookieService: CookieService,
              private logger: AnyOpsOSLibLoggerService,
              private Main: MainService,
              private readonly LibModal: AnyOpsOSLibModalService,
              private UserState: AnyOpsOSLibUserService) {

    this.LibModal.setMainContainerRef(this.viewContainerRef);
  }

  ngOnInit(): void {
    this.logger.info('anyOpsOS', 'Initializing APP', null);
    this.Main.currentBootstrapState.subscribe(state => this.appBootstrapped = state.appBootstrapped);
    this.UserState.currentState.subscribe(state => this.userLoggedIn = state.userLoggedIn);

    if (this.cookieService.check('uniqueId')) {

      this.logger.debug('anyOpsOS', 'Getting session', null);
      this.UserState.getSession().subscribe(
        (res: BackendResponse) => {
          if (res.status === 'error') {
            this.logger.debug('anyOpsOS', 'Getting session -> Removing uniqueId cookie', null);
            return this.cookieService.delete('uniqueId');
          }

          this.logger.info('anyOpsOS', 'Getting session -> User logged in', null);
          this.UserState.setState({
            userLoggedIn: true,
            username: 'root'
          });

          /**
           * INIT
           */
          this.Main.init();
        },
        (error: BackendResponse) => {
          this.logger.debug('anyOpsOS', 'Getting session -> Removing uniqueId cookie', null, error);
          return this.cookieService.delete('uniqueId');
        });

    }
  }
}
