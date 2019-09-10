import {Component, Input, OnInit} from '@angular/core';

import {Application} from '@sysos/lib-application';
import {SysosLibVmwareService} from '@sysos/lib-vmware';

@Component({
  selector: 'sawmks-sysos-app-wmks',
  template: `
    <p>
      sysos-app-wmks works!
    </p>
  `,
  styles: []
})
export class SysosAppWmksComponent implements OnInit {
  @Input() application: Application;

  constructor(private VMWare: SysosLibVmwareService) { }

  ngOnInit() {
    if (this.application.initData) {
      return this.VMWare.connectvCenterSoap(this.application.initData.connection).then((connectSoapResult) => {
        if (connectSoapResult.status === 'error') throw {error: connectSoapResult.error, description: 'Failed to connect to vCenter'};

        return this.VMWare.AcquireTicket(
          this.application.initData.connection,
          {$type: 'VirtualMachine', _value: this.application.initData.vm.info.obj.name},
          'webmks'
        );

      }).then((acquireTicketResult) => {
        if (acquireTicketResult.status === 'error') throw {error: acquireTicketResult.error, description: 'Failed to acquire VM ticket'};


        /*$(function() {

          function layout() {
            var w = $(window).width();
            var h = $(window).height();
            if(!wmks.isFullScreen()) {
              container.css({
                top: bar.outerHeight() + "px"
              });
              container.width(w).height(h - bar.outerHeight());
              wmks.updateScreen();
            } else {
              container.css({
                top: 0,
                left: 0
              });
              container.width(w).height(h);
            }
          }

          function showMessage(message) {
            container.html(message);
            bar.slideDown("fast", layout);
            spinner.hide();
          }

          function getKeyboardLayout() {
            var locale = "ca-ES".
            replace("-", "_");
            switch (locale) {
              case "de": case "de_DE":
                return "de-DE";
              case "de_CH":
                return "de-CH";
              case "ja": case "ja_JP":
                return "ja-JP_106/109";
              case "it": case "it_IT":
                return "it-IT";
              case "es": case "es_ES":
                return "es-ES";
              case "pt": case "pt_PT":
                return "pt-PT";
              case "fr": case "fr_FR":
                return "fr-FR";
              case "fr_CH":
                return "fr-CH";
              default:
                return "en-US";
            }
          }

          var bar = $("#bar");
          var cad = $("#cad");
          var container = $("#container");
          var fullscreen = $("#fullscreen");
          var keyboard = $("#keyboard");
          var spinner = $("#spinner");

          var wmks = WMKS.createWMKS("container", {
            keyboardLayoutId: getKeyboardLayout()
          });
          wmks.register(WMKS.CONST.Events.CONNECTION_STATE_CHANGE, function(evt, data) {
            switch (data.state) {
              case WMKS.CONST.ConnectionState.CONNECTING:
                console.log("The console is connecting");
                bar.slideUp("slow", layout);
                break;
              case WMKS.CONST.ConnectionState.CONNECTED:
                console.log("The console has been connected");
                spinner.hide();
                bar.slideDown("fast", layout);
                break;
              case WMKS.CONST.ConnectionState.DISCONNECTED:
                console.log("The console has been disconnected");
                showMessage("The console has been disconnected. Close this window and re-launch the console to reconnect.");
                break;
            }
          });
          wmks.register(WMKS.CONST.Events.ERROR, function(evt, data) {
            console.log("Error: " + data.errorType);
          });
          wmks.register(WMKS.CONST.Events.REMOTE_SCREEN_SIZE_CHANGE, function(evt, data) {
            layout();
          });

          cad.on("click", function() {
            wmks.sendCAD();
          });

          if (wmks.canFullScreen()) {
            fullscreen.on("click", function (evt) {
              wmks.enterFullScreen();
            });
          } else {
            fullscreen.hide();
          }

          keyboard.on("click", function (evt) {
            var fixANSIEquivalentKeys = keyboard.data("toggle") === "true";
            var label = keyboard.html();
            wmks.setOption("fixANSIEquivalentKeys", !fixANSIEquivalentKeys);
            keyboard.html(keyboard.data("alt"));
            keyboard.data("toggle", !fixANSIEquivalentKeys);
            keyboard.data("alt", label);
          });

          //listen for window events
          $(window).on("resize", layout);

          // if params are provided, no need to show chrome
          if (location.search) {
            var loc = document.location;
            var path = loc.host + loc.pathname.replace(/\.html$/, "");
            wmks.connect("wss://" + path + "/authd?" +
              "host=192.168.1.2" +
              "&port=902" +
              "&cfgFile=%2Fvmfs%2Fvolumes%2F5c8e34e7-6ec9bcbb-ab32-000c293c7458%2Frh7%2Frh7.vmx" +
              "&thumbprint=31:14:CF:A6:C4:E1:1B:74:88:2E:55:A3:68:76:26:C6:21:22:E3:4E" +
              "&ticket=52a194e9-0db2-057b-d556-eb3196f3b859" +
              "&vmId=vm-121" +
              "&encoding=UTF-8");
            layout();
            spinner.show();
          }
        });


        var _wmks = $('#wmksContainer')
          .wmks({'useVNCHandshake': false, 'sendProperMouseWheelDeltas': true, 'fitToParent': true})
          .bind('wmksconnecting', function () {
            console.log('The console is connecting');
          })
          .bind('wmksconnected', function () {
            console.log('The console has been connected');
          })
          .bind('wmksdisconnected', function (evt, info) {
            console.log('The console has been disconnected');
            console.log(evt, info);
          })
          .bind('wmkserror', function (evt, errObj) {
            console.log('Error!');
            console.log(evt, errObj);
            toastr.error('Make sure that you have access to ESXi host (' + res.data.host[0] + ':' + res.data.port[0] + ') and it\'s certificate is trusted',
            'Unable to open remote console to VM (' + wmksData.vm + ')');
          })
          .bind('wmksiniterror', function (evt, customData) {
            console.log(evt);
            console.log(customData);
          })
          .bind('wmksresolutionchanged', function (canvas) {
            console.log('Resolution has changed!');
          });

        _this.url = 'wss://' + res.data.host[0] + ':' + res.data.port[0] + '/ticket/' + res.data.ticket[0];
        _wmks.wmks('connect', _this.url);*/

      });
    }
  }

}
