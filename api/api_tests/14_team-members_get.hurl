# Get all team members from a team id

GET {{host}}/api/teams/b3410598-ecbc-41be-9f68-925da74bc61/members

HTTP 422


GET {{host}}/api/teams/b3410598-ecbc-41be-9f68-925da74bc613/members

HTTP 200

[Asserts]
jsonpath "$.data[*].id" contains "012c9ecf-4897-4879-bd7c-9c877d409626"
jsonpath "$.data[*].id" contains "2217e267-144e-4651-bfce-87ce653f9f03"
jsonpath "$.data[*].id" contains "22fa5d4f-1e53-42f3-a00d-7010e7973b12"
