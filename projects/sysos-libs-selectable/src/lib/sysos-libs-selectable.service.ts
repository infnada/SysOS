import {ElementRef, Injectable, Renderer2, RendererFactory2} from '@angular/core';

export interface Item {
  node: Element;
  rect: Rect;
  startselected: boolean;
  selected: boolean;
  selecting: boolean;
  deselecting: boolean;
}

export interface Rect {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
  height: number;
  width: number;
}

@Injectable({
  providedIn: 'root'
})
export class SysosLibsSelectableService {
  private renderer: Renderer2;

  $axes = ['x', 'y'];
  $axes1 = {
    x: 'x1',
    y: 'y1'
  };
  $axes2 = {
    x: 'x2',
    y: 'y2'
  };

  /**
   * classList shim
   */
  classList = {
    add: (a, c) => {
      a.classList.add(c);
    },
    remove: (a, c) => {
      a.classList.remove(c);
    },
    contains: (a, c) => {
      if (a) return a.classList.contains(c);
    }
  };

  touch: boolean;
  config;
  items: any[];
  coords: {
    x1: number;
    x2: number;
    y1: number;
    y2: number;
  };
  origin: {
    x: number;
    y: number;
    scroll?: {
      x: number;
      y: number;
    }
  };
  mouse: {
    x: number;
    y: number;
  };
  scroll: {
    x: number;
    y: number;
    max?: {
      x: number;
      y: number;
    },
    size?: {
      x: number;
      y: number;
    },
    scrollable?: {
      x: boolean;
      y: boolean;
    }
  };
  dragging: boolean;
  container: HTMLDivElement | HTMLElement;
  nodes: Element[];
  startEl: Element;
  offsetWidth: number;
  offsetHeight: number;
  clientWidth: number;
  clientHeight: number;
  scrollWidth: number;
  scrollHeight: number;

  boundingRect: {
    x1: number;
    x2: number;
    y1: number;
    y2: number;
    height: number;
    width: number;
  };

  current: {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
  };

  lasso: HTMLElement;

  constructor(private rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.touch =
      'ontouchstart' in window ||
      (this._window().DocumentTouch);

  }

  /**
   * Detect CTRL or META key press
   */
  _isCmdKey(e: KeyboardEvent | MouseEvent): boolean {
    return !!e.ctrlKey || !!e.metaKey;
  }

  /**
   * Detect SHIFT key press
   */
  _isShiftKey(e: KeyboardEvent | MouseEvent): boolean {
    return !!e.shiftKey;
  }

  /**
   * Init instance
   */
  init(options): void {

    /**
     * Default configuration properties
     */
    const selectableConfig = {
      filter: '.ui-selectable',
      appendTo: document.body,
      autoRefresh: true,
      throttle: 50,
      autoScroll: {
        threshold: 0,
        increment: 10,
      },
      ignore: false,
      keys: ['shiftKey', 'ctrlKey', 'metaKey', ''],
      classes: {
        lasso: 'ui-lasso',
        selected: 'ui-selected',
        container: 'ui-container',
        selecting: 'ui-selecting',
        selectable: 'ui-selectable',
        deselecting: 'ui-deselecting'
      }
    };

    this.config = this._extend(selectableConfig, options);

    this.origin = {
      x: 0,
      y: 0
    };

    this.mouse = {
      x: 0,
      y: 0
    };

    this.setContainer(options.appendTo);

    this.scroll = {
      x: this.container.scrollLeft,
      y: this.container.scrollTop
    };

    if (this.isCollection(this.config.filter)) {
      this.nodes = [].slice.call(this.config.filter);
    } else if (typeof this.config.filter === 'string') {
      this.nodes = [].slice.call(this.container.querySelectorAll(this.config.filter));
    }

    // activate items
    this.nodes.forEach(node => {
      this.classList.add(node, this.config.classes.selectable);
    });

    // lasso
    this.lasso = document.createElement('div');
    this.lasso.className = this.config.classes.lasso;

    this.renderer.setStyle(this.lasso, 'border', '1px dotted #000');
    this.renderer.setStyle(this.lasso, 'background-color', 'rgba(52, 152, 219, 0.2)');
    this.renderer.setStyle(this.lasso, 'position', 'absolute');
    this.renderer.setStyle(this.lasso, 'box-sizing', 'border-box');
    this.renderer.setStyle(this.lasso, 'opacity', 0);

    this.update();
    this.bindEvents();
  }

