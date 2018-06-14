(function () {
    'use strict';
    smanagerApp.run(['$templateCache', function ($templateCache) {

        $templateCache.put('templates/applications/new-connection-type-smanager.html',
            '<div class="main_form"> \
              <p>Select the type of server you want to register with managed infrastructure. All registred servers can be found under the Manager servers node on the Infrastructure tab.</p> \
              <table class="table table-hover m-t-xl"> \
                <tbody> \
                  <tr class="cursor-pointer" ng-click="smB.newConnection(\'vmware\')"> \
                    <th class="col-sm-2 p-m"><img src="/img/vmware.png" width="75px"></th> \
                    <td class="lh-2">Adds vCenter Server (recommended), or standalone vSphere Hypervisor (ESX/ESXi)</td> \
                  </tr> \
                  <tr class="cursor-pointer" ng-click="smB.newConnection(\'netapp\')"> \
                    <th class="col-sm-2 p-m"><img src="/img/netapp.png" width="75px"></th> \
                    <td class="lh-2">Adds NetApp FAS/AFF series. NFS, Fibre Channel (FC) and iSCSI connectivity is supported.</td> \
                  </tr> \
                  <tr class="cursor-pointer" ng-click="smB.newConnection(\'windows\')"> \
                    <th class="col-sm-2 p-m"><i class="fa fa-windows"></i></th> \
                    <td class="lh-2">Adds Microsoft Windows Server (Windows 2008 or later)</td> \
                  </tr> \
                  <tr class="cursor-pointer" ng-click="smB.newConnection(\'linux\')"> \
                    <th class="col-sm-2 p-m"><i class="fa fa-linux"></i></th> \
                    <td class="lh-2">Adds Linux server (must have SSH)</td> \
                  </tr> \
                  <tr class="cursor-pointer" ng-click="smB.newConnection(\'snmp\')"> \
                    <th class="col-sm-2 p-m"><i class="fa fa-server"></i></th> \
                    <td class="lh-2">Adds SNMP node for monitoring</td> \
                  </tr> \
                </tbody> \
              </table> \
            </div>'
        );

    }]);
}());
