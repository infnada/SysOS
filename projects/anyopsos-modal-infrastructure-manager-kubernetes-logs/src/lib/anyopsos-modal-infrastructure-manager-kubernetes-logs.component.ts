import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {AnyOpsOSLibServiceInjectorService} from '@anyopsos/lib-service-injector';
import {AnyOpsOSLibKubernetesService} from '@anyopsos/lib-kubernetes';
import {ImDataObject, KubernetesPod} from '@anyopsos/app-infrastructure-manager';

@Component({
  selector: 'smimkl-anyopsos-modal-infrastructure-manager-kubernetes-logs',
  templateUrl: './anyopsos-modal-infrastructure-manager-kubernetes-logs.component.html',
  styleUrls: ['./anyopsos-modal-infrastructure-manager-kubernetes-logs.component.scss']
})
export class AnyOpsOSModalInfrastructureManagerKubernetesLogsComponent implements OnInit {
  @Input() object: ImDataObject;

  private InfrastructureManagerObjectHelper;
  private logRequests: {
    pod: any;
    container: any;
    logUuid: string;
  }[] = [];

  terminalUuid: string = null;
  foundPods: (ImDataObject & { info: { data: KubernetesPod } })[] = [];

  containerForm = new FormControl('');
  showContainersName: boolean = true;

  constructor(public activeModal: NgbActiveModal,
              private serviceInjector: AnyOpsOSLibServiceInjectorService,
              private Kubernetes: AnyOpsOSLibKubernetesService) {
    this.InfrastructureManagerObjectHelper = this.serviceInjector.get('AnyOpsOSAppInfrastructureManagerObjectHelperService');

    this.containerForm.valueChanges.subscribe( selectedContainers => {

      // Reset deselected containers
      this.logRequests.forEach((request, index, object) => {
        const stillSelected = selectedContainers.find(data => {
          return data.pod.name === request.pod.name && data.container.name === request.container.name;
        });

        if (stillSelected) return;

        this.Kubernetes.endContainerLogs(
          request.logUuid
        ).then(() => {

          // Delete object from array
          object.splice(index, 1);
        });
      });

      // Set new containers
      selectedContainers.forEach(data => {

        const alreadyExists = this.logRequests.find(request => {
          return data.pod.name === request.pod.name && data.container.name === request.container.name;
        });

        if (alreadyExists) return;

        this.Kubernetes.getContainerLogsToSocket(
          data.pod.info.mainUuid,
          this.terminalUuid,
          data.pod.info.data.metadata.namespace,
          data.pod.name,
          data.container.name,
          this.showContainersName
        ).then((containerLogsData) => {

          this.logRequests.push({
            pod: data.pod,
            container: data.container,
            logUuid: containerLogsData.data.uuid
          });

        });
      });
    });
  }

  ngOnInit(): void {
    // https://github.com/anyOpsOS/anyOpsOS/issues/3
    setTimeout(() => {

      if (this.object.type === 'Pod') return this.foundPods = [this.object];

      // Get Pods from parent object
      this.foundPods = this.InfrastructureManagerObjectHelper.getChildObjectsByType(this.object.info.mainUuid, 'Pod', this.object.info.obj);
    }, 0);
  }

  terminalUuidChanged(terminalUuid: string): void {
    this.terminalUuid = terminalUuid;
  }

  showContainersNameChanged() {
    // Reset container logs and start again with correct showContainersName value
    this.logRequests.forEach((request) => {

      this.Kubernetes.endContainerLogs(
        request.logUuid
      ).then(() => {
        this.Kubernetes.getContainerLogsToSocket(
          request.pod.info.mainUuid,
          this.terminalUuid,
          request.pod.info.data.metadata.namespace,
          request.pod.name,
          request.container.name,
          this.showContainersName
        );
      });
    });
  }

}
