import {AfterViewInit, Component, Input} from '@angular/core';

import {Application} from '@anyopsos/lib-application';
import {AnyOpsOSLibVmwareService} from '@anyopsos/lib-vmware';

import {AnyOpsOSLibExtJqueryService} from '@anyopsos/lib-ext-jquery';

import {WmksLib} from './trdParty/wmks';

@Component({
  selector: 'sawmks-anyopsos-app-wmks',
  templateUrl: './anyopsos-app-wmks.component.html',
  styleUrls: ['./anyopsos-app-wmks.component.scss']
})
export class BodyComponent implements AfterViewInit {
  @Input() application: Application;

  private WMKS: any;
  private wmks;
  isEnforcingKeyboard: boolean = false;
  isFullScreen: boolean = false;
  hideFullScreen: boolean = true;
  message: string;
  hideSpinner: boolean;

  constructor(private jQuery: AnyOpsOSLibExtJqueryService,
              private VMWare: AnyOpsOSLibVmwareService) {

    this.WMKS = WmksLib(jQuery.$);

    console.log(this.WMKS);
  }

  layout(): void {
    this.isFullScreen = this.wmks.isFullScreen();
  }

  private showMessage(message: string): void {
    this.message = message;
  }

  private getKeyboardLayout(): string {
    const locale = "ca-ES".replace("-", "_");
    switch (locale) {
      case "de":
      case "de_DE":
        return "de-DE";
      case "de_CH":
        return "de-CH";
      case "ja":
      case "ja_JP":
        return "ja-JP_106/109";
      case "it":
      case "it_IT":
        return "it-IT";
      case "es":
      case "es_ES":
        return "es-ES";
      case "pt":
      case "pt_PT":
        return "pt-PT";
      case "fr":
      case "fr_FR":
        return "fr-FR";
      case "fr_CH":
        return "fr-CH";
      default:
        return "en-US";
    }
  }

  sendCad() {
    this.wmks.sendCAD();
  }

  enterFullScreen() {
    this.wmks.enterFullScreen();
  }

  toggleEnforce() {
    this.isEnforcingKeyboard = !this.isEnforcingKeyboard;
    this.wmks.setOption("fixANSIEquivalentKeys", this.isEnforcingKeyboard);
  }

  ngAfterViewInit() {
    if (this.application.initData) {
      console.log(this.application.initData);
      this.VMWare.connectvCenterSoap(this.application.initData.connection).then((connectSoapResult) => {
        if (connectSoapResult.status === 'error') throw {
          error: connectSoapResult.error,
          description: 'Failed to connect to vCenter'
        };

        return this.VMWare.AcquireTicket(
          this.application.initData.connection,
          {$type: 'VirtualMachine', _value: this.application.initData.vm.info.obj.name},
          'webmks'
        );

      }).then((acquireTicketResult) => {
        if (acquireTicketResult.status === 'error') throw {
          error: acquireTicketResult.error,
          description: 'Failed to acquire VM ticket'
        };

        this.wmks = this.WMKS.createWMKS("container", {
          keyboardLayoutId: this.getKeyboardLayout()
        });

        console.log(this.wmks);
        this.wmks.register(this.WMKS.CONST.Events.CONNECTION_STATE_CHANGE, (evt, data) => {
          switch (data.state) {
            case this.WMKS.CONST.ConnectionState.CONNECTING:
              console.log("The console is connecting");
              break;
            case this.WMKS.CONST.ConnectionState.CONNECTED:
              console.log("The console has been connected");
              this.hideSpinner = true;
              break;
            case this.WMKS.CONST.ConnectionState.DISCONNECTED:
              console.log("The console has been disconnected");
              this.showMessage("The console has been disconnected. Close this window and re-launch the console to reconnect.");
              break;
          }
        });
        this.wmks.register(this.WMKS.CONST.Events.ERROR, (evt, data) => {
          console.log("Error: " + data.errorType);
        });
        this.wmks.register(this.WMKS.CONST.Events.REMOTE_SCREEN_SIZE_CHANGE, (evt, data) => {
          this.layout();
        });

        if (this.wmks.canFullScreen()) this.hideFullScreen = false;

        const url = 'wss://' + acquireTicketResult.data.host[0] + ':' + acquireTicketResult.data.port[0] + '/ticket/' + acquireTicketResult.data.ticket[0];
        this.wmks.connect(url);
        this.layout();
        this.hideSpinner = false;

        // if params are provided, no need to show chrome
        /*if (location.search) {
          var loc = document.location;
          var path = loc.host + loc.pathname.replace(/\.html$/, "");
          this.wmks.connect("wss://" + path + "/authd?" +
            "host=192.168.1.2" +
            "&port=902" +
            "&cfgFile=%2Fvmfs%2Fvolumes%2F5c8e34e7-6ec9bcbb-ab32-000c293c7458%2Flabvcenter01%2Flabvcenter01.vmx" +
            "&thumbprint=31:14:CF:A6:C4:E1:1B:74:88:2E:55:A3:68:76:26:C6:21:22:E3:4E" +
            "&ticket=52fa975c-9b68-a541-3671-a64b5eb6cb51" +
            "&vmId=vm-18" +
            "&encoding=UTF-8");
        }*/

      });
    }

  }

}
