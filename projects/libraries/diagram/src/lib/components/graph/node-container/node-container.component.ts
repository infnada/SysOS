import {Component, Input, OnInit, OnDestroy, ChangeDetectionStrategy} from '@angular/core';

import {combineLatest, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {scaleLog} from 'd3-scale';
import {format as d3Format} from 'd3-format';
import filesize from 'filesize';

import {AnyOpsOSLibDiagramStateService} from '../../../services/anyopsos-lib-diagram-state.service';
import {colors} from '../../../utils/color-utils';
import {LayoutNode} from '../../../types/layout-node';
import {Metric} from '../../../types/metric';


const formatLargeValue = d3Format('s');

@Component({
  selector: '[aldiagram-node-container]',
  templateUrl: './node-container.component.html',
  styleUrls: ['./node-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NodeContainerComponent implements OnInit, OnDestroy {
  @Input() nodeElement: LayoutNode;
  @Input() isAnimated: boolean;

  private destroySubject$: Subject<void> = new Subject();
  private showingNetworks: boolean;

  contrastMode;
  exportingGraph;
  searchTerms;
  height;
  metricFormattedValue;
  labelOffset;

  formatMetricSvg = this.makeFormatMetric(this.renderSvg);

  constructor(private readonly LibDiagramState: AnyOpsOSLibDiagramStateService) {

  }

  ngOnInit(): void {

    // Listen for state changes. Update zoom if needed
    combineLatest(
      this.LibDiagramState.contrastMode,
      this.LibDiagramState.exportingGraph,
      this.LibDiagramState.searchQuery,
      this.LibDiagramState.showingNetworks
    ).pipe(takeUntil(this.destroySubject$)).subscribe(async ([contrastMode, exportingGraph, searchQuery, showingNetworks]) => {

      this.contrastMode = contrastMode;
      this.exportingGraph = exportingGraph;
      this.searchTerms = [searchQuery];
      this.showingNetworks = showingNetworks;

      const {hasMetric, height, formattedValue} = this.getMetricValue(this.nodeElement.metric);
      this.height = height;
      this.metricFormattedValue = !this.nodeElement.pseudo && hasMetric ? formattedValue : '';
      this.labelOffset = (this.showingNetworks && this.nodeElement.networks) ? 10 : 0;
    });
  }

  ngOnDestroy(): void {

    // Remove all listeners
    this.destroySubject$.next();
  }

  getNodeColor(text = '', secondText = '', isPseudo = false) {
    if (isPseudo) {
      return '#b1b1cb';
    }
    return colors(text, secondText).toString();
  }

  getMetricColor(metric: string | Metric): string {
    const metricId = typeof metric === 'string'
      ? metric
      : metric && metric.id;
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

  makeFormatters(renderFn: (...args) => string): { number(value): (string); filesize(value): string; integer(value): (string); percent(value): string } {
    const formatters = {

      filesize(value) {
        // @ts-ignore TODO
        const obj: { value: number; symbol: unknown; } = filesize(value, {output: 'object', round: 1});
        return renderFn(obj.value, obj.symbol);
      },

      integer(value) {
        const intNumber = Number(value).toFixed(0);

        if (value < 1100 && value >= 0) return intNumber;

        return formatLargeValue(parseInt(intNumber));
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

  renderSvg(text: string, unit: string): string {
    return `${text}${unit}`;
  }

  getMetricValue(metric: Metric): {
    formattedValue: string;
    hasMetric?: boolean;
    height: number;
    value?: string;
  } {
    if (!metric) return { formattedValue: 'n/a', height: 0, value: null };

    const {value} = metric;
    const loadScale = scaleLog().domain([0.01, 100]).range([0, 1]);

    let valuePercentage = value === 0 ? 0 : value / metric.max;
    let {max} = metric;
    if (['load1', 'load5', 'load15'].includes(metric.id)) {
      valuePercentage = loadScale(value);
      max = null;
    }

    let displayedValue: number = Number(value);
    if (displayedValue > 0 && (!max || displayedValue < max)) {
      const baseline: number = 0.1;
      displayedValue = (valuePercentage * (1 - (baseline * 2))) + baseline;
    } else if (displayedValue >= metric.max && displayedValue > 0) {
      displayedValue = 1;
    }

    return {
      formattedValue: this.formatMetricSvg(value, metric),
      hasMetric: value !== null,
      height: displayedValue
    };
  }

}
