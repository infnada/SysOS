(function () {
    'use strict';
    smanagerApp.run(['$templateCache', function ($templateCache) {

        $templateCache.put('templates/applications/body-smanager.html',
            '<div class="window__body with_status" ng-controller="smBodyController as smB"> \
              <div class="window__side" ng-if="smB.viewSide"> \
                <uib-accordion close-others="false"> \
                  <!-- Storage Infrastructure --> \
                  <div uib-accordion-group class="panel-success" is-open="true"> \
                    <uib-accordion-heading> \
                      <i class="fa m-t-f" ng-class="{\'fa-chevron-down\': $parent.isOpen, \'fa-chevron-right p-r-xxs\': !$parent.isOpen}"></i> <i class="fa fa-database m-t-f"></i> Storage Infrastructure \
                    </uib-accordion-heading> \
                    <uib-accordion close-others="false"> \
                      <!-- Host --> \
                      <div uib-accordion-group class="menu__item panel-default" ng-class="{\'active\': storage.uuid == smB.activeConnection}"ng-repeat="storage in smB.connections.storage" is-open="true"> \
                        <uib-accordion-heading> \
                          <span context-menu="smB.storageContextMenu"><i class="fa fa-fw fa-refresh fa-spin" ng-if="storage.refreshing"></i> <i class="fa level-one" ng-class="{\'fa-chevron-down\': $parent.isOpen, \'fa-chevron-right p-r-xxs\': !$parent.isOpen}"></i> <img ng-src="/img/{{::storage.type}}-logo.png" width="16px" /> {{::storage.name}}<span> \
                        </uib-accordion-heading> \
                        <uib-accordion close-others="false"> \
                          <!-- vServers --> \
                          <div uib-accordion-group class="menu__item panel-default" ng-repeat="vserver in storage.vservers | filter: { \'vserver-type\': \'data\' }" is-open="false"> \
                            <uib-accordion-heading> \
                              <i class="fa level-two" ng-class="{\'fa-chevron-down\': $parent.isOpen, \'fa-chevron-right p-r-xxs\': !$parent.isOpen}"></i> <i class="fa fa-server"></i> {{::vserver[\'vserver-name\']}} \
                            </uib-accordion-heading> \
                            <uib-accordion close-others="false"> \
                              <!-- Volumes --> \
                              <div uib-accordion-group class="menu__item panel-default" ng-repeat="volume in vserver.volumes" is-open="false"> \
                                <uib-accordion-heading> \
                                  <span context-menu="smB.volumeContextMenu"><i class="fa fa-fw fa-refresh fa-spin" ng-if="volume.refreshing"></i> <i class="fa level-three" ng-class="{\'fa-chevron-down\': $parent.isOpen, \'fa-chevron-right p-r-xxs\': !$parent.isOpen}"></i> <i class="vs-icon vsphere-icon-datastore"></i> {{::volume[\'volume-id-attributes\'].name}}<span> \
                                </uib-accordion-heading> \
                                <!-- SnapShots --> \
                                <div class="menu__item panel-heading" ng-class="{\'active\': snapshot[\'snapshot-version-uuid\'] == smB.activeConnection}" ng-repeat="snapshot in volume.snapshots" ng-click="smB.getSnapshotFiles(storage.uuid, storage.hostname, vserver[\'vserver-name\'], volume[\'volume-id-attributes\'].name, snapshot.name); smB.setActiveConnection(snapshot, \'snapshot\')" context-menu="smB.snapshotContextMenu"> \
                                  <h4 class="panel-title"> \
                                    <i class="level-four fa fa-camera p-l-sm"></i><span> {{::snapshot.name}}</span> \
                                  </h4> \
                                </div> \
                              </div> \
                            </uib-accordion> \
                          </div> \
                        </uib-accordion> \
                      </div> \
                    </uib-accordion> \
                  </div> \
                </uib-accordion> \
                <uib-accordion close-others="false"> \
                  <!-- Virtual Infrastructure --> \
                  <div uib-accordion-group class="panel-success" is-open="true"> \
                    <uib-accordion-heading> \
                      <i class="fa m-t-f" ng-class="{\'fa-chevron-down\': $parent.isOpen, \'fa-chevron-right p-r-xxs\': !$parent.isOpen}"></i> <i class="fa fa-cloud m-t-f"></i> Virtual Infrastructure \
                    </uib-accordion-heading> \
                    <uib-accordion close-others="false"> \
                      <!-- virtual --> \
                      <div uib-accordion-group class="menu__item panel-default" ng-repeat="virtual in smB.connections.virtual" is-open="true"> \
                        <uib-accordion-heading> \
                          <span context-menu="smB.virtualContextMenu"><i class="fa fa-fw fa-refresh fa-spin" ng-if="virtual.refreshing"></i> <i class="fa level-one" ng-class="{\'fa-chevron-down\': $parent.isOpen, \'fa-chevron-right p-r-xxs\': !$parent.isOpen}"></i> <i class="vs-icon vsphere-icon-vcenter"></i> {{::virtual.hostname}}</span> \
                        </uib-accordion-heading> \
                        <uib-accordion close-others="false"> \
                          <!-- Datacenter --> \
                          <div uib-accordion-group class="menu__item panel-default" ng-repeat="datacenter in virtual.datacenters" is-open="true"> \
                            <uib-accordion-heading> \
                              <i class="fa level-two" ng-class="{\'fa-chevron-down\': $parent.isOpen, \'fa-chevron-right p-r-xxs\': !$parent.isOpen}"></i> <i class="vs-icon vsphere-icon-datacenter"></i> {{::datacenter.name}} \
                            </uib-accordion-heading> \
                            <uib-accordion close-others="false"> \
                              <!-- Clusters --> \
                              <div uib-accordion-group class="menu__item panel-default" ng-repeat="cluster in datacenter.clusters" is-open="true"> \
                                <uib-accordion-heading> \
                                  <i class="fa level-three" ng-class="{\'fa-chevron-down\': $parent.isOpen, \'fa-chevron-right p-r-xxs\': !$parent.isOpen}"></i> <i class="vs-icon vsphere-icon-cluster"></i> {{::cluster.name}} \
                                </uib-accordion-heading> \
                                <uib-accordion close-others="false"> \
                                  <!-- Hosts --> \
                                  <div class="panel-default panel panel-open" ng-repeat="host in cluster.hosts"> \
                                    <div class="menu__item panel-heading"> \
                                      <h4 class="panel-title"> \
                                        <a class="accordion-toggle"> \
                                          <span> \
                                            <i class="vs-icon level-five p-l-sm" ng-class="{\'vsphere-icon-host-disconnected\': host.power_state === \'POWERED_OFF\', \'vsphere-icon-host\': host.power_state === \'POWERED_ON\'}"></i><span> {{::host.name}}</span> \
                                          </span> \
                                        </a> \
                                      </h4> \
                                    </div> \
                                  </div> \
                                  <div uib-accordion-group class="panel-default" is-open="false"> \
                                    <uib-accordion-heading> \
                                      <i class="fa level-four" ng-class="{\'fa-chevron-down\': $parent.isOpen, \'fa-chevron-right p-r-xxs\': !$parent.isOpen}"></i> <i class="fa fa-folder"></i> VMs \
                                    </uib-accordion-heading> \
                                    <uib-accordion close-others="false"> \
                                      <!-- VMs --> \
                                      <div class="menu__item panel-heading" ng-repeat="vm in virtual.vms | filter: { runtime: { host: {name: cluster.hosts.name}}} | orderBy:\'name\'" ng-class="{\'active\': vm.config.uuid == smB.activeConnection}" ng-click="smB.setActiveConnection(vm, \'vm\')" context-menu="smB.VMContextMenu"> \
                                        <h4 class="panel-title pull-left absolute"> \
                                          <i class="fa fa-fw fa-refresh fa-spin" ng-if="vm.refreshing"></i> <i class="vs-icon level-six p-l-sm" ng-class="{\'vsphere-icon-vm\': vm.runtime.powerState === \'poweredOff\', \'vsphere-icon-vm-on\': vm.runtime.powerState === \'poweredOn\', \'vsphere-icon-vm-suspended\': vm.runtime.powerState === \'suspended\'}"></i> {{::vm.name}} \
                                        </h4> \
                                        <i class="fa fa-circle pull-right" ng-class="{\'text-danger\': vm.type == \'disconnected\', \'text-success\': vm.type == \'connected\'}"></i> \
                                        <i class="fa pull-right" ng-class="{\'fa-windows text-primary\': vm.guest.guestFamily == \'windowsGuest\', \'fa-linux text-danger\': vm.guest.guestFamily == \'linuxGuest\'}"></i> \
                                      </div> \
                                    </uib-accordion> \
                                  </div> \
                                </uib-accordion> \
                              </div> \
                            </uib-accordion> \
                            <uib-accordion close-others="false"> \
                              <!-- Standalone Hosts --> \
                              <div uib-accordion-group class="menu__item panel-default" ng-repeat="host in datacenter.hosts" is-open="true"> \
                                <uib-accordion-heading> \
                                  <i class="fa level-three" ng-class="{\'fa-chevron-down\': $parent.isOpen, \'fa-chevron-right p-r-xxs\': !$parent.isOpen}"></i> <i class="vs-icon" ng-class="{\'vsphere-icon-host-disconnected\': host.power_state === \'POWERED_OFF\', \'vsphere-icon-host\': host.power_state === \'POWERED_ON\'}"></i> {{::host.name}} \
                                </uib-accordion-heading> \
                                <div uib-accordion-group class="panel-default" is-open="false"> \
                                  <uib-accordion-heading> \
                                    <i class="fa level-four" ng-class="{\'fa-chevron-down\': $parent.isOpen, \'fa-chevron-right p-r-xxs\': !$parent.isOpen}"></i> <i class="fa fa-folder"></i> VMs \
                                  </uib-accordion-heading> \
                                  <uib-accordion close-others="false"> \
                                    <!-- VMs --> \
                                    <div class="menu__item panel-heading" ng-repeat="vm in virtual.vms | filter: { runtime: { host: {name: host.host}}} | orderBy:\'name\'" ng-class="{\'active\': vm.config.uuid == smB.activeConnection}" ng-click="smB.setActiveConnection(vm, \'vm\')" context-menu="smB.VMContextMenu"> \
                                      <h4 class="panel-title pull-left absolute"> \
                                        <i class="vs-icon level-six p-l-sm" ng-class="{\'vsphere-icon-vm\': vm.runtime.powerState === \'poweredOff\', \'vsphere-icon-vm-on\': vm.runtime.powerState === \'poweredOn\', \'vsphere-icon-vm-suspended\': vm.runtime.powerState === \'suspended\'}"></i> {{::vm.name}} \
                                      </h4> \
                                      <i class="fa fa-circle pull-right" ng-class="{\'text-danger\': vm.type == \'disconnected\', \'text-success\': vm.type == \'connected\'}"></i> \
                                      <i class="fa pull-right" ng-class="{\'fa-windows text-primary\': vm.guest.guestFamily == \'windowsGuest\', \'fa-linux text-danger\': vm.guest.guestFamily == \'linuxGuest\'}"></i> \
                                    </div> \
                                  </div> \
                                </uib-accordion> \
                              </div> \
                            </uib-accordion> \
                          </div>  \
                        </uib-accordion> \
                        <div uib-accordion-group class="panel-default" is-open="false"> \
                          <uib-accordion-heading> \
                            <i class="fa level-two" ng-class="{\'fa-chevron-down\': $parent.isOpen, \'fa-chevron-right p-r-xxs\': !$parent.isOpen}"></i> <i class="fa fa-folder"></i> Datastores \
                          </uib-accordion-heading> \
                          <uib-accordion close-others="false"> \
                            <!-- Datastores --> \
                            <div class="menu__item panel-heading" ng-repeat="datastore in virtual.datastores | orderBy:\'info.name\'" ng-class="{\'active\': datastore.obj.name == smB.activeConnection}" ng-click="smB.setActiveConnection(datastore, \'datastore\')"> \
                              <h4 class="panel-title"> \
                                <i class="vs-icon vsphere-icon-datastore level-four p-l-sm"></i> \
                                <img class="m-s-xss" src="/img/NetApp-logo.png" width="16px" src="/img/NetApp-logo.png" ng-if="::smB.getLinkByVMwareDatastore(virtual.uuid, datastore.obj.name).type === \'NetApp\'" uib-tooltip="{{::smB.getLinkByVMwareDatastore(virtual.uuid, datastore.obj.name).name}}"> \
                                {{::datastore.info.name}} \
                              </h4> \
                            </div> \
                          </uib-accordion> \
                        </div> \
                      </div> \
                    </uib-accordion> \
                  </div> \
                </uib-accordion> \
                <uib-accordion> \
                  <div uib-accordion-group class="panel-success" is-open="true"> \
                    <uib-accordion-heading> \
                      <i class="fa m-t-f" ng-class="{\'fa-chevron-down\': $parent.isOpen, \'fa-chevron-right p-r-xxs\': !$parent.isOpen}"></i> <i class="fa fa-server m-t-f"></i> Physical Infrastructure \
                    </uib-accordion-heading> \
                    <uib-accordion close-others="false"> \
                      <div uib-accordion-group class="panel-default" ng-repeat="folder in smB.getConnectionFolders(\'standalone\')" is-open="true"> \
                        <uib-accordion-heading> \
                          <i class="fa" ng-class="{\'fa-chevron-down\': $parent.isOpen, \'fa-chevron-right p-r-xxs\': !$parent.isOpen}"></i> <i class="fa fa-folder"></i> {{::folder}} \
                        </uib-accordion-heading> \
                        <div class="menu__item" ng-repeat="connection in smB.connections.standalone | filter: { folder: folder } track by $index" ng-class="{\'active\': connection.uuid == smB.activeConnection}" ng-click="smB.setActiveConnection(connection, \'standalone\')" ng-if="connection != undefined"> \
                          <span class="p-l-xl"> \
                            <i class="fa m-t-f p-l-sm" ng-class="{\'fa-linux\': connection.so === \'linux\', \'fa-windows\': connection.so === \'windows\', \'fa-server\': connection.so === \'snmp\'}"></i> {{::connection.description}} <small>({{::connection.host}})</small> \
                            <i class="fa fa-circle pull-right m-t-f" ng-class="{\'text-danger\': connection.type == \'disconnected\', \'text-success\': connection.type == \'connected\'}"></i> \
                          </span> \
                        </div> \
                      </div> \
                    </uib-accordion> \
                  </div> \
                </uib-accordion> \
                <div class="secondary-content__new__box__toggle pointer visible-lg"> \
                  <div class="secondary-content__new__box__toggle__slide" ng-click="smB.toggleSide()"> \
                    <i class="fa fa-arrow-left sidebar-open-font open-sidebar"></i> \
                  </div> \
                </div> \
              </div> \
              <div class="secondary-content__new__box__toggle toggle_left pointer visible-lg" ng-if="!smB.viewSide" ng-click="smB.toggleSide()"> \
                <i class="fa fa-arrow-right sidebar-open-font open-sidebar"></i> \
              </div> \
              <div class="window__main"> \
                <div ng-if="smB.showvCenter == true"> \
                  <div ng-include="\'templates/applications/vcenter-type-smanager.html\'" include-replace></div> \
                </div> \
                <div ng-if="smB.showVm == true"> \
                  <div ng-include="\'templates/applications/vm-type-smanager.html\'" include-replace></div> \
                </div> \
                <div ng-if="smB.showSnapshot == true"> \
                  <div ng-include="\'templates/applications/snapshot-type-smanager.html\'" include-replace></div> \
                </div> \
                <div ng-if="smB.showStandalone == true && smB.getActiveConnection().state != \'disconnected\'"> \
                  <div ng-include="\'templates/applications/standalone-type-smanager.html\'" include-replace></div> \
                </div> \
                <div ng-if="smB.showNewConnectionType == true"> \
                  <div ng-include="\'templates/applications/new-connection-type-smanager.html\'" include-replace></div> \
                </div> \
                <div ng-if="smB.showNewConnection == true || smB.getActiveConnection().state == \'disconnected\'"> \
                  <div ng-include="\'templates/applications/new-connection-smanager.html\'" include-replace></div> \
                </div> \
                <div ng-if="smB.showConfigureConnection == true"> \
                  <div ng-include="\'templates/applications/configure-connection-smanager.html\'" include-replace></div> \
                </div> \
              </div> \
            </div>'
        );

    }]);
}());
