# A sample API
Generated with `routing-controllers-openapi`

## Version: 1.0.0

### /api/kubernetes/resource/{workspaceUuid}/{connectionUuid}/{resourceLink}

#### GET
##### Summary:

Get kubernetes resource

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| workspaceUuid | path |  | Yes | string |
| connectionUuid | path |  | Yes | string |
| resourceLink | path |  | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Successful response |

### /api/kubernetes/log/{workspaceUuid}/{connectionUuid}/{terminalUuid}/{namespace}/{pod}/{container}/{showContainerName}

#### GET
##### Summary:

Get container logs

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| workspaceUuid | path |  | Yes | string |
| connectionUuid | path |  | Yes | string |
| terminalUuid | path |  | Yes | string |
| namespace | path |  | Yes | string |
| pod | path |  | Yes | string |
| container | path |  | Yes | string |
| showContainerName | path |  | Yes | boolean |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Successful response |

### /api/kubernetes/{workspaceUuid}/{connectionUuid}/{type}/{terminalUuid}/{namespace}/{pod}/{container}/{command}

#### GET
##### Summary:

Shell into container

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| workspaceUuid | path |  | Yes | string |
| connectionUuid | path |  | Yes | string |
| type | path |  | Yes | string |
| terminalUuid | path |  | Yes | string |
| namespace | path |  | Yes | string |
| pod | path |  | Yes | string |
| container | path |  | Yes | string |
| command | path |  | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Successful response |
