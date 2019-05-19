import {Component, OnInit, ViewContainerRef} from '@angular/core';

import { CookieService } from 'ngx-cookie-service';

import {UserStateService} from "./services/user-state.service";
import {MainService} from "./services/main.service";
import {ModalService} from "./services/modal.service";

import {Application} from "./interfaces/application";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  openedApplications: Application[];
  userLoggedIn: boolean;

  constructor(private ViewContainerRef: ViewContainerRef,
              private cookieService: CookieService,
              private MainService: MainService,
              private ModalService: ModalService,
              private UserStateService: UserStateService) {

    this.ModalService.setMainContainerRef(this.ViewContainerRef);

  }

  ngOnInit() {
    this.UserStateService.currentState.subscribe(state => this.userLoggedIn = state.userLoggedIn);

    if (this.cookieService.check('uniqueId')) {

      this.UserStateService.getSession().subscribe(
        (res: { status: string }) => {
          if (res.status === 'ok') {
            this.UserStateService.setState({
              userLoggedIn: true,
              username: "root"
            });

            /**
             * INIT
             */
            this.MainService.init();

          }

          if (res.status === 'error') {
            console.debug('SysOS -> Removing uniqueId cookie');
            return this.cookieService.delete('uniqueId')
          }

          console.log(res);
        },
        error => {
          console.error(error);
        });

    }
  }

}
