# A sample API
Generated with `routing-controllers-openapi`

## Version: 1.0.0

### /api/monitor/charts/{connectionUuid}/{type}/

#### GET
##### Summary:

Get monitor charts

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| connectionUuid | path |  | Yes | string |
| type | path |  | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Successful response |

### /api/monitor/chart/{connectionUuid}/{type}/

#### GET
##### Summary:

Get monitor chart

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| connectionUuid | path |  | Yes | string |
| type | path |  | Yes | string |
| chart | query |  | No | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Successful response |

### /api/monitor/data/{connectionUuid}/{type}/

#### GET
##### Summary:

Get monitor data

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| connectionUuid | path |  | Yes | string |
| type | path |  | Yes | string |
| chart | query |  | No | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Successful response |

### /api/monitor/alarms/{connectionUuid}/{type}/

#### GET
##### Summary:

Get monitor alarms

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| connectionUuid | path |  | Yes | string |
| type | path |  | Yes | string |
| type | query |  | No | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Successful response |

### /api/monitor/alarm_log/{connectionUuid}/{type}/

#### GET
##### Summary:

Get monitor alarms log

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| connectionUuid | path |  | Yes | string |
| type | path |  | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Successful response |

### /api/monitor/badge/{connectionUuid}/{type}/

#### GET
##### Summary:

Monitor test remote connection

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| connectionUuid | path |  | Yes | string |
| type | path |  | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Successful response |
