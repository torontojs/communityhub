# Getting a single project should return project data

GET {{host}}/api/projects/{{project_id_1}}
HTTP 200
[Asserts]
jsonpath "$.data.id" == "{{project_id_1}}"
jsonpath "$.data.name" == "Seed Project One"
