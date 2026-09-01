# Getting a single event should return event data

GET {{host}}/api/events/{{event_id_1}}
HTTP 200
[Asserts]
jsonpath "$.data.id" == "{{event_id_1}}"
jsonpath "$.data.name" == "Seed Event One"
