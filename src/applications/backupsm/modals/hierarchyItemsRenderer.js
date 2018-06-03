(function () {
	'use strict';
	backupsmApp.run(['$templateCache', function ($templateCache) {

		$templateCache.put('applications/backupsm/modals/hierarchyItemsRenderer.html',
			'<div class="node-embed" ui-tree-handle ng-click="bwmC.itemSelect(item,this)"> \
			    <a class="btn btn-clear btn-xs" ng-if="::item.items.length" ng-click="bwmC.expandNode(this,$event)"> \
			        <i class="fa" ng-class="{\'fa-chevron-right p-r-xxs\': collapsed, \'fa-chevron-down\': !collapsed}"></i> \
			    </a> \
			    <span class="node-header" ng-class="::{\'p-l-27\': !item.items.length}"> \
			        <input type="checkbox" ng-disabled="::!bwmC.getLinkByVMwareDatastore(item)" ng-checked="item.isSelected" indeterminate-checkbox node="::item" /> \
			    </span> \
			    <i class="fa fa-exclamation text-warning" ng-if="::!bwmC.getLinkByVMwareDatastore(item) && item.type === \'VirtualMachine\'" uib-tooltip="This VM is not in a supported Storage"></i> \
			    <i class="fa fa-exclamation text-warning" ng-if="::!bwmC.getLinkByVMwareDatastore(item) && item.type === \'Datastore\'" uib-tooltip="This Datastore is not a supported Storage"></i> \
			    <i class="p-l-sm" ng-class="::{ \
			    \'vs-icon vsphere-icon-vcenter\': item.type === \'vCenter\', \
			    \'vs-icon vsphere-icon-datastore\': item.type === \'Datastore\', \
			    \'vs-icon vsphere-icon-datacenter\': item.type === \'Datacenter\', \
			    \'vs-icon vsphere-icon-cluster\': item.type === \'Cluster\', \
			    \'vs-icon vsphere-icon-host-disconnected\': item.type === \'Host\' && item.object.power_state === \'POWERED_OFF\', \
			    \'vs-icon vsphere-icon-host\': item.type === \'Host\' && item.object.power_state === \'POWERED_ON\', \
			    \'vs-icon vsphere-icon-vm\': item.type === \'VirtualMachine\' && item.object.runtime.powerState === \'poweredOff\', \
			    \'vs-icon vsphere-icon-vm-on\': item.type === \'VirtualMachine\' && item.object.runtime.powerState === \'poweredOn\', \
			    \'vs-icon vsphere-icon-vm-suspended\': item.type === \'VirtualMachine\' && item.object.runtime.powerState === \'suspended\' \
			    }"></i> {{::item.title}} \
			</div> \
			<ol ui-tree-nodes="" ng-model="item.items" ng-if="!collapsed"> \
				<li ng-repeat="item in ::item.items" ui-tree-node collapsed="true" ng-include="\'applications/backupsm/modals/hierarchyItemsRenderer.html\'"></li> \
			</ol>'
		);

	}]);
}());
