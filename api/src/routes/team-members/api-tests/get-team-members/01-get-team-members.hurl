# Basic check for getting team members
GET {{host}}/api/teams/{{team_members_team_id}}/members
HTTP 200
[Asserts]
jsonpath "$.data[*].profileId" contains "{{team_member_id_1}}"
jsonpath "$.data[*].profileId" contains "{{team_member_id_2}}"
jsonpath "$.data[*].profileId" contains "{{team_member_id_3}}"

# Omitting page should return the first page instead of skipping the first result
GET {{host}}/api/teams/{{team_members_team_id}}/members?limit=1
HTTP 200
[Asserts]
jsonpath "$.start" == 0
jsonpath "$.currentPage" == 1
jsonpath "$.size" == 1
