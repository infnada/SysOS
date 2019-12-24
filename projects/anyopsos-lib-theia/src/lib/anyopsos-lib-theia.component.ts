import {AfterViewInit, Component, ElementRef, ViewChild, ViewEncapsulation} from '@angular/core';

import * as reflectMetadata from 'reflect-metadata';
import { Container, ContainerModule } from 'inversify';
import { FrontendApplication } from '@theia/core/lib/browser';
import { frontendApplicationModule } from '@theia/core/lib/browser/frontend-application-module';
import { messagingFrontendModule } from '@theia/core/lib/browser/messaging/messaging-frontend-module';
import { loggerFrontendModule } from '@theia/core/lib/browser/logger-frontend-module';
import { ThemeService } from '@theia/core/lib/browser/theming';
import { FrontendApplicationConfigProvider } from '@theia/core/lib/browser/frontend-application-config-provider';

import browserMenuModule from '@theia/core/lib/browser/menu/browser-menu-module';
import browserWindowModule from '@theia/core/lib/browser/window/browser-window-module';
import browserKeyboardModule from '@theia/core/lib/browser/keyboard/browser-keyboard-module';

@Component({
  selector: 'sltheia-theia',
  templateUrl: './anyopsos-lib-theia.component.html',
  styleUrls: ['./anyopsos-lib-theia.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AnyOpsOSLibTheiaComponent implements AfterViewInit {
  @ViewChild('theia', {static: false}) theiaRef: ElementRef;

  ngAfterViewInit() {
    console.log(reflectMetadata);
    this.runApplication(this.theiaRef.nativeElement);
  }

  runApplication(appElement: HTMLElement) {

    FrontendApplicationConfigProvider.set({
      applicationName: 'test',
      "preferences": {
        "files.enableTrash": false,
        "editor.minimap.enabled": false
      }
    });

    const container = new Container();
    container.load(frontendApplicationModule);
    container.load(messagingFrontendModule);
    container.load(loggerFrontendModule);

    container.load(browserMenuModule);
    container.load(browserWindowModule);
    container.load(browserKeyboardModule);

    container.load(getFrontendModule(appElement));

    const themeService = ThemeService.get();
    themeService.loadUserTheme();

    const application = container.get(FrontendApplication);
    application.start();

    function getFrontendModule(element: HTMLElement) {
      return new ContainerModule((bind, unbind, isBound, rebind) => {
        class MyFrontendApplication extends FrontendApplication {
          protected getHost(): Promise<HTMLElement> {
            if (element != null) {
              return Promise.resolve(element);
            }
            throw new Error("Couldn't find container")
          }
        }

        rebind(FrontendApplication).to(MyFrontendApplication).inSingletonScope();
      });
    }
  }

}
