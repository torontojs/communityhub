# Getting all projects should return a list of projects

GET {{host}}/api/projects
HTTP 200
[Asserts]
jsonpath "$.data[*].id" contains "{{project_id_1}}"
jsonpath "$.data[*].id" contains "{{project_id_2}}"
