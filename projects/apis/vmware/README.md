# A sample API
Generated with `routing-controllers-openapi`

## Version: 1.0.0

### /api/vmware/getClientVersion/{workspaceUuid}/{connectionUuid}

#### POST
##### Summary:

Get vmware client version

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| workspaceUuid | path |  | Yes | string |
| connectionUuid | path |  | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Successful response |

### /api/vmware/rest/{workspaceUuid}/{connectionUuid}

#### POST
##### Summary:

Vmware call rest

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| workspaceUuid | path |  | Yes | string |
| connectionUuid | path |  | Yes | string |
| body | body |  | No | object |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Successful response |

### /api/vmware/soap/{workspaceUuid}/{connectionUuid}

#### POST
##### Summary:

Vmware call soap

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| workspaceUuid | path |  | Yes | string |
| connectionUuid | path |  | Yes | string |
| body | body |  | No | object |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Successful response |

### /api/vmware/upload_to_datastore/{workspaceUuid}/{connectionUuid}

#### POST
##### Summary:

Upload to datastore

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| workspaceUuid | path |  | Yes | string |
| connectionUuid | path |  | Yes | string |
| body | body |  | No | object |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Successful response |
