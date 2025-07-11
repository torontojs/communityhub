# Get all teams OKAY
GET {{host}}/api/teams

HTTP 200
[Asserts]
jsonpath "$.data[*].id" contains "72bdd945-1479-4f87-8ce7-ef0a6c5101c8"
jsonpath "$.data[*].id" contains "70ca1ff2-6ab6-4533-ae79-203f5b08742c"
jsonpath "$.data[*].id" contains "82df0f4a-2a32-4c14-86d9-4b17fc7566e4"


# TODO(Should be 404) Get team using incorect id
GET {{host}}/api/teams/82df0f4a-2a32-4c14-86d9-4b17fc7566e

HTTP 422


# Get specific team using id OKAY
GET {{host}}/api/teams/82df0f4a-2a32-4c14-86d9-4b17fc7566e4

HTTP 200
[Asserts]
jsonpath "$.data.id" == "82df0f4a-2a32-4c14-86d9-4b17fc7566e4"
