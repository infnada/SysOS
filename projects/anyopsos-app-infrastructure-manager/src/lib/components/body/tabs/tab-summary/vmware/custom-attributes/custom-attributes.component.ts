import {Component, OnInit, ViewChild} from '@angular/core';

import {MatSort, MatTableDataSource} from '@anyopsos/lib-angular-material';

export interface AttributeElement {
  attribute: string;
  value: string;
  type: string;
}

const ATTRIBUTES_DATA: AttributeElement[] = [
  {attribute: 'testt', value: 'test', type: 'vm'}
];

@Component({
  selector: 'saim-custom-attributes',
  templateUrl: './custom-attributes.component.html',
  styleUrls: ['./custom-attributes.component.scss']
})
export class CustomAttributesComponent implements OnInit {
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  displayedColumns: string[] = ['attribute', 'value'];
  dataSource = new MatTableDataSource(ATTRIBUTES_DATA);

  constructor() { }

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
  }
}
