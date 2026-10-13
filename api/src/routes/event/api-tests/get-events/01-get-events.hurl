# Getting all events should return a list of events

GET {{host}}/api/events
HTTP 200
[Asserts]
jsonpath "$.data[*].id" contains "{{event_id_1}}"
jsonpath "$.data[*].id" contains "{{event_id_2}}"
