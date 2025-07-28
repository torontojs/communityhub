# Checks for getting a single profile

# Valid profile id
GET {{host}}/api/profiles/{{organizer_id}}
HTTP 200
[Asserts]
jsonpath "$.data.id" == "{{organizer_id}}"

# Invalid profile id
GET {{host}}/api/profiles/00000000-0000-0000-0000-000000000000
HTTP 404

# Malformed UUID
GET {{host}}/api/profiles/malformed-id
HTTP 422
