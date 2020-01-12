# A sample API
Generated with `routing-controllers-openapi`

## Version: 1.0.0

### /api/kubernetes/resource/{connectionUuid}/{resourceLink}

#### GET
##### Summary:

Get kubernetes resource

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| connectionUuid | path |  | Yes | string |
| resourceLink | path |  | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Successful response |

### /api/kubernetes/log/{connectionUuid}/{terminalUuid}/{namespace}/{pod}/{container}/{showContainerName}

#### GET
##### Summary:

Get container logs

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
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

### /api/kubernetes/log/{logUuid}

#### DELETE
##### Summary:

Stop container logs

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| logUuid | path |  | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Successful response |

### /api/kubernetes/exec/{connectionUuid}/{terminalUuid}/{namespace}/{pod}/{container}/{command}

#### GET
##### Summary:

Execute into container

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| connectionUuid | path |  | Yes | string |
| terminalUuid | path |  | Yes | string |
| namespace | path |  | Yes | string |
| pod | path |  | Yes | string |
| container | path |  | Yes | string |
| command | path |  | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Successful response |

### /api/kubernetes/shell/{type}/{connectionUuid}/{terminalUuid}/{namespace}/{pod}/{container}/{command}

#### GET
##### Summary:

Shell into container

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| type | path |  | Yes | string |
| connectionUuid | path |  | Yes | string |
| terminalUuid | path |  | Yes | string |
| namespace | path |  | Yes | string |
| pod | path |  | Yes | string |
| container | path |  | Yes | string |
| command | path |  | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Successful response |

### /api/kubernetes/shell/{terminalUuid}

#### DELETE
##### Summary:

Stop container shell

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| terminalUuid | path |  | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Successful response |
