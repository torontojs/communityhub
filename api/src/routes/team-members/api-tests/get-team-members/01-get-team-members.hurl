# Basic check for getting team members
GET {{host}}/api/teams/{{team_membets_team_id}}/members
HTTP 200
[Asserts]
jsonpath "$.data[*].id" contains "{{team_member_id_1}}"
jsonpath "$.data[*].id" contains "{{team_member_id_2}}"
jsonpath "$.data[*].id" contains "{{team_member_id_3}}"
