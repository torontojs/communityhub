# Get a specific team by it's id
GET {{host}}/api/teams/{{team_id_1}}
HTTP 200
[Asserts]
jsonpath "$.data.id" == "{{team_id_1}}"
