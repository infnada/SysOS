import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FlatTreeControl} from '@angular/cdk/tree';
import {CdkDragDrop} from '@angular/cdk/drag-drop';

import {Observable, of as observableOf, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {MatTreeFlatDataSource, MatTreeFlattener} from '@anyopsos/lib-angular-material';

import {AnyOpsOSAppInfrastructureAsCodeProjectTreeService} from '../../../../services/anyopsos-app-infrastructure-as-code-project-tree.service';
import {FileFlatNode} from '../../../../types/file-flat-node';
import {FileNode} from '../../../../types/file-node';
import {Category} from '../../../../types/category';
import {Inventory} from '../../../../types/inventory';

@Component({
  selector: 'saiac-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent implements OnInit, OnDestroy {
  private destroySubject$: Subject<void> = new Subject();

  /**
   * Forms variables
   */
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  /**
   * Project tree variables
   */
  treeControl: FlatTreeControl<FileFlatNode>;
  dataSource: MatTreeFlatDataSource<FileNode, FileFlatNode>;
  private readonly treeFlattener: MatTreeFlattener<FileNode, FileFlatNode>;
  private expandedNodeSet: Set<string> = new Set();
  private dragging: boolean = false;
  private expandTimeout: any;
  private expandDelay: number = 1000;

  private transformer = (node: FileNode, level: number) => new FileFlatNode(!!node.children, node.filename, level, node.type, node.id);
  private getLevel = (node: FileFlatNode) => node.level;
  private isExpandable = (node: FileFlatNode) => node.expandable;
  private getChildren = (node: FileNode): Observable<FileNode[]> => observableOf(node.children);
  hasChild = (_: number, nodeData: FileFlatNode) => nodeData.expandable;

  constructor(private readonly formBuilder: FormBuilder,
              private readonly InfrastructureAsCodeProjectTree: AnyOpsOSAppInfrastructureAsCodeProjectTreeService) {

    this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel, this.isExpandable, this.getChildren);
    this.treeControl = new FlatTreeControl<FileFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource<FileNode, FileFlatNode>(this.treeControl, this.treeFlattener);
  }

  ngOnInit(): void {
    this.firstFormGroup = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required, Validators.maxLength(253)])]
    });
    this.secondFormGroup = this.formBuilder.group({
      projectCategories: this.formBuilder.control([])
    });
    this.thirdFormGroup = this.formBuilder.group({
      projectInventories: this.formBuilder.control([])
    });

    // Set inventory nodes on form projectInventories values change
    this.thirdFormGroup.controls.projectInventories.valueChanges
      .pipe(takeUntil(this.destroySubject$)).subscribe( (value: { inventories: Inventory[]; }) => this.setInventoryNodes(value));

    // Listen for treeData changes
    this.InfrastructureAsCodeProjectTree.dataChange
      .pipe(takeUntil(this.destroySubject$)).subscribe(data => this.rebuildTreeForData(data));
  }

  ngOnDestroy(): void {

    // Remove all listeners
    this.destroySubject$.next();
  }

  /**
   * Form getters
   */
  get f1(): { [key: string]: AbstractControl } { return this.firstFormGroup.controls; }
  get f2(): { [key: string]: AbstractControl } { return this.secondFormGroup.controls; }
  get f3(): { [key: string]: AbstractControl } { return this.thirdFormGroup.controls; }

  get projectCategories(): Category[] {
    // TODO filter not empty category values
    if (this.secondFormGroup.get('projectCategories').value.categories) {
      return this.secondFormGroup.get('projectCategories').value.categories.filter(category => category.name.length !== 0 && category.values.length !== 0);
    }

    return [];
  }

  /**
   * Sets TreeData Inventory nodes based on Project Form
   */
  private setInventoryNodes(value: { inventories: Inventory[]; }): void {
    const inventoryNodes = [];

    value.inventories.forEach(inventory => {
      if (inventory.of.length === 0) return;

      if (inventory.type === 'for') {
        inventory.of.forEach((of: { value: string; }) => {
          const node = new FileNode();
          node.filename = of.value;
          node.children = [];
          inventoryNodes.push(node);
        });
      }

      if (inventory.type === 'forEach' || inventory.type === 'forEachBut') {
        inventory.of.forEach((of: { name: string; values: { value: string }[] }) => {

          of.values.forEach((ofValues) => {
            // this should not be possible. Remove when fixed @link{ProjectFormComponent#projectCategories}
            if (ofValues.value.length === 0) return;

            // Do not add this value because is excluded by 'but'
            if (inventory.type === 'forEachBut' && inventory.but.find(but => but.name === of.name && but.value === ofValues.value)) return;

            const node = new FileNode();
            node.filename = ofValues.value;
            node.children = [];
            inventoryNodes.push(node);
          });

        });
      }

    });

    // Reassign data variable otherwise DOM is not updated
    const newTreeData = this.dataSource.data;
    newTreeData[0].children = inventoryNodes;
    this.rebuildTreeForData(newTreeData);
  }

  /**
   * This constructs an array of nodes that matches the DOM,
   * and calls rememberExpandedTreeNodes to persist expand state
   */
  private visibleNodes(): FileNode[] {
    this.rememberExpandedTreeNodes(this.treeControl, this.expandedNodeSet);
    const result = [];

    function addExpandedChildren(node: FileNode, expanded: Set<string>) {
      result.push(node);
      if (expanded.has(node.id)) {
        node.children.map(child => addExpandedChildren(child, expanded));
      }
    }
    this.dataSource.data.forEach(node => {
      addExpandedChildren(node, this.expandedNodeSet);
    });
    return result;
  }

  /**
   * Handle the drop - here we rearrange the data based on the drop event,
   * then rebuild the tree.
   */
  drop(event: CdkDragDrop<string[]>): void {
    // console.log('origin/destination', event.previousIndex, event.currentIndex);

    // ignore drops outside of the tree
    if (!event.isPointerOverContainer) return;

    // construct a list of visible nodes, this will match the DOM.
    // the cdkDragDrop event.currentIndex jives with visible nodes.
    // it calls rememberExpandedTreeNodes to persist expand state
    const visibleNodes = this.visibleNodes();

    // deep clone the data source so we can mutate it
    const changedData = JSON.parse(JSON.stringify(this.dataSource.data));

    // recursive find function to find siblings of node
    function findNodeSiblings(arr: any[], id: string): any[] {
      let result;
      let subResult;

      arr.forEach(item => {
        if (item.id === id) {
          result = arr;
        } else if (item.children) {
          subResult = findNodeSiblings(item.children, id);
          if (subResult) result = subResult;
        }
      });
      return result;
    }

    // remove the node from its old place
    const node = event.item.data;
    const siblings = findNodeSiblings(changedData, node.id);
    const siblingIndex = siblings.findIndex(n => n.id === node.id);
    const nodeToInsert: FileNode = siblings.splice(siblingIndex, 1)[0];

    // determine where to insert the node
    const nodeAtDest = visibleNodes[event.currentIndex];
    if (nodeAtDest.id === nodeToInsert.id) return;

    // determine drop index relative to destination array
    let relativeIndex = event.currentIndex; // default if no parent
    const nodeAtDestFlatNode = this.treeControl.dataNodes.find(n => nodeAtDest.id === n.id);
    const parent = this.getParentNode(nodeAtDestFlatNode);
    if (parent) {
      const parentIndex = visibleNodes.findIndex(n => n.id === parent.id) + 1;
      relativeIndex = event.currentIndex - parentIndex;
    }
    // insert node
    const newSiblings = findNodeSiblings(changedData, nodeAtDest.id);
    if (!newSiblings) return;
    newSiblings.splice(relativeIndex, 0, nodeToInsert);

    // rebuild tree with mutated data
    this.rebuildTreeForData(changedData);
  }

  /**
   * Experimental - opening tree nodes as you drag over them
   */
  dragStart(): void {
    this.dragging = true;
  }

  dragEnd(): void {
    this.dragging = false;
  }

  dragHover(node: FileFlatNode): void {
    if (this.dragging) {
      clearTimeout(this.expandTimeout);
      this.expandTimeout = setTimeout(() => {
        this.treeControl.expand(node);
      }, this.expandDelay);
    }
  }

  dragHoverEnd(): void {
    if (this.dragging) {
      clearTimeout(this.expandTimeout);
    }
  }

  /**
   * The following methods are for persisting the tree expand state
   * after being rebuilt
   */

  private rebuildTreeForData(data: any) {
    this.rememberExpandedTreeNodes(this.treeControl, this.expandedNodeSet);
    this.dataSource.data = data;
    this.forgetMissingExpandedNodes(this.treeControl, this.expandedNodeSet);
    this.expandNodesById(this.treeControl.dataNodes, Array.from(this.expandedNodeSet));
  }

  private rememberExpandedTreeNodes(treeControl: FlatTreeControl<FileFlatNode>, expandedNodeSet: Set<string>) {
    if (treeControl.dataNodes) {
      treeControl.dataNodes.forEach((node) => {
        if (treeControl.isExpandable(node) && treeControl.isExpanded(node)) {
          // capture latest expanded state
          expandedNodeSet.add(node.id);
        }
      });
    }
  }

  private forgetMissingExpandedNodes(treeControl: FlatTreeControl<FileFlatNode>, expandedNodeSet: Set<string>) {
    if (treeControl.dataNodes) {
      expandedNodeSet.forEach((nodeId) => {
        // maintain expanded node state
        if (!treeControl.dataNodes.find((n) => n.id === nodeId)) {
          // if the tree doesn't have the previous node, remove it from the expanded list
          expandedNodeSet.delete(nodeId);
        }
      });
    }
  }

  private expandNodesById(flatNodes: FileFlatNode[], ids: string[]) {
    if (!flatNodes || flatNodes.length === 0) return;
    const idSet = new Set(ids);
    return flatNodes.forEach((node) => {
      if (idSet.has(node.id)) {
        this.treeControl.expand(node);
        let parent = this.getParentNode(node);
        while (parent) {
          this.treeControl.expand(parent);
          parent = this.getParentNode(parent);
        }
      }
    });
  }

  private getParentNode(node: FileFlatNode): FileFlatNode | null {
    const currentLevel = node.level;
    if (currentLevel < 1) return null;

    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;
    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];
      if (currentNode.level < currentLevel) {
        return currentNode;
      }
    }
    return null;
  }

}
