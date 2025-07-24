# Basic check for getting team members
GET {{host}}/api/teams/{{team_members_team_id}}/members
HTTP 200
[Asserts]
jsonpath "$.data[*].profileId" contains "{{team_member_id_1}}"
jsonpath "$.data[*].profileId" contains "{{team_member_id_2}}"
jsonpath "$.data[*].profileId" contains "{{team_member_id_3}}"
