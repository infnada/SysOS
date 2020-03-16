import {BackendResponse} from '@anyopsos/backend-core/app/types/backend-response';

// TODO
export type NetappSdkFunctionsOutput<Action> =
  Action extends string ? BackendResponse & { status: 'ok'; data: any } | BackendResponse & { status: 'error'; data: any } :
  never;
