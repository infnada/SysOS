import {Injectable} from '@angular/core';

import {BehaviorSubject} from 'rxjs';

import {FileNode} from '../types/file-node';

const TREE_DATA: string = JSON.stringify({
  inventories: {
  },
  library: { // if any custom modules, put them here (optional)
  },
  module_utils: { // if any custom module_utils to support modules, put them here (optional)
  },
  filter_plugins: { // if any custom filter plugins, put them here (optional)
  },
  roles: {
    common: { // this hierarchy represents a "role"
      defaults: {
        main: 'yaml' // default lower priority variables for this role
      },
      handlers: {
        main: 'yaml' // handlers file
      },
      meta: {
        main: 'yaml' // role dependencies
      },
      tasks: {
        main: 'yaml' // tasks file can include smaller files if warranted
      },
      templates: { // files for use with the template resource

      },
      files: {

      },
      vars: { // variables associated with this role
        main: 'yaml'
      },
      library: { // roles can also include custom modules
      },
      module_utils: { // roles can also include custom module_utils
      },
      filter_plugins: { // or other types of plugins, like lookup in this case
      }
    }
  }
});

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSAppInfrastructureAsCodeProjectTreeService {
  dataChange: BehaviorSubject<FileNode[]> = new BehaviorSubject([]);

  get data(): FileNode[] { return this.dataChange.value; }

  constructor() {
    this.initialize();
  }

  private initialize(): void {
    // Parse the string to json object.
    const dataObject = JSON.parse(TREE_DATA);

    // Build the tree nodes from Json object. The result is a list of `FileNode` with nested file node as children.
    const data = this.buildFileTree(dataObject, 0);

    // Notify the change.
    this.dataChange.next(data);
  }

  /**
   * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
   * The return value is the list of `FileNode`.
   */
  private buildFileTree(obj: {[key: string]: any}, level: number, parentId: string = '0'): FileNode[] {
    return Object.keys(obj).reduce<FileNode[]>((accumulator, key, idx) => {
      const value = obj[key];
      const node = new FileNode();
      node.fileName = key;
      /**
       * Make sure your node has an id so we can properly rearrange the tree during drag'n'drop.
       * By passing parentId to buildFileTree, it constructs a path of indexes which make
       * it possible find the exact sub-array that the node was grabbed from when dropped.
       */
      node.id = `${parentId}/${idx}`;

      if (value != null) {
        if (typeof value === 'object') {
          node.children = this.buildFileTree(value, level + 1, node.id);
        } else {
          node.type = value;
        }
      }

      return accumulator.concat(node);
    }, []);
  }
}
