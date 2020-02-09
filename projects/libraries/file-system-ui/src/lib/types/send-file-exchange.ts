export interface SendFileExchange {
  type: 'upload' | 'download' | 'download_from_url';
  progress: number;
  srcPath: string;
  dstPath: string;
  srcConnectionUuid: string;
  dstConnectionUuid: string;
  srcApplicationId: string;
  dstApplicationId: string;
}
