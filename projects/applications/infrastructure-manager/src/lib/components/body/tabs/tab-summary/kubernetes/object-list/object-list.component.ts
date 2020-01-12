import {Component, Input, OnInit} from '@angular/core';

import {MatTableDataSource} from '@anyopsos/lib-angular-material';

import {AnyOpsOSAppInfrastructureManagerService} from '../../../../../../services/anyopsos-app-infrastructure-manager.service';
import {AnyOpsOSAppInfrastructureManagerObjectHelperService} from '../../../../../../services/anyopsos-app-infrastructure-manager-object-helper.service';
import {ImDataObject} from '../../../../../../types/im-data-object';

class PeriodicElement {
}

@Component({
  selector: 'aaim-object-list',
  templateUrl: './object-list.component.html',
  styleUrls: ['./object-list.component.scss']
})
export class ObjectListComponent implements OnInit {
  @Input() nmObject: ImDataObject;
  @Input() listType: string;

  tableData: PeriodicElement[] = [
    {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
    {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
    {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
    {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
    {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
    {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
    {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
    {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
    {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
    {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
    {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
    {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
    {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
    {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
    {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
    {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
    {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
    {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
    {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
  ];

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<PeriodicElement>(this.tableData);

  constructor(private InfrastructureManager: AnyOpsOSAppInfrastructureManagerService,
              private InfrastructureManagerObjectHelper: AnyOpsOSAppInfrastructureManagerObjectHelperService) {
  }

  ngOnInit(): void {
  }

  showZeroState() {
    return this.tableData.length === 0;
  }

  setActiveObject(kubeObj: ImDataObject): void {
    return this.InfrastructureManager.setActiveObject(kubeObj.info.uuid);
  }

  getChildObjectsByType(childType: string): ImDataObject[] {
    return this.InfrastructureManagerObjectHelper.getChildObjectsByType(this.nmObject.info.mainUuid, childType, this.nmObject.info.obj);
  }

  getStatus(kubeObj: ImDataObject): {iconClass: string, iconName: string} {
    return {
      iconClass: 'asd',
      iconName: 'asd'
    };
  }

}
