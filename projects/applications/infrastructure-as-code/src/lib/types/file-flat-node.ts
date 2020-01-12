/** Flat node with expandable and level information */
export class FileFlatNode {
  constructor(
    public expandable: boolean,
    public fileName: string,
    public level: number,
    public type: any,
    public id: string
  ) {}
}
