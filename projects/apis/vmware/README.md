# A sample API
Generated with `routing-controllers-openapi`

## Version: 1.0.0

### /api/vmware-folder/{workspaceUuid}/{connectionUuid}/{vfiler}/{srcPath}

#### GET
##### Summary:

Get vmware folder

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| workspaceUuid | path |  | Yes | string |
| connectionUuid | path |  | Yes | string |
| vfiler | path |  | Yes | string |
| srcPath | path |  | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Successful response |

### /api/vmware-folder/{workspaceUuid}/{connectionUuid}/{vfiler}/{dstPath}

#### PUT
##### Summary:

Create vmware folder

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| workspaceUuid | path |  | Yes | string |
| connectionUuid | path |  | Yes | string |
| vfiler | path |  | Yes | string |
| dstPath | path |  | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Successful response |

### /api/vmware-file/{workspaceUuid}/{connectionUuid}/{srcPath}/{dstPath}

#### GET
##### Summary:

Download file

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| workspaceUuid | path |  | Yes | string |
| connectionUuid | path |  | Yes | string |
| srcPath | path |  | Yes | string |
| dstPath | path |  | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Successful response |

#### PUT
##### Summary:

Upload file

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| workspaceUuid | path |  | Yes | string |
| connectionUuid | path |  | Yes | string |
| srcPath | path |  | Yes | string |
| dstPath | path |  | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Successful response |

### /api/vmware-file/{workspaceUuid}/{connectionUuid}/{type}/{fileName}/{srcDatastoreName}/{srcDatacenterName}

#### PATCH
##### Summary:

Patch file

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| workspaceUuid | path |  | Yes | string |
| connectionUuid | path |  | Yes | string |
| type | path |  | Yes | string |
| fileName | path |  | Yes | string |
| srcDatastoreName | path |  | Yes | string |
| srcDatacenterName | path |  | Yes | string |
| body | body |  | No | object |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Successful response |

### /api/vmware-file/{workspaceUuid}/{connectionUuid}/{srcPath}/{datastoreName}/{datacenterName}

#### DELETE
##### Summary:

Delete file

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| workspaceUuid | path |  | Yes | string |
| connectionUuid | path |  | Yes | string |
| srcPath | path |  | Yes | string |
| datastoreName | path |  | Yes | string |
| datacenterName | path |  | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Successful response |

### /api/vmware-folder/{workspaceUuid}/{connectionUuid}/{srcPath}/{datastoreName}/{datastoreBrowserName}

#### GET
##### Summary:

Get vmware folder

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| workspaceUuid | path |  | Yes | string |
| connectionUuid | path |  | Yes | string |
| srcPath | path |  | Yes | string |
| datastoreName | path |  | Yes | string |
| datastoreBrowserName | path |  | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Successful response |

### /api/vmware-folder/{workspaceUuid}/{connectionUuid}/{dstPath}

#### PUT
##### Summary:

Create vmware folder

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| workspaceUuid | path |  | Yes | string |
| connectionUuid | path |  | Yes | string |
| dstPath | path |  | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Successful response |

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
