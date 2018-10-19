(function () {
    'use strict';
    datastoreexplorerApp.run(['$templateCache', function ($templateCache) {

        $templateCache.put('templates/applications/body-datastoreexplorer.html',
            '<div class="window__body" ng-controller="deBodyController as deB" data-drop="true" jqyoui-droppable="{onDrop: \'deB.onDropItem\'}" data-jqyoui-options="{greedy: true, accept:\'a\', tolerance: \'pointer\'}"> \
                <div class="window__main no_padding"> \
                    <div class="col-xs-12 ftp__body" > \
                        <div ng-include="\'templates/applications/actions-de-local.html\'" include-replace></div> \
                        <div id="local_body" selectable="deB.selection" selectable-list="deB.localFileSystem.currentData | filter:deB.search" selectable-out="selected" selectable-options="{delay:150, filter: \'a\'}" minus-index="2" class="folders" tabindex="0" ng-click="deB.handleMainFolderClick($event)" ng-keydown="deB.handleItemKeyPress($event)" context-menu="deB.localContextMenu"> \
                            <div ng-if="!deB.showExplorer" class="main_form"> \
                                <p>Explore your managed vCenter ot ESXi Datastores or NetApp Volumes</p> \
                                <table class="table table-hover m-t-xl"> \
                                    <tbody> \
                                        <tr class="cursor-pointer" ng-click="deB.showDatastores(\'vmware\')"> \
                                            <th class="col-sm-2 p-m"><img src="/img/vmware.png" width="75px"></th> \
                                            <td class="lh-2">Select any managed Datastore from your vCenters or ESXi hosts.</td> \
                                        </tr> \
                                        <tr class="cursor-pointer" ng-click="deB.showDatastores(\'netapp\')"> \
                                            <th class="col-sm-2 p-m"><img src="/img/NetApp.png" width="75px"></th> \
                                            <td class="lh-2">Select any managed NetApp volume. If SnapShot dir "visible" option is enabled, you will be able to see SnapShots files. (You should not modify it).</td> \
                                        </tr> \
                                    </tbody> \
                                </table> \
                            </div> \
                            <div ng-include="\'templates/applications/body-de-local.html\'" ng-if="deB.showExplorer"></div> \
                        </div> \
                    </div> \
                </div> \
            </div>'
        );

    }]);
}());