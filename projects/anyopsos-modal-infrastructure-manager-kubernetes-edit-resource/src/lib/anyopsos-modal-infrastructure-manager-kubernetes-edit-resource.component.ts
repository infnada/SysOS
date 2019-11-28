import {Component, Input, OnInit, ViewChild} from '@angular/core';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {MatButtonToggleGroup} from '@anyopsos/lib-angular-material';
import {dump as toYaml, load as fromYaml} from 'js-yaml';

import {ImDataObject} from '@anyopsos/app-infrastructure-manager';
import {AnyOpsOSLibKubernetesService} from '@anyopsos/lib-kubernetes';

enum EditorMode {
  JSON = 'json',
  YAML = 'yaml',
}

@Component({
  selector: 'smimker-anyopsos-modal-infrastructure-manager-kubernetes-edit-resource',
  templateUrl: './anyopsos-modal-infrastructure-manager-kubernetes-edit-resource.component.html',
  styleUrls: ['./anyopsos-modal-infrastructure-manager-kubernetes-edit-resource.component.scss']
})
export class AnyOpsOSModalInfrastructureManagerKubernetesEditResourceComponent implements OnInit {
  @ViewChild('group') buttonToggleGroup: MatButtonToggleGroup;
  @Input() object: ImDataObject;

  selectedMode = EditorMode.YAML;
  text = '';
  modes = EditorMode;

  constructor(public activeModal: NgbActiveModal,
              private Kubernetes: AnyOpsOSLibKubernetesService) {
  }

  ngOnInit() {
    // https://github.com/anyOpsOS/anyOpsOS/issues/3
    setTimeout(() => {

      this.Kubernetes.getResourceBySelfLink(this.object).then(resourceResult => {
        if (resourceResult.status === 'error') throw {error: resourceResult.error, description: 'Failed to get Kubernetes resource'};
        this.text = toYaml(resourceResult.data);
      });

      this.buttonToggleGroup.valueChange.subscribe((selectedMode: EditorMode) => {
        this.selectedMode = selectedMode;

        if (this.text) {
          this.updateText();
        }
      });
    }, 0);
  }

  getJSON(): string {
    if (this.selectedMode === EditorMode.YAML) {
      return this.toRawJSON(fromYaml(this.text));
    }

    return this.text;
  }

  getSelectedMode(): string {
    return this.buttonToggleGroup.value;
  }

  private updateText(): void {
    if (this.selectedMode === EditorMode.YAML) {
      this.text = toYaml(JSON.parse(this.text));
    } else {
      this.text = this.toRawJSON(fromYaml(this.text));
    }
  }

  private toRawJSON(object: {}): string {
    return JSON.stringify(object, null, '\t');
  }

}
