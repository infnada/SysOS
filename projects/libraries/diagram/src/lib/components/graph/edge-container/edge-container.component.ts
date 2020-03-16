import {ChangeDetectionStrategy, Component, Input, OnInit, SimpleChanges} from '@angular/core';

import {line, curveBasis, Line} from 'd3-shape';

import {LayoutEdge} from '../../../types/layout-edge';

@Component({
  selector: '[aldiagram-edge-container]',
  templateUrl: './edge-container.component.html',
  styleUrls: ['./edge-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EdgeContainerComponent implements OnInit {
  @Input() edgeElement: LayoutEdge;
  @Input() isAnimated: boolean;

  private waypointsMap: { [key: string]: number; } = {};
  private spline = line()
    .curve(curveBasis)
    // @ts-ignore TODO
    .x(d => d.x)
    // @ts-ignore TODO
    .y(d => d.y);

  thickness: number = 1;

  constructor() {
  }

  ngOnInit(): void {
    this.prepareWaypointsForMotion();
  }

  ngOnChanges(nextProps: SimpleChanges): void {
    if (nextProps.edgeElement && nextProps.isAnimated) {
      const waypointsChanged: boolean = this.edgeElement.points !== nextProps.edgeElement.currentValue.points;
      const animationChanged: boolean = this.isAnimated !== nextProps.isAnimated.currentValue;
      if (waypointsChanged || animationChanged) {
        this.prepareWaypointsForMotion();
      }
    }

    if (nextProps.scale && nextProps.focused) {
      // Edge thickness will reflect the zoom scale.
      const baseScale: number = (nextProps.edgeElement.currentValue.scale * 0.01) * 100;
      const newTickness: number = (nextProps.edgeElement.currentValue.focused ? 3 : 1) * baseScale;

      if (this.thickness !== newTickness) this.thickness = newTickness;
    }
  }

  private spring(val: number, config?: { [key: string]: any; }): { [key: string]: any; } {
    const defaultConfig = {
      stiffness: 170,
      damping: 26,
      precision: 0.01,
    };
    return {...defaultConfig, ...config, val};
  }

  weakSpring(value: number): { [key: string]: number; } {
    return this.spring(value, {damping: 18, precision: 1, stiffness: 100});
  }

  getMotionStyle() {
    return { interpolatedThickness: this.weakSpring(this.thickness), ...this.waypointsMap};
  }

  getEdgePath(animated?: boolean): Line<[number, number]> {
    // @ts-ignore TODO
    if (animated) return this.spline(this.waypointsMapToArray(this.waypointsMap));
    // @ts-ignore TODO
    return this.spline(this.edgeElement.points);
  }

  private waypointsMapToArray(waypointsMap: { [key: string]: number; }): { x: number; y:number; }[] {

    const waypointsArray: { x: number; y:number; }[] = [];

    Object.keys(waypointsMap).forEach((key: string) => {
      const [axis, index] = [key[0], key.slice(1)];

      if (!waypointsArray[index]) waypointsArray[index] = {};
      waypointsArray[index][axis] = waypointsMap[key];
    });

    return waypointsArray;
  }

  // Converts a waypoints array of the input format [{ x: 11, y: 22 }, { x: 33, y: 44 }]
  // to an array of waypoints that is used by Motion in the format { x0: 11, y0: 22, x1: 33, y1: 44 }.
  private waypointsArrayToMap(waypointsArray: { x: number; y: number; }[]): { [key: string]: number; } {
    let waypointsMap = {};

    waypointsArray.forEach((point, index) => {
      waypointsMap[`x${index}`] = this.weakSpring(point.x);
      waypointsMap[`y${index}`] = this.weakSpring(point.y);
    });

    return waypointsMap;
  }

  private prepareWaypointsForMotion(): void {
    // Don't update if the edges are not animated.
    if (!this.isAnimated) return;

    // The Motion library requires the number of waypoints to be constant, so we fill in for
    // the missing ones by reusing the edge source point, which doesn't affect the edge shape
    // because of how the curveBasis interpolation is done.
    const waypointsMissing: number = 10 - this.edgeElement.points.length;
    if (waypointsMissing > 0) {

      this.edgeElement.points = [...Array(waypointsMissing).fill(this.edgeElement.points[0]), ...this.edgeElement.points];
    }

    this.waypointsMap = this.waypointsArrayToMap(this.edgeElement.points);
  }

}
