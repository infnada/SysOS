import {Component, Input, OnDestroy, AfterViewInit} from '@angular/core';
import {clamp, debounce, pick} from 'lodash-es';
import {fromJS} from 'immutable';
import {drag} from 'd3-drag';
import {scaleLog} from 'd3-scale';
import {event as d3Event, select} from 'd3-selection';
import stableStringify from 'json-stable-stringify';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

import {zoomFactor} from 'weaveworks-ui-components/lib/utils/zooming';

import {StateService} from '../../services/state.service';
import {SelectorsService} from '../../services/selectors.service';
import {NodeDetailsUtilsService} from '../../services/utils/node-details-utils.service';

@Component({
  selector: 'slews-zoomable-canvas',
  templateUrl: './zoomable-canvas.component.html',
  styleUrls: ['./zoomable-canvas.component.scss']
})
export class ZoomableCanvasComponent implements AfterViewInit, OnDestroy {
  @Input() disabled;
  @Input() fixHorizontal;
  @Input() fixVertical;

  private destroySubject$: Subject<void> = new Subject();
  private state;

  private debouncedCacheZoom = debounce(this.cacheZoom.bind(this), 500);
  private drag;
  private svg;
  private zoomRestored: boolean;

  private canvasMargins;
  private forceRelayout;
  private height;
  private layoutId;
  private layoutLimits;
  private layoutZoomState;
  private width;

  private SLIDER_STEP = 0.001;
  private CLICK_STEP = 0.05;

  selectedNodeId: string;

  zoomState = {
    contentMaxX: 0,
    contentMaxY: 0,
    contentMinX: 0,
    contentMinY: 0,
    isPanning: false,
    maxScale: 1,
    minScale: 1,
    scaleX: 1,
    scaleY: 1,
    translateX: 0,
    translateY: 0,
  };

  constructor(private State: StateService,
              private Selectors: SelectorsService,
              private NodeDetailsUtils: NodeDetailsUtilsService) {
    this.handleZoomControlAction = this.handleZoomControlAction.bind(this);
    this.canChangeZoom = this.canChangeZoom.bind(this);
    this.handleZoom = this.handleZoom.bind(this);
    this.handlePanStart = this.handlePanStart.bind(this);
    this.handlePanEnd = this.handlePanEnd.bind(this);
    this.handlePan = this.handlePan.bind(this);

    this.State.currentState.pipe(takeUntil(this.destroySubject$)).subscribe(state => {
      this.state = state;
      this.canvasMargins = this.Selectors.canvasMarginsSelector(state);
      this.forceRelayout = this.state.get('forceRelayout');
      this.height = this.Selectors.canvasHeightSelector(state);

      if (this.layoutId !== stableStringify(this.Selectors.activeTopologyZoomCacheKeyPathSelector(state)) || this.forceRelayout) {
        this.debouncedCacheZoom.cancel();
        this.zoomRestored = false;
      }

      this.layoutId = stableStringify(this.Selectors.activeTopologyZoomCacheKeyPathSelector(state));
      this.layoutLimits = this.Selectors.graphLimitsSelector(state);
      this.layoutZoomState = this.Selectors.graphZoomStateSelector(state);
      this.width = this.Selectors.canvasWidthSelector(state);

      this.selectedNodeId = state.get('selectedNodeId');

      this.updateZoomLimits(this);
      if (!this.zoomRestored) {
        this.restoreZoomState(this);
      }
    });
  }

  ngAfterViewInit() {
    this.svg = select('.zoomable-canvas svg');
    this.drag = drag()
      .on('start', this.handlePanStart)
      .on('end', this.handlePanEnd)
      .on('drag', this.handlePan);
    this.svg.call(this.drag);

    this.zoomRestored = false;

    this.updateZoomLimits(this);
    this.restoreZoomState(this);
    document
      .getElementById('canvas')
      .addEventListener('wheel', this.handleZoom, {passive: false});
  }

  ngOnDestroy() {
    this.destroySubject$.next();
    this.debouncedCacheZoom.cancel();
    document
      .getElementById('canvas')
      .removeEventListener('wheel', this.handleZoom);
  }

