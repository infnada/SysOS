// TODO
export type NetappSdkFunctionsInput<Action> =
  Action extends string ? any :
  never;