  _window(): any {
    // return the global native browser window object
    return window;
  }

  bindEvents() {
    this.renderer.listen(this.container, 'start', (event: MouseEvent) => this.eventStart(event));
    this.renderer.listen(this.container, 'touchstart', (event: MouseEvent) => this.eventStart(event));
    this.renderer.listen(this.container, 'mousedown', (event: MouseEvent) => this.eventStart(event));

    this.renderer.listen(document, 'drag', (event: DragEvent) => this.eventDrag(event));
    this.renderer.listen(document, 'touchmove', (event: DragEvent) => this.eventDrag(event));
    this.renderer.listen(document, 'mousemove', (event: DragEvent) => this.eventDrag(event));

    this.renderer.listen(document, 'end', () => this.eventEnd(event));
    this.renderer.listen(document, 'touchend', () => this.eventEnd(event));
    this.renderer.listen(document, 'touchcancel', () => this.eventEnd(event));
    this.renderer.listen(document, 'mouseup', () => this.eventEnd(event));

    this.renderer.listen(this._window(), 'scroll', () => this.eventRefresh());
    this.renderer.listen(this._window(), 'resize', () => this.eventRefresh());

    this.renderer.listen(this.container, 'scroll', () => this.eventScroll());
  }

  eventStart(event) {
    const cmd = this._isCmdKey(event);
    const shift = this._isShiftKey(event);
    let originalEl;

    if (!this.container.contains((event.target as HTMLElement)) || event.which === 3 || event.button > 0) return;

    // check if the parent container is scrollable and
    // prevent deselection when clicking on the scrollbars
    if (
      this.scroll.scrollable.y && this._getEvent(event).pageX > this.boundingRect.x1 + this.scroll.size.x ||
      this.scroll.scrollable.x && this._getEvent(event).pageY > this.boundingRect.y1 + this.scroll.size.y
    ) {
      return;
    }

    // check for ignored descendants
    if (this.config.ignore) {
      let stop = false;
      let ignore = this.config.ignore;

      if (!Array.isArray(ignore)) {
        ignore = [ignore];
      }

      for (const i of ignore.length) {
        const ancestor = (event.target as HTMLElement).closest(i);

        if (ancestor) {
          stop = true;
          break;
        }
      }

      if (stop) {
        return;
      }
    }

    // selectable nodes may have child elements
    // so let's get the closest selectable node
    const node = this.closest((event.target as HTMLElement), (el: HTMLElement): boolean => {
      return el === this.container || this.classList.contains(el, this.config.classes.selectable);
    });

    if (!node) return;

    // allow form inputs to be receive focus
    if (['INPUT', 'SELECT', 'BUTTON', 'TEXTAREA', 'OPTION'].indexOf((event.target as HTMLElement).tagName) === -1) {
      event.preventDefault();
    }

    this.dragging = true;

    this.origin = {
      x: (this._getEvent(event).pageX) + this.scroll.x,
      y: (this._getEvent(event).pageY) + this.scroll.y,
      scroll: {
        x: this.scroll.x,
        y: this.scroll.y
      }
    };

    this.container.appendChild(this.lasso);

    if (node !== this.container) {
      const item = this.get(node);
      item.selecting = true;
      this.classList.add(node, this.config.classes.selecting);
    }

    if (this.config.autoRefresh) this.refresh();

    if (shift && this.startEl) {

      const items = this.items;
      let currentIndex: number = this.getNodes().indexOf(node);
      const lastIndex = this.getNodes().indexOf(this.startEl);
      const step = currentIndex < lastIndex ? 1 : -1;

      while ((currentIndex += step) && currentIndex !== lastIndex) {
        items[currentIndex].selecting = true;
      }
    }

    for (const item of this.items) {
      const el = item.node;
      const isCurrentNode = el === node;
      if (item.selected) {

        item.startselected = true;

        const deselect = (this.touch || cmd) ? isCurrentNode : !isCurrentNode && !shift;

        if (deselect) {
          this.classList.remove(el, this.config.classes.selected);
          item.selected = false;

          this.classList.add(el, this.config.classes.deselecting);
          item.deselecting = true;
        }
      }

      if (isCurrentNode) originalEl = item;
    }

    this.startEl = node;
  }
  eventDrag(event) {
    if (!this.dragging || this._isShiftKey(event)) return;

    let tmp;
    const evt = this._getEvent(event);

    this.mouse = {
      x: evt.pageX,
      y: evt.pageY
    };

    this.current = {
      x1: this.origin.x,
      y1: this.origin.y,
      x2: this.mouse.x + this.scroll.x,
      y2: this.mouse.y + this.scroll.y
    };

    // flip lasso
    for (const axis of this.$axes) {
      if (this.current[this.$axes1[axis]] > this.current[this.$axes2[axis]]) {
        tmp = this.current[this.$axes2[axis]];
        this.current[this.$axes2[axis]] = this.current[this.$axes1[axis]];
        this.current[this.$axes1[axis]] = tmp;
      }
    }

    // lasso coordinates
    this.coords = {
      x1: this.current.x1,
      x2: this.current.x2 - this.current.x1,
      y1: this.current.y1,
      y2: this.current.y2 - this.current.y1
    };

    /* highlight */
    for (const item of this.items) {
      this._highlight(item, this._isCmdKey(event));
    }

    // auto scroll
    // subtract the parent container's position
    this.coords.x1 -= this.boundingRect.x1;
    this.coords.y1 -= this.boundingRect.y1;
    this._autoScroll();


    // stop lasso causing overflow
    if (!this.config.autoScroll.lassoOverflow) {
      this._limitLasso();
    }

    // style the lasso
    this.renderer.setStyle(this.lasso, 'left', this.coords.x1 + 'px');
    this.renderer.setStyle(this.lasso, 'top', this.coords.y1 + 'px');
    this.renderer.setStyle(this.lasso, 'width', this.coords.x2 + 'px');
    this.renderer.setStyle(this.lasso, 'height', this.coords.y2 + 'px');
    this.renderer.setStyle(this.lasso, 'opacity', 1);
  }
  eventEnd(event) {
    if (!this.dragging) return;

    this.dragging = false;

    const selected = [];
    const deselected = [];

    // remove the lasso
    if (this.lasso && this.container.contains(this.lasso)) {
      this.container.removeChild(this.lasso);
    }

    if (this.lasso) {
      // Reset the lasso
      this.renderer.setStyle(this.lasso, 'left', 0);
      this.renderer.setStyle(this.lasso, 'top', 0);
      this.renderer.setStyle(this.lasso, 'width', 0);
      this.renderer.setStyle(this.lasso, 'height', 0);
      this.renderer.setStyle(this.lasso, 'opacity', 0);

      // the lasso was the event.target so let's get the actual
      // node below the pointer
      let node = document.elementFromPoint(event.pageX, event.pageY);

      if (!node) {
        node = this.container;
      }
    }

    // loop over items and check their state
    for (const item of this.items) {

      // item was marked for deselect
      if (item.deselecting) {
        deselected.push(item);
        this.deselect(item);
      }

      // item was marked for select
      if (item.selecting) {
        selected.push(item);
        this.select(item);
      }
    }
  }
  eventRefresh() {
    this._throttle(this.refresh);
  }
  eventScroll() {
    this.scroll.x = this.container.scrollLeft;
    this.scroll.y = this.container.scrollTop;

    for (const item of this.items) {
      item.rect = this._rect(item.node);
    }
  }

