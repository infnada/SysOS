# A sample API
Generated with `routing-controllers-openapi`

## Version: 1.0.0

### /api/file/{srcPath}

#### GET
##### Summary:

Get file

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| srcPath | path |  | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Successful response |

#### DELETE
##### Summary:

Delete file

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| srcPath | path |  | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Successful response |

### /api/file/{dstPath}

#### PUT
##### Summary:

New file

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| dstPath | path |  | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Successful response |

### /api/file/download_from_url

#### POST
##### Summary:

New file from url

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| body | body |  | No | object |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Successful response |

### /api/file/{type}/{srcPath}

#### PATCH
##### Summary:

Patch file

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| type | path |  | Yes | string |
| srcPath | path |  | Yes | string |
| body | body |  | No | object |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Successful response |
