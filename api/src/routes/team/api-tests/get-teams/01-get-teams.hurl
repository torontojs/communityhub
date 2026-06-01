# Getting all teams should return a list of teams

GET {{host}}/api/teams
HTTP 200
[Asserts]
jsonpath "$.data[*].id" contains "{{team_id_1}}"
jsonpath "$.data[*].id" contains "{{team_id_2}}"
jsonpath "$.data[*].id" contains "{{team_id_3}}"
jsonpath "$.data[*].id" contains "{{team_id_4}}"

# Omitting page should return the first page instead of skipping the first result
GET {{host}}/api/teams?limit=1
HTTP 200
[Asserts]
jsonpath "$.start" == 0
jsonpath "$.currentPage" == 1
jsonpath "$.size" == 1

# Selecting the second page should return the second result
GET {{host}}/api/teams?limit=1&page=2
HTTP 200
[Asserts]
jsonpath "$.start" == 1
jsonpath "$.currentPage" == 2
jsonpath "$.size" == 1
