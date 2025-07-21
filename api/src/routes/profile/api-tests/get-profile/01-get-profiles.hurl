# Gets a list of profiles and verify if some profile is in the list
GET {{host}}/api/profiles
HTTP 200
[Asserts]
jsonpath "$.data[*].id" contains "{{organizer_id}}"
jsonpath "$.data[*].id" contains "{{volunteer_id}}"
jsonpath "$.data[*].id" not contains "{{created_id}}"
jsonpath "$.data[*].id" not contains "{{deleted_id}}"
