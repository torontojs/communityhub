# Get all team members from a team id

# Tests incorret id
GET {{host}}/api/teams/b3410598-ecbc-41be-9f68-925da74bc61/members

HTTP 422

# Succesful tests
GET {{host}}/api/teams/b3410598-ecbc-41be-9f68-925da74bc613/members

HTTP 200

[Asserts]
jsonpath "$.data[*].id" contains "012c9ecf-4897-4879-bd7c-9c877d409626"
jsonpath "$.data[*].id" contains "22fa5d4f-1e53-42f3-a00d-7010e7973b12"
