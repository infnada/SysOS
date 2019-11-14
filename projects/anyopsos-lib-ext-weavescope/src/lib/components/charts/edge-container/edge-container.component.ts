import {Component, Input, OnChanges, OnInit} from '@angular/core';
// import {Motion} from 'react-motion';
import {Repeat, fromJS, Map as makeMap} from 'immutable';
import {line, curveBasis} from 'd3-shape';

@Component({
  selector: '[slews-edge-container]',
  templateUrl: './edge-container.component.html',
  styleUrls: ['./edge-container.component.scss']
})
export class EdgeContainerComponent implements OnChanges, OnInit {
  @Input() key;
  @Input() id;
  @Input() source;
  @Input() target;
  @Input() waypoints;
  @Input() highlighted;
  @Input() focused;
  @Input() scale;
  @Input() isAnimated;

  private waypointsMap = makeMap();
  private spline = line()
    .curve(curveBasis)
    .x(d => d.x)
    .y(d => d.y);

  thickness = 1;

  constructor() {
  }

  ngOnInit() {
    this.prepareWaypointsForMotion();
  }

  ngOnChanges(nextProps) {
    if (nextProps.waypoints && nextProps.isAnimated) {
      const waypointsChanged = this.waypoints !== nextProps.waypoints.currentValue;
      const animationChanged = this.isAnimated !== nextProps.isAnimated.currentValue;
      if (waypointsChanged || animationChanged) {
        this.prepareWaypointsForMotion();
      }
    }

    if (nextProps.scale && nextProps.focused) {
      // Edge thickness will reflect the zoom scale.
      const baseScale = (nextProps.scale.currentValue * 0.01) * 100;
      const newTickness = (nextProps.focused.currentValue ? 3 : 1) * baseScale;

      if (this.thickness !== newTickness) this.thickness = newTickness;
    }
  }


  spring(val, config?) {
    const defaultConfig = {
      ...{ stiffness: 170, damping: 26 },
      precision: 0.01,
    };
    return { ...defaultConfig, ...config, val };
  }
  weakSpring(value) {
    return this.spring(value, { damping: 18, precision: 1, stiffness: 100 });
  }


  getMotionStyle() {
    return {interpolatedThickness: this.weakSpring(this.thickness), ...this.waypointsMap.toJS()};
  }

  getEdgePath(animated?) {
    if (animated) return this.spline(this.waypointsMapToArray(fromJS(this.waypointsMap.toJS())));

    return this.spline(this.waypoints.toJS());
  }

  waypointsMapToArray(waypointsMap) {
    // TODO lodash times
    const waypointsArray = [];
    waypointsMap.forEach((value, key) => {
      const [axis, index] = [key[0], key.slice(1)];

      if (!waypointsArray[index]) waypointsArray[index] = {};
      waypointsArray[index][axis] = value;
    });
    return waypointsArray;
  }

  // Converts a waypoints array of the input format [{ x: 11, y: 22 }, { x: 33, y: 44 }]
  // to an array of waypoints that is used by Motion in the format { x0: 11, y0: 22, x1: 33, y1: 44 }.
  waypointsArrayToMap(waypointsArray) {
    let waypointsMap = makeMap();
    waypointsArray.forEach((point, index) => {
      waypointsMap = waypointsMap.set(`x${index}`, this.weakSpring(point.get('x')));
      waypointsMap = waypointsMap.set(`y${index}`, this.weakSpring(point.get('y')));
    });
    return waypointsMap;
  }

  prepareWaypointsForMotion() {
    // Don't update if the edges are not animated.
    if (!this.isAnimated) return;

    // The Motion library requires the number of waypoints to be constant, so we fill in for
    // the missing ones by reusing the edge source point, which doesn't affect the edge shape
    // because of how the curveBasis interpolation is done.
    const waypointsMissing = 10 - this.waypoints.size;
    if (waypointsMissing > 0) {
      this.waypoints = Repeat(this.waypoints.get(0), waypointsMissing).concat(this.waypoints);
    }

    this.waypointsMap = this.waypointsArrayToMap(this.waypoints);
  }

}
