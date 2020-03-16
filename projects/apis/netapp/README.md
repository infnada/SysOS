# A sample API
Generated with `routing-controllers-openapi`

## Version: 1.0.0

### /api/netapp-file/{workspaceUuid}/{connectionUuid}/{vfiler}/{srcPath}/{dstPath}

#### GET
##### Summary:

Download file

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| workspaceUuid | path |  | Yes | string |
| connectionUuid | path |  | Yes | string |
| vfiler | path |  | Yes | string |
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
| vfiler | path |  | Yes | string |
| srcPath | path |  | Yes | string |
| dstPath | path |  | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Successful response |

### /api/netapp-file/{workspaceUuid}/{connectionUuid}/{vfiler}/{type}/{fileName}

#### PATCH
##### Summary:

Patch file

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| workspaceUuid | path |  | Yes | string |
| connectionUuid | path |  | Yes | string |
| vfiler | path |  | Yes | string |
| type | path |  | Yes | string |
| fileName | path |  | Yes | string |
| body | body |  | No | object |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Successful response |

### /api/netapp-file/{workspaceUuid}/{connectionUuid}/{vfiler}/{srcPath}

#### DELETE
##### Summary:

Delete file

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

### /api/netapp/soap/{workspaceUuid}/{connectionUuid}/{vfiler}

#### POST
##### Summary:

Netapp call soap

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| workspaceUuid | path |  | Yes | string |
| connectionUuid | path |  | Yes | string |
| vfiler | path |  | No | string |
| body | body |  | No | object |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Successful response |
