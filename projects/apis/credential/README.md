# A sample API
Generated with `routing-controllers-openapi`

## Version: 1.0.0

### /api/credential/{workspaceUuid}

#### GET
##### Summary:

Get all credentials

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| workspaceUuid | path |  | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Successful response |

#### PUT
##### Summary:

Put credential

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| workspaceUuid | path |  | Yes | string |
| body | body |  | No | object |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Successful response |

### /api/credential/{workspaceUuid}/{credentialUuid}

#### PATCH
##### Summary:

Patch credential

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| workspaceUuid | path |  | Yes | string |
| credentialUuid | path |  | Yes | string |
| body | body |  | No | object |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Successful response |

#### DELETE
##### Summary:

Delete credential

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| workspaceUuid | path |  | Yes | string |
| credentialUuid | path |  | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Successful response |
