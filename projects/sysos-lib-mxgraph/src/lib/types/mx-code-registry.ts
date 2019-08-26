export interface mxCodecRegistry {
  codecs: any[];
  aliases: any[];
  register(codec: any): any;
  addAlias(classname: any, codecname: any): void;
  getCodec(ctor: any): any;
}
