import {Component, Inject, OnInit, ViewChild} from '@angular/core';

import {dump as toYaml, load as fromYaml} from 'js-yaml';

import {MAT_DIALOG_DATA, MatDialogRef, MatButtonToggleGroup} from '@anyopsos/lib-angular-material';
import {BodyComponent, ModalData} from '@anyopsos/lib-modal';
import {AnyOpsOSLibNodeKubernetesApiService} from '@anyopsos/lib-node-kubernetes';
import {DataObject} from '@anyopsos/backend-core/app/types/data-object';

enum EditorMode {
  JSON = 'json',
  YAML = 'yaml',
}

@Component({
  selector: 'amkubernetes-edit-resource-anyopsos-modal-kubernetes-edit-resource',
  templateUrl: './anyopsos-modal-kubernetes-edit-resource.component.html',
  styleUrls: ['./anyopsos-modal-kubernetes-edit-resource.component.scss']
})
export class AnyOpsOSModalKubernetesEditResourceComponent implements OnInit {
  @ViewChild('modalBody', {static: true}) modalBody: BodyComponent;
  @ViewChild('group', {static: false}) buttonToggleGroup: MatButtonToggleGroup;

  object: DataObject;

  selectedMode = EditorMode.YAML;
  text = '';
  modes = EditorMode;

  constructor(public readonly dialogRef: MatDialogRef<AnyOpsOSModalKubernetesEditResourceComponent>,
              @Inject(MAT_DIALOG_DATA) public readonly data: ModalData,
              private readonly LibKubernetesApi: AnyOpsOSLibNodeKubernetesApiService) {

    this.object = data.object;
  }

  ngOnInit(): void {

    // Do not delete this
    this.modalBody.dialogRef = this.dialogRef;
    this.modalBody.title = this.data.title ?? 'Edit a resource';
    this.modalBody.type = this.data.type;

    this.LibKubernetesApi.getResourceBySelfLink(this.object).then(resourceResult => {
      if (resourceResult.status === 'error') throw {error: resourceResult.error, description: 'Failed to get Kubernetes resource'};
      this.text = toYaml(resourceResult.data);
    });

    this.buttonToggleGroup.valueChange.subscribe((selectedMode: EditorMode) => {
      this.selectedMode = selectedMode;

      if (this.text) this.updateText();
    });
  }

  getJSON(): string {
    if (this.selectedMode === EditorMode.YAML) {
      return AnyOpsOSModalKubernetesEditResourceComponent.toRawJSON(fromYaml(this.text));
    }

    return this.text;
  }

  getSelectedMode(): string {
    return this.buttonToggleGroup.value;
  }

  noticeContent(): string {
    return `<span>This action is equivalent to: </span>
      <code>kubectl apply -f &lt;spec.${this.selectedMode}&gt;</code>`;
  }

  private updateText(): void {
    if (this.selectedMode === EditorMode.YAML) {
      this.text = toYaml(JSON.parse(this.text));
    } else {
      this.text = AnyOpsOSModalKubernetesEditResourceComponent.toRawJSON(fromYaml(this.text));
    }
  }

  private static toRawJSON(object: {}): string {
    return JSON.stringify(object, null, '\t');
  }


}
