import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort, MatTableDataSource} from '@angular/material';

export interface TagElement {
  tag: string;
  category: string;
  description: string;
}

const TAGS_DATA: TagElement[] = [
  {tag: 'testt', category: 'test', description: 'testt'}
];


@Component({
  selector: 'saim-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['tag', 'category', 'description'];
  dataSource = new MatTableDataSource(TAGS_DATA);

  constructor() { }

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }

}