  /**
   * Update instance
   */
  update(): void {
    this._loadItems();

    this.refresh();
  }

  /**
   * Update item coords
   */
  refresh(): void {
    const x = this.container.scrollLeft;
    const y = this.container.scrollTop;

    this.offsetWidth = this.container.offsetWidth;
    this.offsetHeight = this.container.offsetHeight;
    this.clientWidth = this.container.clientWidth;
    this.clientHeight = this.container.clientHeight;
    this.scrollWidth = this.container.scrollWidth;
    this.scrollHeight = this.container.scrollHeight;

    // get the parent container DOMRect
    this.boundingRect = this._rect(this.container);

    // get the parent container scroll dimensions
    this.scroll = {
      x,
      y,
      max: {
        x: this.scrollWidth - this.clientWidth,
        y: this.scrollHeight - this.clientHeight
      },
      size: {
        x: this.clientWidth,
        y: this.clientHeight
      },
      scrollable: {
        x: this.scrollWidth > this.offsetWidth,
        y: this.scrollHeight > this.offsetHeight
      }
    };

    for (let i = 0; i < this.nodes.length; i++) {
      this.items[i].rect = this._rect(this.nodes[i]);
    }
  }

  /**
   * Set the container
   */
  setContainer(container: ElementRef) {
    let old;
    if (this.container) old = this.container;
    if (old) this.classList.remove(old, this.config.classes.container);

    this.container = container.nativeElement;
    this.classList.add(this.container, this.config.classes.container);

    this._loadItems();
  }

