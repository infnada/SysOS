import {Component, ElementRef, Input, OnInit, AfterViewInit, ViewChild, ViewContainerRef, Compiler, ViewEncapsulation} from '@angular/core';
import {CdkDragRelease, CdkDragStart} from '@angular/cdk/drag-drop';

import {Subscription} from 'rxjs';
import {SysosLibLoggerService} from '@sysos/lib-logger';
import {ResizeEvent} from 'angular-resizable-element';

import {SysosLibApplicationService} from './sysos-lib-application.service';
import {Application} from './types/application';

@Component({
  selector: 'slapp-sysos-lib-application',
  templateUrl: './sysos-lib-application.component.html',
  styleUrls: ['./sysos-lib-application.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SysosLibApplicationComponent implements OnInit, AfterViewInit {
  @ViewChild('appElement') appElement: ElementRef;
  @ViewChild('appActions', { read: ViewContainerRef }) appActions;
  @ViewChild('appBody', { read: ViewContainerRef }) appBody;
  @ViewChild('appMenu', { read: ViewContainerRef }) appMenu;
  @ViewChild('appStatus', { read: ViewContainerRef }) appStatus;
  @Input() application: Application;

  closeAppSubscription: Subscription;
  togglingAppSubscription: Subscription;

  isClosing: boolean = false;
  isOpening: boolean = true;
  isMinimized: boolean = false;
  isMaximized: boolean = false;
  isMenuOpened: boolean = false;

  initialHeight: string;
  initialWidth: string;
  initialTop: string;
  initialLeft: string;

  currentHeight: string;
  currentWidth: string;
  currentTop: string;
  currentLeft: string;

  fullHeight: string = window.innerHeight - 48 + 'px';
  fullWidth: string = window.innerWidth + 'px';

  constructor(private compiler: Compiler,
              private logger: SysosLibLoggerService,
              private Applications: SysosLibApplicationService) {

    /**
     * broadcast functions
     */

    // Called from Task Bar Context Menu
    this.closeAppSubscription = this.Applications.getObserverCloseApplication().subscribe(application => {
      this.logger.debug('Applications', `Closing application [${application.id}]`);

      if (application.id === this.application.id) this.close();
    });

    this.togglingAppSubscription = this.Applications.getObserverToggleApplication().subscribe(id => {
      this.logger.debug('Applications', `Toggling application [${id}]`);

      // Called to minimize all applications
      if (id === null) return this.minimize();

      // Normal call
      if (id === this.application.id) {

        // Application minimized, set it active
        if (this.isMinimized) {
          this.Applications.toggleApplication(id);
          return this.isMinimized = false;
        }

        // Application opened but not active
        if (!this.Applications.isActiveApplication(id)) return this.Applications.toggleApplication(id);

        // Application is active, minimize it
        return this.minimize();
      }
    });
  }

  ngOnInit() {
    this.isOpening = false;

    this.currentHeight = this.application.style.height;
    this.currentWidth = this.application.style.width;
    this.currentTop = this.application.style.top;
    this.currentLeft = this.application.style.left;
  }

  ngAfterViewInit() {

    // the missing step, need to use Compiler to resolve the module's embedded components
    this.compiler.compileModuleAndAllComponentsAsync<any>(this.application.factory.moduleType)
      .then((factory) => {

        this.appActions.clear();
        this.appBody.clear();
        this.appMenu.clear();
        this.appStatus.clear();

        const actionsFactory = factory.componentFactories.filter((component) => {
          return component.componentType.name === 'ActionsComponent';
        })[0];
        const bodyFactory = factory.componentFactories.filter((component) => {
          return component.componentType.name === 'BodyComponent';
        })[0];

        const menuFactory = factory.componentFactories.filter((component) => {
          return component.componentType.name === 'MenuComponent';
        })[0];
        const statusFactory = factory.componentFactories.filter((component) => {
          return component.componentType.name === 'StatusComponent';
        })[0];

        if (actionsFactory) {
          const actionsComponentRef = this.appActions.createComponent(actionsFactory);
          (actionsComponentRef.instance as any).application = this.application;
        }

        if (bodyFactory) {
          const bodyComponentRef = this.appBody.createComponent(bodyFactory);
          (bodyComponentRef.instance as any).application = this.application;
        }

        if (menuFactory) {
          const menuComponentRef = this.appMenu.createComponent(menuFactory);
          (menuComponentRef.instance as any).application = this.application;
          (menuComponentRef.instance as any).isMenuOpened = this.isMenuOpened;
        }

        if (statusFactory) {
          const statusComponentRef = this.appStatus.createComponent(statusFactory);
          (statusComponentRef.instance as any).application = this.application;
        }

      });
  }

  onResize(event: ResizeEvent): void {
    // Set new element size
    this.currentHeight = `${event.rectangle.height}px`;
    this.currentWidth = `${event.rectangle.width}px`;
    this.currentTop = `${event.rectangle.top}px`;
    this.currentLeft = `${event.rectangle.left}px`;
  }

  onDrop(event: CdkDragRelease<string[]>): void {
    this.logger.debug('Applications', 'onDrop event');

    const bounding = this.appElement.nativeElement.getBoundingClientRect();

    // Maximise if application is outside of viewport
    const isInViewport = () => {
      return (
        bounding.top >= 0 &&
        bounding.left >= 0 &&
        bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    };

    if (!isInViewport()) return this.maximize();

    // Remove transform or resize will not work
    this.currentTop = `${bounding.top}px`;
    this.currentLeft = `${bounding.left}px`;
    this.appElement.nativeElement.style.transform = 'none';
  }

  onDragStart(event: CdkDragStart<string[]>): void {
    this.logger.debug('Applications', 'onDragStart event');
    this.Applications.toggleApplication(this.application.id);

    // $(this).css({'z-index' : zIndex++});

    if (this.isMaximized) {
      this.maximize();
    }
  }

  /*
   * ng-class functions
   */
  isVisible(): boolean {
    return this.Applications.isActiveApplication(this.application.id);
  }

  /*
   * (click) functions
   */
  focusApplication(): void {
    this.logger.debug('Applications', 'focusApplication event');
    if (this.Applications.isActiveApplication(this.application.id)) return;
    if (this.isMinimized) return;
    this.Applications.toggleApplication(this.application.id);
  }

  close(): void {
    this.logger.debug('Applications', 'close event');

    // Close this application
    this.isClosing = true;

    setTimeout(() => {
      this.isClosing = false;
      this.Applications.closeApplication(this.application.id);
      // hide $(parentWindow).hide()
    }, 500);

    // Close application in taskbar
    this.Applications.toggleApplication(null);

    // TODO: Set closest application active. Issue #3
    // var closest = $('.window').not('.window--minimized, .window--closing,
    // .window--opening').filter(function() { return $(this).css('z-index') < zIndex }).first();

    // $(closest).addClass('window--active');

    // Unsubscribe when application is closed
    this.togglingAppSubscription.unsubscribe();
    this.closeAppSubscription.unsubscribe();
  }

  minimize(): void {
    this.logger.debug('Applications', 'minimize event');
    this.isMinimized = true;
    this.Applications.toggleApplication(null);
  }

  maximize(): void {
    this.logger.debug('Applications', 'maximize event');
    this.isMaximized = !this.isMaximized;

    if (!this.isMaximized) {
      this.currentHeight = this.initialHeight;
      this.currentWidth = this.initialWidth;
      this.currentTop = this.initialTop;
      this.currentLeft = this.initialLeft;
    } else {
      this.initialHeight = this.appElement.nativeElement.offsetHeight + 'px';
      this.initialWidth = this.appElement.nativeElement.offsetWidth + 'px';
      this.initialTop = this.appElement.nativeElement.offsetTop + 'px';
      this.initialLeft = this.appElement.nativeElement.offsetLeft + 'px';

      this.currentHeight = this.fullHeight;
      this.currentWidth = this.fullWidth;
      this.currentTop = '0px';
      this.currentLeft = '0px';
      this.appElement.nativeElement.style.transform = 'none';
    }

  }

  toggleMenu(): void {
    this.isMenuOpened = !this.isMenuOpened;
  }

  onWindowsResize(event): void {
    this.fullHeight = event.target.innerHeight - 48 + 'px';
    this.fullWidth = event.target.innerWidth + 'px';

    if (this.isMaximized) {
      this.currentHeight = this.fullHeight;
      this.currentWidth = this.fullWidth;
      this.currentTop = '0px';
      this.currentLeft = '0px';
    }
  }

  setCurrentHoverApplication(app: string) {
    this.Applications.setCurrentHoverApplication(app);
  }

  appCss(): { height: string, width: string, top: string, left: string } {
    return {
      height: this.currentHeight,
      width: this.currentWidth,
      top: this.currentTop,
      left: this.currentLeft
    };
  }

}
