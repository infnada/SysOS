import {Injectable} from '@angular/core';

import * as easyPieChart from 'easy-pie-chart/dist/easypiechart.js';

@Injectable({
  providedIn: 'root'
})
export class SysosLibExtEasypiechartService {

  public easyPieChart: easyPieChart;

  constructor() {
    this.easyPieChart = easyPieChart.default;
  }
}
