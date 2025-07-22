# Getting team members for the wrong team should return an error

# Invalid team id
# TODO: https://github.com/torontojs/communityhub/issues/205
GET {{host}}/api/teams/00000000-0000-0000-0000-000000000000/members
[Options]
skip: true
HTTP 404

# Malformed UUID
GET {{host}}/api/teams/malformed-id/members
HTTP 422
