import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';

import { Observable, Subject, fromEvent} from 'rxjs';
import {switchMap, map, takeUntil, tap} from 'rxjs/operators';

import {clamp, debounce} from 'lodash-es';
import {scaleLog, ScaleLogarithmic} from 'd3-scale';

import {AnyOpsOSLibDiagramStateService} from '../../services/anyopsos-lib-diagram-state.service';
import {AnyOpsOSLibDiagramService} from '../../services/anyopsos-lib-diagram.service';
import {AnyOpsOSLibDiagramZoomUtilsService} from '../../services/anyopsos-lib-diagram-zoom-utils.service';
import {LayoutLimits} from '../../types/layout-limits';
import {SvgDomRect} from '../../types/svg-dom-rect';
import {SvgDomPos} from '../../types/svg-dom-pos';
import {ZoomState} from '../../types/zoom-state';

@Component({
  selector: 'aldiagram-zoomable-canvas',
  templateUrl: './zoomable-canvas.component.html',
  styleUrls: ['./zoomable-canvas.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ZoomableCanvasComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('canvas', {read: ElementRef, static: false}) private readonly canvas: ElementRef;
  private readonly destroySubject$: Subject<void> = new Subject();
  private readonly debouncedCacheZoom: debounce = debounce(this.cacheZoom.bind(this), 500);

  private SLIDER_STEP: number = 0.001;
  private CLICK_STEP: number = 0.05;

  zoomableState: ZoomState = {
    contentMaxX: 0,
    contentMaxY: 0,
    contentMinX: 0,
    contentMinY: 0,
    maxScale: 1,
    minScale: 1,
    scaleX: 1,
    scaleY: 1,
    translateX: 0,
    translateY: 0,
  };

  selectedNodeUuid$: Observable<string>;
  readonly zoomStateToString$: Subject<string> = new Subject();
  readonly isPanning$: Subject<boolean> = new Subject();

  constructor(private readonly renderer: Renderer2,
              private readonly LibDiagram: AnyOpsOSLibDiagramService,
              private readonly LibDiagramState: AnyOpsOSLibDiagramStateService,
              private readonly LibDiagramZoomUtils: AnyOpsOSLibDiagramZoomUtilsService) {
  }

  ngOnInit(): void {

    // Listen for selectedNodeUuid change
    this.selectedNodeUuid$ = this.LibDiagramState.selectedNodeUuid;

    // Listen for zoomState change
    this.LibDiagramState.zoomState
      .pipe(takeUntil(this.destroySubject$)).subscribe((zoomState: ZoomState) => this.transformZoomStateToString(zoomState));

    // Listen for forceRelayout change
    this.LibDiagramState.forceRelayout
      .pipe(takeUntil(this.destroySubject$)).subscribe((forceRelayout: boolean) => {
        if (!forceRelayout) return;
        this.debouncedCacheZoom.cancel();

        this.updateZoomLimits();
        this.restoreZoomState();
      });

  }

  ngAfterViewInit(): void {
    this.updateZoomLimits();
    this.restoreZoomState();

    /**
     * DRAG SVG
     */
    const mousedown$: Observable<any> = fromEvent(this.canvas.nativeElement, 'mousedown', {passive: true});
    const mousemove$ = fromEvent(document, 'mousemove', {passive: true});
    const mouseup$ = fromEvent(document, 'mouseup', {passive: true});
    const mousedrag$ = mousedown$.pipe(
      switchMap((event: MouseEvent) => {
        let prevX = event.clientX;
        let prevY = event.clientY;

        this.isPanning$.next(true);

        return mousemove$
          .pipe(
            map((event: MouseEvent) => {
              event.preventDefault();

              let delta = {
                dx: event.clientX - prevX,
                dy: event.clientY - prevY
              };
              prevX = event.clientX;
              prevY = event.clientY;

              return delta;
            }),
            takeUntil(mouseup$)
          );
      }),
      takeUntil(this.destroySubject$)
    );

    mousedrag$.subscribe((delta: { dx, dy }) => {
      if (delta.dx === 0 && delta.dy === 0) return;

      // Apply the translation respecting the boundaries.
      this.zoomableState = this.clampedTranslation({
        ...this.zoomableState,
        translateX: this.zoomableState.translateX + delta.dx,
        translateY: this.zoomableState.translateY + delta.dy,
      });

      return this.updateState();
    });

    mouseup$.subscribe(() => {
      this.isPanning$.next(false);
    });

    /**
     * WHEEL SVG ZOOM
     */
    const wheel$ = fromEvent(this.canvas.nativeElement, 'wheel', {passive: false}).pipe(
      takeUntil(this.destroySubject$),
      tap((event: WheelEvent) => {
        event.preventDefault();
      })
    );

    wheel$.subscribe((event: WheelEvent) => this.handleZoom(event));
  }

  ngOnDestroy(): void {

    // Remove all listeners
    this.destroySubject$.next();
  }

  private transformZoomStateToString({translateX = 0, translateY = 0, scaleX = 1, scaleY = 1}): void {
    this.zoomStateToString$.next(`translate(${translateX},${translateY}) scale(${scaleX},${scaleY})`);
  }

  /**
   * Initiation
   */
  updateZoomLimits(): void {
    const layoutLimits: LayoutLimits = this.LibDiagram.layoutLimits();
    this.zoomableState = {...this.zoomableState, ...layoutLimits};
  }

  private restoreZoomState(): void {
    const graphZoomState: ZoomState = this.LibDiagram.graphZoomState();

    if (graphZoomState === null) return;

    // Update the state variables.
    this.zoomableState = {...this.zoomableState, ...graphZoomState};
    this.updateState();
  }

  /**
   * Save state
   */
  private updateState(): void {

    // Do not debounce on drag
    //const isPanning: boolean = await this.isPanning$.pipe(take(1)).toPromise();
    //if (isPanning) return this.cacheZoom();

     //this.debouncedCacheZoom();

    return this.cacheZoom();
  }

  private cacheZoom(): void {
    return this.LibDiagramState.setZoomState(this.zoomableState);
  }

  /**
   * Mouse click
   */
  handleMouseClick(): void {
    this.LibDiagramState.setSelectedNodeUuid(null);
  }

  /**
   * Mouse wheel
   */
  private handleZoom(event: WheelEvent): void {
    if (this.canChangeZoom()) {

      // Get the exact mouse cursor position in the SVG and zoom around it.
      const {top, left} = this.canvas.nativeElement.getBoundingClientRect();
      const mousePosition = {
        x: event.clientX - left,
        y: event.clientY - top,
      };

      this.zoomAtPositionByFactor(mousePosition, this.LibDiagramZoomUtils.zoomFactor(event));
    }
  }

  private canChangeZoom(): boolean {
    const layoutLimits: LayoutLimits = this.LibDiagram.layoutLimits();

    const canvasHasContent: boolean = layoutLimits !== null;
    const selectedNodeUuid: string = this.LibDiagramState.$selectedNodeUuid.getValue();
    return !selectedNodeUuid && canvasHasContent;
  }

  /**
   * Zoom
   */
  private getSliderValue(): number {
    const toSliderValue: ScaleLogarithmic<number, number> = this.getSliderScale();
    return toSliderValue(this.zoomableState.scaleX);
  }

  private toZoomScale(sliderValue: number): number {
    const toSliderValue: ScaleLogarithmic<number, number> = this.getSliderScale();
    return toSliderValue.invert(sliderValue);
  }

  private getSliderScale(): ScaleLogarithmic<number, number> {
    return scaleLog()
      // Zoom limits may vary between different views.
      .domain([this.zoomableState.minScale, this.zoomableState.maxScale])
      // Taking the unit range for the slider ensures consistency
      // of the zoom button steps across different zoom domains.
      .range([0, 1])
      // This makes sure the input values are always clamped into the valid domain/range.
      .clamp(true);
  }

  private zoomAtPositionByFactor(position: { x: number; y: number; }, factor: number): void {

    // Update the scales by the given factor, respecting the zoom limits.
    const {minScale, maxScale} = this.zoomableState;
    const scaleX: number = clamp(this.zoomableState.scaleX * factor, minScale, maxScale);
    const scaleY: number = clamp(this.zoomableState.scaleY * factor, minScale, maxScale);
    let zoomableState: ZoomState = {...this.zoomableState, scaleX, scaleY};

    // Get the position in the coordinates before the transition and use it to adjust the translation
    // part of the new transition (respecting the translation limits). Adapted from:
    // https://github.com/d3/d3-zoom/blob/807f02c7a5fe496fbd08cc3417b62905a8ce95fa/src/zoom.js#L251
    const inversePosition: SvgDomPos = ZoomableCanvasComponent.inverseTransform(this.zoomableState, position);
    this.zoomableState = this.clampedTranslation({
      ...zoomableState,
      translateX: position.x - (inversePosition.x * scaleX),
      translateY: position.y - (inversePosition.y * scaleY),
    });

    this.updateState();
  }

  private static inverseTransform(transform: ZoomState, { width = 0, height = 0, x, y }: { width?: number; height?: number; x: number; y: number; }): SvgDomPos {
    const inverseTranslateX = ({scaleX = 1, translateX = 0}, parentx) => (parentx - translateX) / scaleX;
    const inverseTranslateY = ({scaleY = 1, translateY = 0}, parenty) => (parenty - translateY) / scaleY;
    const inverseScaleX = ({scaleX = 1}, parentwidth) => parentwidth / scaleX;
    const inverseScaleY = ({scaleY = 1}, parentheight) => parentheight / scaleY;

    return {
      height: inverseScaleY(transform, height),
      width: inverseScaleX(transform, width),
      x: inverseTranslateX(transform, x),
      y: inverseTranslateY(transform, y),
    };
  }

  private static applyTransform(transform: ZoomState, {width = 0, height = 0, x, y}: { width?: number; height?: number; x: number; y: number; }): SvgDomPos {
    const applyTranslateX = ({scaleX = 1, translateX = 0}, parentx) => (parentx * scaleX) + translateX;
    const applyTranslateY = ({scaleY = 1, translateY = 0}, parenty) => (parenty * scaleY) + translateY;
    const applyScaleX = ({scaleX = 1}, parentwidth) => parentwidth * scaleX;
    const applyScaleY = ({scaleY = 1}, parentheight) => parentheight * scaleY;

    return {
      height: applyScaleY(transform, height),
      width: applyScaleX(transform, width),
      x: applyTranslateX(transform, x),
      y: applyTranslateY(transform, y),
    };
  }

  private clampedTranslation(zoomState: ZoomState): ZoomState {
    const canvasMargins: SvgDomRect = this.LibDiagram.canvasMargins();
    const canvasWidth: number = this.LibDiagram.canvasWidth();
    const canvasHeight: number = this.LibDiagram.canvasHeight();

    const {contentMinX, contentMaxX, contentMinY, contentMaxY} = this.zoomableState;

    // If the content is required to be bounded in any way, the translation will
    // be adjusted so that certain constraints between the viewport and displayed
    // content bounding box are met.
    const viewportMin: { x: number; y: number; } = {x: canvasMargins.left, y: canvasMargins.top};
    const viewportMax: { x: number; y: number; } = {x: canvasMargins.left + canvasWidth, y: canvasMargins.top + canvasHeight};
    const contentMin: SvgDomPos = ZoomableCanvasComponent.applyTransform(zoomState, {x: contentMinX, y: contentMinY});
    const contentMax: SvgDomPos = ZoomableCanvasComponent.applyTransform(zoomState, {x: contentMaxX, y: contentMaxY});

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

  private handleZoomControlAction(scale: number): void {

    // Get the center of the SVG and zoom around it.
    const {top, bottom, left, right}: SvgDomRect = this.canvas.nativeElement.getBoundingClientRect();

    const centerOfCanvas: { x: number; y: number; } = {
      x: (left + right) / 2,
      y: (top + bottom) / 2,
    };

    // Zoom factor diff is obtained by dividing the new zoom scale with the old one.
    this.zoomAtPositionByFactor(centerOfCanvas, scale / this.zoomableState.scaleX);
  }

  handleZoomOut(): void {
    const sliderValue: number = this.getSliderValue() - this.CLICK_STEP;
    const zoomScale: number = this.toZoomScale(sliderValue);

    this.handleZoomControlAction(zoomScale);
  }

  handleZoomIn(): void {
    const sliderValue: number = this.getSliderValue() + this.CLICK_STEP;
    const zoomScale: number = this.toZoomScale(sliderValue);

    this.handleZoomControlAction(zoomScale);
  }

}
