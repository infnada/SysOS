export interface LayoutEdge {
  id: string;
  source: string;
  target: string;
  highlighted: boolean;
  focused: boolean;
  blurred: boolean;
  scale: number;
  points: {
    x: number;
    y: number;
  }[];
}
