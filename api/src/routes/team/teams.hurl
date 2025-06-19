# Get all teams OKAY
GET {{host}}/api/teams

HTTP 200
[Asserts]
jsonpath "$.data[0].id" == "b3410598-ecbc-41be-9f68-925da74bc613"
jsonpath "$.data[1].id" == "72bdd945-1479-4f87-8ce7-ef0a6c5101c8"
jsonpath "$.data[2].id" == "70ca1ff2-6ab6-4533-ae79-203f5b08742c"
jsonpath "$.data[3].id" == "82df0f4a-2a32-4c14-86d9-4b17fc7566e4"


# TODO: Get all teams and test pagination


# TODO(Should be 404) Get team using incorect id

GET {{host}}/api/teams/82df0f4a-2a32-4c14-86d9-4b17fc7566e

HTTP 422


# Get specific team using id OKAY
GET {{host}}/api/teams/82df0f4a-2a32-4c14-86d9-4b17fc7566e4

HTTP 200
[Asserts]
jsonpath "$.data.id" == "82df0f4a-2a32-4c14-86d9-4b17fc7566e4"


# Delete team with no session token UNAUTHORIZED
DELETE {{host}}/api/teams/82df0f4a-2a32-4c14-86d9-4b17fc7566e4

HTTP 401


# Create team UNAUTHORIZED
POST {{host}}/api/teams

Content-Type: application/json

{
	"name":"Team Quoison TM Campos Corp"
}

HTTP 401


# Patch team information with no session token
PATCH {{host}}/api/teams/82df0f4a-2a32-4c14-86d9-4b17fc7566e4

Content-Type: application/json
{
	"name":"Quoison's tird team"
}

HTTP 401


# Create, Delele / patch team with volunteer account FORBIDEN
POST {{host}}/api/auth/sign-in

Content-type: application/json

{
	"email":"lancelot@heroics.inc",
	"password":"LeapotFaith!"
}

HTTP 201
[Captures]
auth-token-cookie-var: cookie "auth_token"


DELETE {{host}}/api/teams/82df0f4a-2a32-4c14-86d9-4b17fc7566e4
Cookie: auth_token={{auth-token-cookie-var}}

HTTP 403


PATCH {{host}}/api/teams/82df0f4a-2a32-4c14-86d9-4b17fc7566e4
Cookie: auth_token={{auth-token-cookie-var}}

Content-type: application/json

{
	"name":"Quoison's revenge! This time!"
}

HTTP 403


POST {{host}}/api/teams
Cookie: auth_token={{auth-token-cookie-var}}

{
	"name":"This time Quoison will rise!"
}

HTTP 403


POST {{host}}/api/auth/sign-out
Cookie: auth_token={{ auth-token-cookie-var }}

HTTP 204


# Create, patch and delete with organizer account
POST {{host}}/api/auth/sign-in

Content-type: application/json

{
	"email":"king.arthur@camelot.uk",
	"password":"H0lyGr@il42!"
}

HTTP 201
[Captures]
auth-token-cookie-var: cookie "auth_token"



PATCH {{host}}/api/teams/b3410598-ecbc-41be-9f68-925da74bc613
Cookie: auth_token={{auth-token-cookie-var}}

Content-type: application/json

{
	"name":"Quoison's revenge!"
}

HTTP 200


PATCH {{host}}/api/teams/b3410598-ecbc-41be-9f68-925da74bc613
Cookie: auth_token={{auth-token-cookie-var}}

Content-type: application/json

{
	"name":"Quoison's revenge!",
	"description":"A little bit of love for me"
}

HTTP 200


DELETE {{host}}/api/teams/b3410598-ecbc-41be-9f68-925da74bc613'
Cookie: auth_token={{auth-token-cookie-var}}

HTTP 403


POST {{host}}/api/teams
Cookie: auth_token={{auth-token-cookie-var}}

{
	"name":"This time Quoison will rise!"
}

HTTP 403


POST {{host}}/api/auth/sign-out
Cookie: auth_token={{ auth-token-cookie-var }}

HTTP 204


# Create, patch and delete with admin/root account
POST {{host}}/api/auth/sign-in

Content-type: application/json

{
	"email":"root@torontojs.com",
	"password":"correct horse battery staple"
}

HTTP 201
[Captures]
auth-token-cookie-var: cookie "auth_token"



PATCH {{host}}/api/teams/b3410598-ecbc-41be-9f68-925da74bc613
Cookie: auth_token={{auth-token-cookie-var}}

Content-type: application/json

{
	"name":"Hihi de huhu Zuzz"
}

HTTP 200


GET {{host}}/api/teams/b3410598-ecbc-41be-9f68-925da74bc613

HTTP 200
[Asserts]
jsonpath "$.data.name" == "Hihi de huhu Zuzz"


PATCH {{host}}/api/teams/b3410598-ecbc-41be-9f68-925da74bc613
Cookie: auth_token={{auth-token-cookie-var}}

Content-type: application/json

{
	"name":"Quoison quoisson quoizon",
	"description":"I sense a pattern"
}

HTTP 200


GET {{host}}/api/teams/b3410598-ecbc-41be-9f68-925da74bc613

HTTP 200
[Asserts]
jsonpath "$.data.name" == "Quoison quoisson quoizon"
jsonpath "$.data.description" == "I sense a pattern"


DELETE {{host}}/api/teams/b3410598-ecbc-41be-9f68-925da74bc61
Cookie: auth_token={{auth-token-cookie-var}}

HTTP 422


DELETE {{host}}/api/teams
Cookie: auth_token={{auth-token-cookie-var}}

HTTP 404


DELETE {{host}}/api/teams/b3410598-ecbc-41be-9f68-925da74bc613
Cookie: auth_token={{auth-token-cookie-var}}

HTTP 200


POST {{host}}/api/teams
Cookie: auth_token={{auth-token-cookie-var}}

Content-type: application/json

{
	"name":"This time Quoison will rise!"
}

HTTP 500


POST {{host}}/api/teams
Cookie: auth_token={{auth-token-cookie-var}}

Content-type: application/json

{
	"name":"This time Quoison will rise!. Pretty please",
	"description":"Hihi"
}

HTTP 201


POST {{host}}/api/auth/sign-out
Cookie: auth_token={{ auth-token-cookie-var }}

HTTP 204
