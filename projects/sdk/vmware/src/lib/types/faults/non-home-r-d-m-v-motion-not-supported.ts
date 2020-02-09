import {MigrationFeatureNotSupported} from './migration-feature-not-supported';


export interface NonHomeRDMVMotionNotSupported extends MigrationFeatureNotSupported {
  device: string;
}