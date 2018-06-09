(function () {
	'use strict';
	backupsmApp.run(['$templateCache', function ($templateCache) {

		$templateCache.put('applications/backupsm/modals/backupWizard.html',
			'<div class="modal-header"> \
			  <div class="modal-title" id="modal-title">{{bwmC.title}}</div> \
			  <div class="window__controls window__controls--right"><a class="window__close" ng-click="bwmC.close(); $event.stopPropagation();"><i class="fa fa-close"></i></a></div> \
			</div> \
			<div class="modal-body modal-recovery-wizard" id="modal-body"> \
			  <div class="wizard"> \
				<ul class="nav nav-wizard"> \
				  <li ng-class="{\'active\': bwmC.step == 1}"> \
					<a ng-click="bwmC.step = 1">Name</a> \
				  </li> \
				  <li ng-class="{\'active\': bwmC.step == 2}"> \
					<a ng-click="bwmC.step = 2">Virtual Machines</a> \
				  </li> \
				  <li ng-class="{\'active\': bwmC.step == 3}"> \
					<a ng-click="bwmC.step = 3">Storage</a> \
				  </li> \
				  <li ng-class="{\'active\': bwmC.step == 4}"> \
					<a ng-click="bwmC.step = 4">Guest Processing</a> \
				  </li> \
				  <li ng-class="{\'active\': bwmC.step == 5}"> \
					<a ng-click="bwmC.step = 5">Schedule</a> \
				  </li> \
				  <li ng-class="{\'active\': bwmC.step == 6}"> \
					<a ng-click="bwmC.step = 6">Summary</a> \
			      </li>\
				</ul> \
				<form> \
				  <div class="tab-content"> \
				    <div class="tab-pane" ng-if="bwmC.step == 1" ng-class="{\'active\': bwmC.step == 1}"> \
				        <hr class="hr-text" data-content="Type in a name for this backup job"> \
				        <form> \
							<div class="form-group row"> \
								<label for="backupName" class="col-sm-2 col-form-label">Backup name</label> \
								<div class="col-sm-10"> \
									<input type="text" class="form-control" placeholder="name" ng-model="bwmC.backupName" autofocus/> \
								</div> \
							</div> \
						</form> \
					</div> \
					<div class="tab-pane" ng-if="bwmC.step == 2" ng-class="{\'active\': bwmC.step == 2}"> \
						<div class="row"> \
							<div class="col-sm-6 bar-right"> \
								<hr class="hr-text" data-content="Select objects"> \
								<h5>Select Virtual Machines to process via container or granularly. Container provides dynamic selection that automatically changes as you add new VM into container.</h5> \
					            <div ui-tree="" data-drag-enabled="false"> \
									<ol ui-tree-nodes="" ng-model="::bwmC.list"> \
										<li ng-repeat="item in ::bwmC.list" ui-tree-node collapsed="false" ng-include="\'applications/backupsm/modals/hierarchyItemsRenderer.html\'"></li> \
									</ol> \
								</div>\
					        </div> \
					        <div class="col-sm-6"> \
					            <hr class="hr-text" data-content="Selected objects ({{bwmC.selectedCount}})"> \
					            <table class="table table-hover m-t-xl"> \
					                <thead> \
					                    <tr> \
					                        <th>Name</th> \
					                        <th>Type</th> \
					                        <th>vCenter</th> \
					                    </tr> \
					                </thead> \
									<tbody> \
										<tr class="cursor-pointer" ng-repeat="item in bwmC.selectedObjects"> \
											<th class="col-sm-3"> \
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
												}"></i> \
												{{::item.title}}</th> \
											<td class="col-sm-3">{{::item.type}}</td> \
											<td class="col-sm-3">{{bwmC.getParentName(item.parent)}}</td> \
										</tr> \
									</tbody> \
								</table> \
					        </div> \
					    </div> \
					</div> \
					<div class="tab-pane" ng-if="bwmC.step == 3" ng-class="{\'active\': bwmC.step == 3}"> \
					  <hr class="hr-text" data-content="Backup repository"> \
					  <h5>Specify a backup repository to store the backup files produced by this job and configure a secondary destination</h5> \
						<form> \
							<div class="form-group row"> \
								<label for="backupName" class="col-sm-4 col-form-label">Backup repository</label> \
								<div class="col-sm-8"> \
									<select class="form-control" ng-model="bwmC.selectedPrimaryStorage">  \
										<option value="" selected>-- Select a backup repository --</option> \
										<option value="snapshot">NetApp Snapshot</option> \
									</select> \
								</div> \
							</div> \
							<div class="form-group row"> \
								<label for="backupName" class="col-sm-4 col-form-label">Restore points to keep</label> \
								<div class="col-sm-8"> \
									<input class="form-control" type="number" name="restorePoints" min="1" max="254" ng-model="bwmC.restorePoints"> \
								</div> \
							</div> \
							<div class="form-group row"> \
								<label for="backupName" class="col-sm-4 col-form-label">Backup to secondary target?</label> \
								<div class="col-sm-8"> \
									<switch class="pull-right" name="secondaryTarget" ng-model="bwmC.secondaryTarget" on="Yes" off="No"></switch> \
								</div> \
							</div> \
							<div class="form-group row" ng-if="bwmC.secondaryTarget"> \
								<hr class="hr-text" data-content="Secondary destination"> \
								<label for="backupName" class="col-sm-4 col-form-label">Secondary Target</label> \
								<div class="col-sm-8"> \
									<select class="form-control" ng-model="bwmC.selectedSecondaryTarget"> \
										<option value="" selected>-- Select a secondary target --</option> \
										<option value="snapmirror">NetApp SnapMirror</option> \
										<option value="snapvault">NetApp SnapVault</option> \
									</select> \
								</div> \
							</div> \
						</form> \
					</table> \
					</div> \
					<div class="tab-pane" ng-if="bwmC.step == 4" ng-class="{\'active\': bwmC.step == 4}"> \
						<hr class="hr-text" data-content="VM Quiesce"> \
						<div class="form-group"> \
						  <div class="col-sm-12"> \
							<input type="checkbox" name="quiesceTools" value="true" ng-model="bwmC.quiesceTools"> Enable VMware Tools quiescence\
						  </div> \
						  <p>To create transactionally consistent backups and replicas for VMs that do not support Microsoft VSS (for example, Linux VMs), you must enable VMware Tools quiescence for the job. It use the VMware Tools to freeze the file system and application data on the VM before backup or replication.</p> \
						</div> \
						<hr class="hr-text" data-content="Pre & Post Scripts"> \
						<div class="form-group"> \
							<div class="col-sm-12"> \
								<select class="form-control" ng-options="credential.uuid as credential.description + \' - \' + credential.username for credential in bwmC.credentials" ng-model="bwmC.credential"> \
								<option value="">-- Select Credential --</option> \
							</select> \
							</div> \
							<div class="col-sm-12"> \
								<small class="pull-left text-primary cursor-pointer" ng-click="bwmC.manageCredentials();">Manage Credentials</small> \
							</div> \
						</div> \
					</div> \
					<div class="tab-pane" ng-if="bwmC.step == 5" ng-class="{\'active\': bwmC.step == 5}"> \
						<hr class="hr-text" data-content="Backup schedule"> \
						<div class="form-group"> \
							<div class="col-sm-12"> \
								<input type="checkbox" name="backupNow" value="true" ng-model="bwmC.backupNow"> Run backup job now \
							</div> \
						</div> \
					</div> \
					<div class="clearfix"></div> \
				  </div> \
				  <div class="tab-pane" ng-if="bwmC.step == 56" ng-class="{\'active\': bwmC.step == 6}"> \
				  </div> \
				</form> \
			  </div> \
			</div> \
			<div class="modal-footer"> \
			  <button class="btn btn-primary" type="button" ng-if="bwmC.step == 1" ng-click="bwmC.step = 2">Next</button> \
			  <button class="btn btn-primary" type="button" ng-if="bwmC.step == 2" ng-click="bwmC.step = 3">Next</button> \
			  <button class="btn btn-primary" type="button" ng-if="bwmC.step == 3" ng-click="bwmC.step = 4">Next</button> \
			  <button class="btn btn-primary" type="button" ng-if="bwmC.step == 4" ng-click="bwmC.step = 5">Next</button> \
			  <button class="btn btn-primary" type="button" ng-if="bwmC.step == 5" ng-click="bwmC.step = 6">Next</button> \
			  <button class="btn btn-primary" type="button" ng-if="bwmC.step == 6" ng-click="bwmC.selectData()">Backup</button> \
			</div>'
		);

	}]);
}());
