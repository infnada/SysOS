# A sample API
Generated with `routing-controllers-openapi`

## Version: 1.0.0

### /api/remote-file/{connectionUuid}/download_from_url

#### POST
##### Summary:

Get remote file

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| connectionUuid | path |  | Yes | string |
| body | body |  | No | object |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Successful response |

### /api/remote-file/{connectionUuid}/{type}/{fileName}

#### PATCH
##### Summary:

Patch file

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| connectionUuid | path |  | Yes | string |
| type | path |  | Yes | string |
| fileName | path |  | Yes | string |
| body | body |  | No | object |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Successful response |

### /api/remote-file/{connectionUuid}/{fileName}

#### DELETE
##### Summary:

Delete file

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| connectionUuid | path |  | Yes | string |
| fileName | path |  | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Successful response |