  /**
   * Select an item
   */
  select(item: Item): Item {

    item = this.get(item);

    if (item) {
      this.classList.remove(item.node, this.config.classes.selecting);
      this.classList.add(item.node, this.config.classes.selected);

      item.selecting = false;
      item.selected = true;
      item.startselected = true;

      return item;
    }

    return;
  }

  /**
   * Unselect an item
   */
  deselect(item: Item): Item {

    item = this.get(item);

    if (item) {
      item.selecting = false;
      item.selected = false;
      item.deselecting = false;
      item.startselected = false;

      this.classList.remove(item.node, this.config.classes.deselecting);
      this.classList.remove(item.node, this.config.classes.selecting);
      this.classList.remove(item.node, this.config.classes.selected);

      return item;
    }

    return;
  }

  /**
   * Add a node to the instance
   */
  add(node): void {
    const els = [];

    if (!this.isCollection(node)) {
      node = [node];
    }

    for (const n of node) {
      if (this.nodes.indexOf(n) < 0 && n instanceof Element) {
        els.push(n);
        this.classList.add(n, this.config.classes.selectable);
      }
    }

    this.nodes = this.nodes.concat(els);

    this.update();
  }

  /**
   * Unselect all items
   */
  clear(): void {
    for (let i = this.items.length - 1; i >= 0; i--) {
      this.deselect(this.items[i]);
    }
  }

  /**
   * Get an item
   */
  get(item): Item {
    let found;

    if (typeof item === 'string') {
      item = [].slice.call(this.container.querySelectorAll(item));
    }

    if (this.isCollection(item)) {
      found = [];

      for (const i of item) {
        const itm = this.get(i);

        if (itm) found.push(itm);
      }
    } else {
      // item is an index
      if (!isNaN(item)) {
        if (this.items.indexOf(this.items[item]) >= 0) {
          found = this.items[item];
        }
      } else if (item instanceof Element) {
        found = this.items[this.nodes.indexOf(item)];
      } else if (this.isObject(item) && this.items.indexOf(item) >= 0) {
        found = item;
      }
    }
    return found;
  }

  /**
   * Get all nodes
   */
  getNodes(): Element[] {
    return this.nodes;
  }

  /* ---------- PRIVATE METHODS ---------- */

  /**
   * Load items from the given filter
   */
  _loadItems(): void {
    this.nodes = [].slice.call(this.container.querySelectorAll('.' + this.config.classes.selectable));
    this.items = [];

    if (this.nodes.length) {
      for (const el of this.nodes) {
        this.classList.add(el, this.config.classes.selectable);

        const item: Item = {
          node: el,
          rect: this._rect(el),
          startselected: false,
          selected: this.classList.contains(el, this.config.classes.selected),
          selecting: this.classList.contains(el, this.config.classes.selecting),
          deselecting: this.classList.contains(el, this.config.classes.deselecting),
        };

        this.items.push(item);
      }
    }
  }

  /**
   * Get event
   */
  _getEvent(e): MouseEvent {
    if (this.touch) {
      if (e.type === 'touchend') {
        return e.changedTouches[0];
      }
      return e.touches[0];
    }
    return e;
  }

  /**
   * Scroll container
   */
  _autoScroll(): void {
    const i = this.config.autoScroll.increment;
    const t = this.config.autoScroll.threshold;
    const inc = {
      x: 0,
      y: 0
    };

    // check if we need to scroll
    for (const axis of this.$axes) {
      if (
        this.mouse[axis] >= this.boundingRect[this.$axes2[axis]] - t &&
        this.scroll[axis] < this.scroll.max[axis]
      ) {
        inc[axis] = i;
      } else if (
        this.mouse[axis] <= this.boundingRect[this.$axes1[axis]] + t &&
        this.scroll[axis] > 0
      ) {
        inc[axis] = -i;
      }
    }

    // scroll the container
    this.container.scrollTop += inc.y;
    this.container.scrollLeft += inc.x;
  }

