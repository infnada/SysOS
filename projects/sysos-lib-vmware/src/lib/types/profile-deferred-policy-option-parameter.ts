import {KeyAnyValue} from "./key-any-value";
import {ProfilePropertyPath} from "./profile-property-path";

export interface ProfileDeferredPolicyOptionParameter {
  inputPath: ProfilePropertyPath;
  parameter?: KeyAnyValue[];
}
