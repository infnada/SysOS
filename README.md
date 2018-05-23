# SysOS

> **_This is a SUPER Alpha release, do not use on production environment._**

SysOS started as a fun/test project and I realized that it can be a good tool to manage my GNU/Linux infrastructure. But finally I opted to do something which not require any Agent to **manage the whole infrastructure of a business**.

The main purpose is the ability to do **disaster recovery tasks, monitor, install and preconfigure any kind of service** like Apache, SMTP, LDAP... on a GNU/Linux system, and of course, manage the system itself; Firewall, IDS, PCI compliance...

## Requirements
All tests are done with nodejs >= 6.0 as backend on:
- Windows 10 -> Running over Git bash
- Centos 7
- Linux subsystem for Windows -> Ubuntu

All infrastructure management test are done over:
- Centos 7
- vCenter 6.5
- NetApp FAS2552 with ONTAP 9.1P10
- NetApp FAS2220 with ONTAP 9.1P10

As a client:
- Right now Chrome is the only tested browser but should work with latest versions of any browser.

## Installation

- Download this repo. Then;

`npm install`

`npm start`

- Go with your browser at:

`http://localhost/index.html`

## Configuration

- How to change the default server port (80):

Edit the main expressjs file located at `/dist/server/filesystem/etc/expressjs/config.json` and change `listen.port` option "80"

## Currently installed applications

![alt text](https://isartnavarro.io/img/SysOS/smanager_app.png "Infrastructure Manager app")

- Credentials Manager
    - Manage all your SysOS credentials to use in other installed applications.
- Infrastructure Manager
    - Agent free!
    - Manage and monitor your VMware vCenter/ESXi nodes and VMs.
    - Manage and monitor your NetApp storage.
    - Manage and monitor all your standalone nodes (Linux, Windows and SNMP).
- VMware Remote Console
    - Connect to any managed Virtual Machine!
- Backups Manager
    - Agent free!
    - Restore NetApp Snapshots into Instant Virtual Machines.
    - Restore VM Guest files from NetApp Snapshots.
    - Mount NetApp Snapshots into your managed ESXi hosts.
    - Restore vCenter Datastore files from NetApp Snapshots.
    - Create Backup Jobs
        - NetApp Snapshots/SnapMirror/SnapVault of your vCenter/ESXi infrastructure
        - Mysql
- Datastore Explorer
    - Manage VMware Datastore files
- File Explorer
    - Manage all your SysOS files
    - Download files to SysOS from URL
    - Download SysOS files to your local OS.
- SFTP
    - Download/upload files to any SFTP server (SSH).
    - Execute scripts in remote nodes.
    - Download files from URL to remote nodes
- SSH shell
    - Connect to any SSH server instance.
- Alerts
    - Monitor in real time of all managed nodes (physical and virtual)

![alt text](https://isartnavarro.io/img/SysOS/sftp_app.png "SFTP app")

## Create custom applications

> In this example we will use "demo" as application name. You can find the sample file on `/docs/samples/application__demo.min.js`

All applications can contain 4 different sections.
- Menu
- Actions
- Body*
- Status

\* Mandatory

- You should create a new module and then register it to SysOS. The module has to be named as "[appName]App".

```javascript
var demoApp = angular.module('demoApp', []);
```

```javascript
demoApp.run(['ApplicationsFactory', function (ApplicationsFactory) {
    ApplicationsFactory.registerApplication({
        id: "demo", // Application id
        ico: "upload", // Font-Awesome icon to use
        name: "Demo", // Application name
        menu: true, // This app will have a menu?
        actions: true, // This app will have a actions bar?
        status: true, // This app will have a status bar?
        style: "width:1275px;height:600px;top:9%;left:10%;" // Define initial position when opened
    });
}]);
```

- Create the application -menu- template. The template has to be named as "menu-[appName]"

```javascript
demoApp.run(['$templateCache', function ($templateCache) {
    $templateCache.put('templates/applications/menu-demo.html',
        '<li> \
            <a ><i class="menu__icon fa fa-share-alt"></i> Share</a> \
        </li> \
        <li class="divided"> \
            <a ><i class="menu__icon fa fa-file"></i> Format</a> \
        </li> \
        <li> \
            <a ><i class="menu__icon fa fa-cog"></i> Settings </a> \
        </li>'
    );
}]);
```

- Create the application -actions bar- template. The template has to be named as "actions-[appName]"

```javascript
demoApp.run(['$templateCache', function ($templateCache) {
    $templateCache.put('templates/applications/actions-demo.html',
        '<div class="window__actions" ng-controller="demoActionController as demoA"> \
            <a class="window__item" ng-click="demoA.doSometing()"> \
                <i class="fa fa-plus text-success"></i> \
            </a> \
            <a class="window__item separator" ></a> \
            <a class="window__item" title="Delete" ng-click="demoA.deleteSometings()"> \
                <i class="fa fa-trash"></i> \
            </a> \
        </div>'
    );
}]);
```

- Create thhe application -body- template. The template has to be named as "body-[appName]". If your application have a -status bar-, remember to add "with_status" class when you declaring the -body- template. If your application have -action bar-, remember to add "with_actions" class when you declaring the -body- template

```javascript
demoApp.run(['$templateCache', function ($templateCache) {
    $templateCache.put('templates/applications/body-demo.html',
        '<div class="window__body with_status with_actions" ng-controller="demoBodyController as demoB"> \
            <div class="window__main by-center"> \
                <h1>This is the Body!</h1> \
            </div> \
        </div>'
    );
}]);
```

- Finally, declare your -status bar- template. The template has to be named as "status-[appName]".

```javascript
demoApp.run(['$templateCache', function ($templateCache) {
    $templateCache.put('templates/applications/status-demo.html',
        '<div class="window__status" ng-controller="demoStatusController as sftpdemoS"> \
            This is the status bar \
        </div>'
    );
}]);
```

- Concat all your application files into a single filed name it as "application__[appName].min.js" and copy it to SysOS folder "/bin/applications/".

- We are good to Go! Refresh (F5) your SysOS browser page and the new application will appear on the Start Menu.

![alt text](https://isartnavarro.io/img/SysOS/demo_app.png "Demo app")

- Desktop template found at https://codepen.io/keithpickering/pen/azBdNj with license "desktop_license.lic"
