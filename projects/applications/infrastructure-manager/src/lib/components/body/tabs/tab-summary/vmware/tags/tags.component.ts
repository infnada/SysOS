import {Component, OnInit, ViewChild} from '@angular/core';

import {MatSort, MatTableDataSource} from '@anyopsos/lib-angular-material';

export interface TagElement {
  tag: string;
  category: string;
  description: string;
}

const TAGS_DATA: TagElement[] = [
  {tag: 'testt', category: 'test', description: 'testt'}
];


@Component({
  selector: 'aaim-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  displayedColumns: string[] = ['tag', 'category', 'description'];
  dataSource = new MatTableDataSource(TAGS_DATA);

  constructor() { }

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
  }

}
