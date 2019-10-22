import {Component, Input, OnDestroy} from '@angular/core';
import {includes} from 'lodash-es';
import {scaleLog} from 'd3-scale';
import {format as d3Format} from 'd3-format';
import * as filesize from 'filesize';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

import {colors} from 'weavescope/client/app/scripts/utils/color-utils';

const formatLargeValue = d3Format('s');

import {StateService} from '../../../services/state.service';


@Component({
  selector: '[slews-node-container]',
  templateUrl: './node-container.component.html',
  styleUrls: ['./node-container.component.scss']
})
export class NodeContainerComponent implements OnDestroy {
  @Input() matches;
  @Input() networks;
  @Input() metric;
  @Input() focused;
  @Input() highlighted;
  @Input() shape;
  @Input() tag;
  @Input() stacked;
  @Input() key;
  @Input() id;
  @Input() label;
  @Input() labelMinor;
  @Input() pseudo;
  @Input() rank;
  @Input() x;
  @Input() y;
  @Input() size;
  @Input() isAnimated;

  private destroySubject$: Subject<void> = new Subject();
  private showingNetworks;

  contrastMode;
  exportingGraph;
  searchTerms;
  height;
  metricFormattedValue;
  labelOffset;

  constructor(private State: StateService) {
    this.State.currentState.pipe(takeUntil(this.destroySubject$)).subscribe(state => {
      this.contrastMode = state.get('contrastMode');
      this.exportingGraph = state.get('exportingGraph');
      this.searchTerms = [state.get('searchQuery')];
      this.showingNetworks = state.get('showingNetworks');

      const {hasMetric, height, formattedValue} = this.getMetricValue(this.metric);
      this.height = height;
      this.metricFormattedValue = !this.pseudo && hasMetric ? formattedValue : '';
      this.labelOffset = (this.showingNetworks && this.networks) ? 10 : 0;
    });
  }

  ngOnDestroy() {
    this.destroySubject$.next();
  }

  getNodeColor(text = '', secondText = '', isPseudo = false) {
    if (isPseudo) {
      return '#b1b1cb';
    }
    return colors(text, secondText).toString();
  }

  getMetricColor(metric) {
    const metricId = typeof metric === 'string'
      ? metric
      : metric && metric.get('id');
    if (/mem/.test(metricId)) {
      return 'steelBlue';
    }
    if (/cpu/.test(metricId)) {
      return colors('cpu').toString();
    }
    if (/files/.test(metricId)) {
      // purple
      return '#9467bd';
    }
    if (/load/.test(metricId)) {
      return colors('load').toString();
    }
    return 'steelBlue';
  }

  makeFormatters(renderFn) {
    const formatters = {

      filesize(value) {
        const obj: any = (filesize as any).default(value, {output: 'object', round: 1});
        return renderFn(obj.value, obj.symbol);
      },

      integer(value) {
        const intNumber = Number(value).toFixed(0);
        if (value < 1100 && value >= 0) {
          return intNumber;
        }
        return formatLargeValue(intNumber);
      },

      number(value) {
        if (value < 1100 && value >= 0) {
          return Number(value).toFixed(2);
        }
        return formatLargeValue(value);
      },

      percent(value) {
        return renderFn(formatters.number(value), '%');
      }
    };

    return formatters;
  }

  makeFormatMetric(renderFn) {
    const formatters = this.makeFormatters(renderFn);
    return (value, opts) => {
      const formatter = opts && formatters[opts.format] ? opts.format : 'number';
      return formatters[formatter](value);
    };
  }

  renderSvg(text, unit) {
    return `${text}${unit}`;
  }

  formatMetricSvg = this.makeFormatMetric(this.renderSvg);

  getMetricValue(metric) {
    if (!metric) {
      return {formattedValue: 'n/a', height: 0, value: null};
    }
    const m = metric.toJS();
    const {value} = m;
    const loadScale = scaleLog().domain([0.01, 100]).range([0, 1]);

    let valuePercentage = value === 0 ? 0 : value / m.max;
    let {max} = m;
    if (includes(['load1', 'load5', 'load15'], m.id)) {
      valuePercentage = loadScale(value);
      max = null;
    }

    let displayedValue = Number(value);
    if (displayedValue > 0 && (!max || displayedValue < max)) {
      const baseline = 0.1;
      displayedValue = (valuePercentage * (1 - (baseline * 2))) + baseline;
    } else if (displayedValue >= m.max && displayedValue > 0) {
      displayedValue = 1;
    }

    return {
      formattedValue: this.formatMetricSvg(value, m),
      hasMetric: value !== null,
      height: displayedValue
    };
  }

}
