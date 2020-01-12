/**
 * A utility class used to track cells whilst sorting occurs on the median
 * values. Does not violate (x.compareTo(y)==0) == (x.equals(y))
 *
 * Constructor: MedianCellSorter
 *
 * Constructs a new median cell sorter.
 */
export interface MedianCellSorter {
  /**
   * Compares two MedianCellSorters.
   */
  compare(a: any, b: any): 1 | 0 | -1;
}
