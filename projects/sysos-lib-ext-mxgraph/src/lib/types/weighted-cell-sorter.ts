/**
 * A utility class used to track cells whilst sorting occurs on the weighted
 * sum of their connected edges. Does not violate (x.compareTo(y)==0) ==
 * (x.equals(y))
 *
 * Constructor: WeightedCellSorter
 *
 * Constructs a new weighted cell sorted for the given cell and weight.
 */
export interface WeightedCellSorter {
  (cell: any, weightedValue: any): void;
  /**
   * Compares two WeightedCellSorters.
   */
  compare(a: any, b: any): 1 | 0 | -1;
}