  applyTransform(transform, {width = 0, height = 0, x, y}) {
    const applyTranslateX = ({scaleX = 1, translateX = 0}, x) => (x * scaleX) + translateX;
    const applyTranslateY = ({scaleY = 1, translateY = 0}, y) => (y * scaleY) + translateY;
    const applyScaleX = ({scaleX = 1}, width) => width * scaleX;
    const applyScaleY = ({scaleY = 1}, height) => height * scaleY;

    return {
      height: applyScaleY(transform, height),
      width: applyScaleX(transform, width),
      x: applyTranslateX(transform, x),
      y: applyTranslateY(transform, y),
    };
  }

  inverseTransform(transform, {width = 0, height = 0, x, y}) {
    const inverseTranslateX = ({scaleX = 1, translateX = 0}, x) => (x - translateX) / scaleX;
    const inverseTranslateY = ({scaleY = 1, translateY = 0}, y) => (y - translateY) / scaleY;
    const inverseScaleX = ({scaleX = 1}, width) => width / scaleX;
    const inverseScaleY = ({scaleY = 1}, height) => height / scaleY;

    return {
      height: inverseScaleY(transform, height),
      width: inverseScaleX(transform, width),
      x: inverseTranslateX(transform, x),
      y: inverseTranslateY(transform, y),
    };
  }

  transformToString({translateX = 0, translateY = 0, scaleX = 1, scaleY = 1}) {
    return `translate(${translateX},${translateY}) scale(${scaleX},${scaleY})`;
  }

  handleMouseClick() {
    if (this.selectedNodeId) {
      if (this.state.get('showingHelp')) {
        this.state = this.state.set('showingHelp', false);
      }

      if (this.state.get('showingTroubleshootingMenu')) {
        this.state = this.state.set('showingTroubleshootingMenu', false);
      }

      this.state = this.NodeDetailsUtils.closeAllNodeDetails(this.state);
      this.State.setState(this.state);

      // TODO updateRoute(getState);

    }
  }

  handleZoomControlAction(scale) {
    // Get the center of the SVG and zoom around it.
    const {top, bottom, left, right} = this.svg.node().getBoundingClientRect();
    const centerOfCanvas = {
      x: (left + right) / 2,
      y: (top + bottom) / 2,
    };
    // Zoom factor diff is obtained by dividing the new zoom scale with the old one.
    this.zoomAtPositionByFactor(centerOfCanvas, scale / this.zoomState.scaleX);
  }

  // Decides which part of the zoom state is cachable depending
  // on the horizontal/vertical degrees of freedom.
  cachableState(zoomState = this.zoomState) {
    const cachableFields = []
      .concat(this.fixHorizontal ? [] : ['scaleX', 'translateX'])
      .concat(this.fixVertical ? [] : ['scaleY', 'translateY']);

    return pick(zoomState, cachableFields);
  }

  cacheZoom() {
    this.state = this.state.setIn(
      this.Selectors.activeTopologyZoomCacheKeyPathSelector(this.state),
      fromJS(this.cachableState()).filter(value => !(window as any).isNaN(value))
    );

    return this.State.setState(this.state);
  }

  updateZoomLimits(props) {
    const layoutLimits = props.layoutLimits.toJS();
    this.zoomState = {...this.zoomState, ...layoutLimits};
  }

  // Restore the zooming settings
  restoreZoomState(props) {
    if (!props.layoutZoomState.isEmpty()) {
      const zoomState = props.layoutZoomState.toJS();

      // Update the state variables.
      this.zoomState = {...this.zoomState, ...zoomState};
      this.zoomRestored = true;
    }
  }

  canChangeZoom() {
    const canvasHasContent = !this.layoutLimits.isEmpty();
    return !this.disabled && canvasHasContent;
  }

  handlePanStart() {
    this.zoomState.isPanning = true;
  }

  handlePanEnd() {
    this.zoomState.isPanning = false;
  }

  handlePan() {
    let {zoomState} = this;
    // Apply the translation respecting the boundaries.
    zoomState = this.clampedTranslation({
      ...zoomState,
      translateX: this.zoomState.translateX + d3Event.dx,
      translateY: this.zoomState.translateY + d3Event.dy,
    });
    this.updateState(zoomState);
  }

