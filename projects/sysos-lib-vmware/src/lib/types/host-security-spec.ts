import {Permission} from "./permission";

export interface HostSecuritySpec {
  addPermission?: Permission[];
  adminPassword?: string;
  removePermission?: Permission[];
}
