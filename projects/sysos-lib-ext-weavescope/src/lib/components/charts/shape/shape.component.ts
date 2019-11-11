import {Component, Input} from '@angular/core';
import {range, isEmpty, isNumber} from 'lodash-es';
import {line, curveCardinalClosed} from 'd3-shape';

import {encodeIdAttribute} from 'weavescope/client/app/scripts/utils/dom-utils';

@Component({
  selector: '[slews-shape]',
  templateUrl: './shape.component.html',
  styleUrls: ['./shape.component.scss']
})
export class ShapeComponent {
  @Input() color: string;
  @Input() contrastMode: boolean;
  @Input() highlighted: boolean;
  @Input() id: string;
  @Input() metricColor: string;
  @Input() metricFormattedValue: string;
  @Input() metricNumericValue: number = null;
  @Input() size: number;
  @Input() shape: 'circle' | 'cloud' | 'cylinder' | 'dottedcylinde' | 'ShapeDottedTriangle' | 'heptagon' | 'hexagon' | 'octago' | 'pentagon' | 'sheet' | 'square' | 'triangle';
  @Input() stacked: boolean;

  /**
   * SHAPES
   */
  UNIT_CLOUD_PATH =
    'M-1.25 0.233Q-1.25 0.44-1.104 0.587-0.957 0.733-0.75 0.733H0.667Q' +
    '0.908 0.733 1.079 0.562 1.25 0.391 1.25 0.15 1.25-0.022 1.158-0.164 1.065-0.307 0.914-0.377q' +
    '0.003-0.036 0.003-0.056 0-0.276-0.196-0.472-0.195-0.195-0.471-0.195-0.206 0-0.373 0.115-0.167' +
    ' 0.115-0.244 0.299-0.091-0.081-0.216-0.081-0.138 0-0.236 0.098-0.098 0.098-0.098 0.236 0 0.098' +
    ' 0.054 0.179-0.168 0.039-0.278 0.175-0.109 0.136-0.109 0.312z';

  UNIT_CYLINDER_PATH =
    'm -1 -1.25' + // this line is responsible for adjusting place of the shape with respect to dot
    'a 1 0.4 0 0 0 2 0' +
    'm -2 0' +
    'v 1.8' +
    'a 1 0.4 0 0 0 2 0' +
    'v -1.8' +
    'a 1 0.4 0 0 0 -2 0';

  UNIT_SHEET =
    'm -1.2 -1.6 m 0.4 0 v 2.4 m -0.4 -2.4 v 2.4 h 2 v -2.4 z m 0 0.4 h 2';

  shapes = {
    circle: `<circle r="1" #ATTRS></circle>`,
    cloud: `<path d="${this.UNIT_CLOUD_PATH}" #ATTRS></path>`,
    cylinder: `<path d="${this.UNIT_CYLINDER_PATH}" #ATTRS></path>`,
    dottedcylinder: `<path stroke-dasharray="0.4, 0.2" d="${this.UNIT_CYLINDER_PATH}" #ATTRS></path>`,
    dottedtriangle: `<path stroke-dasharray="0.4, 0.2" d="${this.curvedUnitPolygonPath(3)}" #ATTRS></path>`,
    octagon: `<path d="${this.curvedUnitPolygonPath(8)}" #ATTRS></path>`,
    heptagon: `<path d="${this.curvedUnitPolygonPath(7)}" #ATTRS></path>`,
    hexagon: `<path d="${this.curvedUnitPolygonPath(6)}" #ATTRS></path>`,
    pentagon: `<path d="${this.curvedUnitPolygonPath(5)}" #ATTRS></path>`,
    sheet: `<path d="${this.UNIT_SHEET}" #ATTRS></path>`,
    square: `<rect width="1.8" height="1.8" rx="0.4" ry="0.4" x="-0.9" y="-0.9" #ATTRS></rect>`,
    triangle: `<path d="${this.curvedUnitPolygonPath(3)}" #ATTRS></path>`,
    network: `<g #ATTRS>
  <g transform="translate(-1.5)">
    <g transform="translate(2.2)">
        <path style="fill:#3999C6;" d="M 0.674 0 c 0.022 -0.022 0.017 -0.056 0 -0.078 l -0.104 -0.103 l -0.466 -0.454 c -0.022 -0.022 -0.052 -0.022 -0.074 0 c -0.021 0.021 -0.026 0.056 0 0.077 l 0.489 0.479 c 0.021 0.022 0.021 0.056 0 0.078 l -0.497 0.497 c -0.022 0.021 -0.022 0.056 0 0.078 c 0.021 0.022 0.056 0.018 0.073 0 l 0.462 -0.457 c 0 0 0 0 0.004 -0.004 L 0.674 0 z"/>
    </g>
    <g>
        <path style="fill:#3999C6;" d="M 0.1 0 c -0.022 -0.022 -0.017 -0.056 0 -0.078 l 0.104 -0.103 l 0.466 -0.454 c 0.022 -0.022 0.052 -0.022 0.074 0 c 0.021 0.021 0.026 0.056 0 0.077 l -0.489 0.479 c -0.021 0.022 -0.021 0.056 0 0.078 l 0.497 0.497 c 0.022 0.021 0.022 0.056 0 0.078 c -0.021 0.022 -0.056 0.018 -0.073 0 l -0.462 -0.457 c 0 0 0 0 -0.004 -0.004 L 0.1 0 z"/>
    </g>
    <g transform="translate(1)">
        <circle style="fill:#7FBA00;" r="0.2"/>
    </g>
    <g transform="translate(1.5)">
        <circle style="fill:#7FBA00;" r="0.2"/>
    </g>
    <g transform="translate(2)">
        <circle style="fill:#7FBA00;" r="0.2"/>
    </g>
  </g>
</g>`
  };