  handleZoom(ev) {
    if (this.canChangeZoom()) {
      // Get the exact mouse cursor position in the SVG and zoom around it.
      const {top, left} = this.svg.node().getBoundingClientRect();
      const mousePosition = {
        x: ev.clientX - left,
        y: ev.clientY - top,
      };
      this.zoomAtPositionByFactor(mousePosition, zoomFactor(ev));
    }
    ev.preventDefault();
  }

  clampedTranslation(zoomState) {
    const {contentMinX, contentMaxX, contentMinY, contentMaxY} = this.layoutLimits.toJS();

    // If the content is required to be bounded in any way, the translation will
    // be adjusted so that certain constraints between the viewport and displayed
    // content bounding box are met.
    const viewportMin = {x: this.canvasMargins.left, y: this.canvasMargins.top};
    const viewportMax = {x: this.canvasMargins.left + this.width, y: this.canvasMargins.top + this.height};
    const contentMin = this.applyTransform(zoomState, {x: contentMinX, y: contentMinY});
    const contentMax = this.applyTransform(zoomState, {x: contentMaxX, y: contentMaxY});

    // These lines will adjust the translation by 'minimal effort' in
    // such a way that the content is always at least PARTLY contained
    // within the viewport, i.e. that the intersection between the
    // viewport and the content bounding box always exists.
    zoomState.translateX -= Math.max(0, contentMin.x - viewportMax.x);
    zoomState.translateX += Math.max(0, viewportMin.x - contentMax.x);
    zoomState.translateY -= Math.max(0, contentMin.y - viewportMax.y);
    zoomState.translateY += Math.max(0, viewportMin.y - contentMax.y);

    return zoomState;
  }

  zoomAtPositionByFactor(position, factor) {
    // Update the scales by the given factor, respecting the zoom limits.
    const {minScale, maxScale} = this.zoomState;
    const scaleX = clamp(this.zoomState.scaleX * factor, minScale, maxScale);
    const scaleY = clamp(this.zoomState.scaleY * factor, minScale, maxScale);
    let zoomState = {...this.zoomState, scaleX, scaleY};

    // Get the position in the coordinates before the transition and use it
    // to adjust the translation part of the new transition (respecting the
    // translation limits). Adapted from:
    // https://github.com/d3/d3-zoom/blob/807f02c7a5fe496fbd08cc3417b62905a8ce95fa/src/zoom.js#L251
    const inversePosition = this.inverseTransform(this.zoomState, position);
    zoomState = this.clampedTranslation({
      ...zoomState,
      translateX: position.x - (inversePosition.x * scaleX),
      translateY: position.y - (inversePosition.y * scaleY),
    });

    this.updateState(zoomState);
  }

  updateState(zoomState) {
    this.zoomState = this.cachableState(zoomState);
    this.debouncedCacheZoom();
  }

  handleZoomOut() {
    const sliderValue = this.getSliderValue() - this.CLICK_STEP;
    const zoomScale = this.toZoomScale(sliderValue);
    this.handleZoomControlAction(zoomScale);
  }

  handleZoomIn() {
    this.handleZoomControlAction(this.toZoomScale(this.getSliderValue() + this.CLICK_STEP));
  }

  getSliderScale() {
    return scaleLog()
    // Zoom limits may vary between different views.
      .domain([this.zoomState.minScale, this.zoomState.maxScale])
      // Taking the unit range for the slider ensures consistency
      // of the zoom button steps across different zoom domains.
      .range([0, 1])
      // This makes sure the input values are always clamped into the valid domain/range.
      .clamp(true);
  }

  getSliderValue() {
    const toSliderValue = this.getSliderScale();
    return toSliderValue(this.zoomState.scaleX);
  }

  toZoomScale(sliderValue) {
    const toSliderValue = this.getSliderScale();
    return toSliderValue.invert(sliderValue);
  }

  handleChange(sliderValue) {
    this.handleZoomControlAction(this.toZoomScale(sliderValue));
  }
}
