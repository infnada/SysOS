import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';

import {pairwise, startWith} from 'rxjs/operators';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {ImDataObject, KubernetesPod} from '@anyopsos/app-infrastructure-manager';
import {AnyOpsOSLibServiceInjectorService} from '@anyopsos/lib-service-injector';
import {AnyOpsOSLibKubernetesService} from '@anyopsos/lib-kubernetes';


@Component({
  selector: 'smimks-anyopsos-modal-infrastructure-manager-kubernetes-shell',
  templateUrl: './anyopsos-modal-infrastructure-manager-kubernetes-shell.component.html',
  styleUrls: ['./anyopsos-modal-infrastructure-manager-kubernetes-shell.component.scss']
})
export class AnyOpsOSModalInfrastructureManagerKubernetesShellComponent implements OnInit {
  @Input() object: ImDataObject;
  @Input() shellType: 'exec' | 'attach' = 'attach';

  private InfrastructureManagerObjectHelper;

  terminalUuid: string = null;
  foundPods: (ImDataObject & { info: { data: KubernetesPod } })[] = [];

  containerForm = new FormControl('');

  constructor(public activeModal: NgbActiveModal,
              private serviceInjector: AnyOpsOSLibServiceInjectorService,
              private Kubernetes: AnyOpsOSLibKubernetesService) {
    this.InfrastructureManagerObjectHelper = this.serviceInjector.get('AnyOpsOSAppInfrastructureManagerObjectHelperService');

    this.containerForm.valueChanges.pipe(startWith(null), pairwise()).subscribe( async ([previousData, selectedData]) => {

      // End previous shell
      if (previousData) await this.Kubernetes.endContainerShell(this.terminalUuid);

      // Set new container shell
      this.Kubernetes.getContainerShellToSocket(
        this.shellType,
        selectedData.pod.info.mainUuid,
        this.terminalUuid,
        selectedData.pod.info.data.metadata.namespace,
        selectedData.pod.name,
        selectedData.container.name,
        '/bin/sh'
      ).then(data => {
        console.log(data);
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
}
