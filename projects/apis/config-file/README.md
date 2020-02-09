# A sample API
Generated with `routing-controllers-openapi`

## Version: 1.0.0

### /api/config-file/{workspaceUuid}/{fileName}/{configUuid}

#### GET
##### Summary:

Get config file

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| workspaceUuid | path |  | Yes | string |
| fileName | path |  | Yes | string |
| configUuid | path |  | No | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Successful response |

#### PUT
##### Summary:

Put config file

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| workspaceUuid | path |  | Yes | string |
| fileName | path |  | Yes | string |
| configUuid | path |  | No | string |
| body | body |  | No | object |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Successful response |

#### PATCH
##### Summary:

Patch config file

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| workspaceUuid | path |  | Yes | string |
| fileName | path |  | Yes | string |
| configUuid | path |  | No | string |
| body | body |  | No | object |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Successful response |

#### DELETE
##### Summary:

Delete config file

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| workspaceUuid | path |  | Yes | string |
| fileName | path |  | Yes | string |
| configUuid | path |  | No | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Successful response |