  constructor() {
  }

  getClipId() {
    return encodeIdAttribute(`metric-clip-${this.id}`);
  }

  hasMetric() {
    return !isEmpty(this.metricFormattedValue) && isNumber(this.metricNumericValue);
  }

  verticalTranslate = t => `translate(0, ${t * this.size * (this.contrastMode ? 0.18 : 0.15)})`;

  getAttrsByType(type): { name: string, value: string }[] {
    const attrs = [];

    if (type === 'borderAttrs') {
      attrs.push({
        name: 'style',
        value: `fill: none; stroke: hsl(191, 100%, 50%); stroke-opacity: ${this.contrastMode ? 0.5 : 0.4}; stroke-width: ${this.contrastMode ? 1 : 0.8}`
      });
      attrs.push({name: 'transform', value: 'scale(0.5)'});
    }

    if (type === 'shadowAttrs') {
      attrs.push({
        name: 'style',
        value: `fill: none; stroke: hsl(0, 0%, 100%); stroke-opacity: ${this.contrastMode ? 0.4 : 0.5}; stroke-width: 0.7`
      });
      attrs.push({name: 'transform', value: 'scale(0.5)'});
    }

    if (type === 'backgroundAttrs') {
      attrs.push({name: 'style', value: 'fill: hsl(0, 0%, 100%); stroke: none'});
      attrs.push({name: 'transform', value: 'scale(0.48)'});
    }

    if (type === 'metricFillAttrs') {
      attrs.push({name: 'clip-path', value: `url(#${this.getClipId()})`});
      attrs.push({name: 'style', value: `fill: ${this.metricColor}; fill-opacity: 0.7; stroke: none`});
      attrs.push({name: 'transform', value: 'scale(0.48)'});
    }

    if (type === 'nodeShadowAttrs') {
      attrs.push({
        name: 'style',
        value: `fill: none; stroke: ${this.contrastMode ? 'hsl(0, 0%, 100%)' : 'hsl(0, 0%, 96%)'}; stroke-width: ${this.contrastMode ? 0.25 : 0.18}`
      });
      attrs.push({name: 'transform', value: 'scale(0.49)'});
    }

    if (type === 'nodeBorderAttrs') {
      attrs.push({name: 'stroke', value: this.color});
      attrs.push({
        name: 'style',
        value: `fill: none; stroke-opacity: ${this.hasMetric ? 0.5 : 1}; stroke-width: ${this.contrastMode ? 0.15 : 0.12}`
      });
      attrs.push({name: 'transform', value: 'scale(0.5)'});
    }

    return attrs;
  }

  renderTemplate(type: string, allowStroke: boolean = true): string {
    const toReturn = this.shapes[this.shape].replace('#ATTRS', this.getAttrsByType(type).map(a => `${a.name}="${a.value}"`).join(''));
    if (allowStroke === false) toReturn.replace('stroke-dasharray="0.4, 0.2"', '');

    return toReturn;
  }

  renderHighlightSpape() {
    return `${this.highlighted ? `${this.renderTemplate('borderAttrs', false)}
    ${this.renderTemplate('shadowAttrs', false)}` : ''}`;
  }

  renderBaseShape(highlighted: boolean = this.highlighted) {

    return `<g transform="scale(${this.size})">
      ${highlighted ? `${this.renderTemplate('borderAttrs', false)}
      ${this.renderTemplate('shadowAttrs', false)}` : ''}
    
      ${this.renderTemplate('backgroundAttrs')}
    
      ${this.hasMetric() ? `<defs>
          <clipPath id="${this.getClipId()}" transform="scale(${2 * 0.48})">
            <rect width="2" height="2" x="-1" y="${1 - 2 * this.metricNumericValue}"></rect>
          </clipPath>
        </defs>
  
        ${this.renderTemplate('metricFillAttrs')}` : ''}
  
    
      ${this.renderTemplate('nodeShadowAttrs')}
      ${this.renderTemplate('nodeBorderAttrs')}
    
      ${this.hasMetric && highlighted ? `<text dominant-baseline="middle" text-anchor="middle" transform="scale(0.015)" fill="${this.contrastMode ? 'hsl(0, 0%, 10%)' : 'hsl(240, 20%, 30%)'}">${this.metricFormattedValue}</text>` : ''}
    
      ${!this.hasMetric || !highlighted ? `<circle r="0.1" stroke-width="0.005" fill="${this.contrastMode ? 'hsl(0, 0%, 10%)' : 'hsl(240, 20%, 30%)'}" stroke="hsl(0, 0%, 100%)"></circle>
    </g>` : ''}`;
  }

  curvedUnitPolygonPath(n) {
    const curve = curveCardinalClosed.tension(0.65);
    const spline = line().curve(curve);
    const innerAngle = 2 * (Math.PI / n);
    return spline(
      range(0, n).map(k => [Math.sin(k * innerAngle), -Math.cos(k * innerAngle)])
    );
  }

}
