import {Component, Input, OnInit} from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {SelectionModel} from '@angular/cdk/collections';
import {FlatTreeControl} from '@angular/cdk/tree';
import {BehaviorSubject} from 'rxjs';

import {Application} from '../../../interfaces/application';
import {InfrastructureManagerService} from '../services/infrastructure-manager.service';
import {IMConnection} from '../interfaces/IMConnection';

interface InfrastructureManagerFlatNode {
  expandable: boolean;
  name: string;
  level: number;
  type: string;
}
interface InfrastructureManagerNode {
  name: string;
  type?: string;
  children?: InfrastructureManagerNode[];
}

@Component({
  selector: 'app-infrastructure-manager-body',
  templateUrl: './infrastructure-manager-body.component.html',
  styleUrls: ['./infrastructure-manager-body.component.scss']
})
export class InfrastructureManagerBodyComponent implements OnInit {
  @Input() application: Application;

  activeConnection: string;

  viewSide: boolean = true;


  /** Map from nested node to flattened node. This helps us to keep the same object for selection */
  TREE_DATA: InfrastructureManagerNode[] = [
    {
      name: 'Fruit',
      children: [
        {name: 'Apple'},
        {name: 'Banana'},
        {name: 'Fruit loops'},
      ]
    }, {
      name: 'Vegetables',
      children: [
        {
          name: 'Green',
          children: [
            {name: 'Broccoli'},
            {name: 'Brussel sprouts'},
          ]
        }, {
          name: 'Orange',
          children: [
            {name: 'Pumpkins'},
            {name: 'Carrots'},
          ]
        },
      ]
    },
  ];

  treeControl = new FlatTreeControl<InfrastructureManagerFlatNode>(node => node.level, node => node.expandable);
  treeFlattener = new MatTreeFlattener(this.transformer, node => node.level, node => node.expandable, node => node.children);
  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  private transformer(node: InfrastructureManagerNode, level: number)  {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level
    };
  }

  hasChild = (_: number, node: InfrastructureManagerFlatNode) => node.expandable;

  constructor(private InfrastructureManager: InfrastructureManagerService) {
    this.dataSource.data = this.TREE_DATA;
  }

  ngOnInit() {
    this.InfrastructureManager.activeConnection.subscribe(activeConnection => this.activeConnection = activeConnection);
  }

  toggleSide(): void {
    this.viewSide = !this.viewSide;
  }

  setActiveConnection(connection: IMConnection): void {
    this.InfrastructureManager.setActiveConnection(connection.uuid);
  }

  getActiveConnection(): IMConnection {
    return this.InfrastructureManager.getActiveConnection();
  }
}
