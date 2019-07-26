import {KeyAnyValue} from "./key-any-value";

export interface LocalizableMessage {
  arg?: KeyAnyValue[];
  key: string;
  message?: string;
}
