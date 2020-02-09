# A sample API
Generated with `routing-controllers-openapi`

## Version: 1.0.0

### /api/sftp-folder/{workspaceUuid}/{connectionUuid}/{srcPath}

#### GET
##### Summary:

Get remote folder

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| workspaceUuid | path |  | Yes | string |
| connectionUuid | path |  | Yes | string |
| srcPath | path |  | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Successful response |

### /api/sftp-folder/{workspaceUuid}/{connectionUuid}/{dstPath}

#### PUT
##### Summary:

Create remote folder

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
