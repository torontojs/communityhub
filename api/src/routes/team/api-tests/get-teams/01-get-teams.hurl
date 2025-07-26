# Getting all teams should return a list of teams

GET {{host}}/api/teams
HTTP 200
[Asserts]
jsonpath "$.data[*].id" contains "{{team_id_1}}"
jsonpath "$.data[*].id" contains "{{team_id_2}}"
jsonpath "$.data[*].id" contains "{{team_id_3}}"
jsonpath "$.data[*].id" contains "{{team_id_4}}"
