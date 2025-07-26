# Getting the wrong team should return an error

# Invalid team id
GET {{host}}/api/teams/00000000-0000-0000-0000-000000000000
HTTP 404

# Malformed UUID
GET {{host}}/api/teams/malformed-id
HTTP 422