  /**
   * Limit lasso to container boundaries
   */
  _limitLasso(): void {
    for (const axis of this.$axes) {
      const max = this.boundingRect[this.$axes1[axis]] + this.scroll.size[axis];
      if (this.mouse[axis] >= max && this.scroll[axis] >= this.scroll.max[axis]) {
        const off = this.origin[axis] - this.boundingRect[this.$axes1[axis]] - this.scroll[axis];
        this.coords[this.$axes1[axis]] = this.origin[axis] - this.boundingRect[this.$axes1[axis]];
        this.coords[this.$axes2[axis]] = max - off - this.boundingRect[this.$axes1[axis]];
      }

      if (
        this.mouse[axis] <= this.boundingRect[this.$axes1[axis]] &&
        this.scroll[axis] <= 0
      ) {
        this.coords[this.$axes1[axis]] = 0;
        this.coords[this.$axes2[axis]] = this.origin[axis] - this.boundingRect[this.$axes1[axis]];
      }
    }
  }

  /**
   * Highlight an item for selection based on lasso position
   */
  _highlight(item, cmd): void {
    const x = this.scroll.x;
    const y = this.scroll.y;

    const over = !(item.rect.x1 + x > this.current.x2 ||
      (item.rect.x2 + x < this.current.x1 ||
        (item.rect.y1 + y > this.current.y2 ||
          item.rect.y2 + y < this.current.y1
        )
      )
    );

    if (over) {
      if (item.selected) {
        this.classList.remove(item.node, this.config.classes.selected);
        item.selected = false;
      }
      if (item.deselecting) {
        this.classList.remove(item.node, this.config.classes.deselecting);
        item.deselecting = false;
      }
      if (!item.selecting) {
        this.classList.add(item.node, this.config.classes.selecting);
        item.selecting = true;
      }
    } else {
      if (item.selecting) {
        this.classList.remove(item.node, this.config.classes.selecting);
        item.selecting = false;
        if (cmd && item.startselected) {
          this.classList.add(item.node, this.config.classes.selected);
          item.selected = true;
        } else {
          if (item.startselected) {
            this.classList.add(item.node, this.config.classes.deselecting);
            item.deselecting = true;
          }
        }
      }
      if (item.node.selected) {
        if (!cmd) {
          if (!item.startselected) {
            this.classList.remove(item.node, this.config.classes.selected);
            item.selected = false;

            this.classList.add(item.node, this.config.classes.deselecting);
            item.deselecting = true;
          }
        }
      }
    }
  }

  /* ---------- HELPER FUNCTIONS ---------- */

  /**
   * Find the closest matching ancestor to a node
   */
  closest(el: Element, fn: (el: Element) => boolean): Element {
    return el && el !== document.documentElement && (
      fn(el) ? el : this.closest((el.parentNode as Element), fn)
    );
  }

  /**
   * Check is item is object
   */
  isObject(val: any): boolean {
    return Object.prototype.toString.call(val) === '[object Object]';
  }

  /**
   * Check item is iterable
   */
  isCollection(arr: any): boolean {
    return Array.isArray(arr) || arr instanceof HTMLCollection || arr instanceof NodeList;
  }

  /**
   * Merge objects (reccursive)
   */
  _extend(src: {}, props: {}): {} {
    for (const prop in props) {
      if (props.hasOwnProperty(prop)) {
        const val = props[prop];
        if (val && this.isObject(val)) {
          src[prop] = src[prop] || {};
          this._extend(src[prop], val);
        } else {
          src[prop] = val;
        }
      }
    }
    return src;
  }

  /**
   * Get an element's DOMRect relative to the document instead of the viewport.
   */
  _rect(e: Element): Rect {
    const w = window;
    const o = e.getBoundingClientRect();
    const b = document.documentElement || document.body.parentNode || document.body;
    const d = (void 0 !== w.pageXOffset) ? w.pageXOffset : (b as Element).scrollLeft;
    const n = (void 0 !== w.pageYOffset) ? w.pageYOffset : (b as Element).scrollTop;
    return {
      x1: o.left + d,
      x2: o.left + o.width + d,
      y1: o.top + n,
      y2: o.top + o.height + n,
      height: o.height,
      width: o.width
    };
  }

  /**
   * Returns a function, that, as long as it continues to be invoked, will not be triggered.
   */
  _throttle(fn: () => void) {
    let wait;
    if (!wait) {
      fn.apply(this, arguments);
      wait = true;
      return setTimeout(() => {
        wait = false;
      }, this.config.throttle);
    }
  }

}
