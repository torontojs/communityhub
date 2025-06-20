# Get all team members from a team id

GET {{host}}/api/teams/b3410598-ecbc-41be-9f68-925da74bc61/members

HTTP 422


GET {{host}}/api/teams/72bdd945-1479-4f87-8ce7-ef0a6c5101c8/members

HTTP 200


GET {{host}}/api/teams/72bdd945-1479-4f87-8ce7-ef0a6c5101c8/members

HTTP 200

[Asserts]
jsonpath "$.data[1].teamId" == "72bdd945-1479-4f87-8ce7-ef0a6c5101c8"

# TODO Test team members pagination when the feature is built
