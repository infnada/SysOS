import {ProfileCreateSpec} from './profile-create-spec';


export interface ProfileSerializedCreateSpec extends ProfileCreateSpec {
  profileConfigString: string;
}