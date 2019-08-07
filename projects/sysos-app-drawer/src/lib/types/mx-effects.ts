export interface mxEffects {
  animateChanges(graph: any, changes: any, done: any): void;
  cascadeOpacity(graph: any, cell: any, opacity: any): void;
  fadeOut(node: any, from: any, remove: any, step: any, delay: any, isEnabled: any): void;
}
