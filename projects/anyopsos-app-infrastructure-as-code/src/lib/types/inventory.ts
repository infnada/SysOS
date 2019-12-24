export interface Inventory {
  type: 'for' | 'forEach' | 'forEachBut';
  of: ({ value: string; } | { name: string; values: { value: string; }[] })[];
  but: { name: string; value: string; }[];
}
