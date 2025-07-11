# Patch team information with no session token
PATCH {{host}}/api/teams/82df0f4a-2a32-4c14-86d9-4b17fc7566e4

Content-Type: application/json
{
	"name":"Quoison's tird team"
}

HTTP 401


# Patch team with volunteer account FORBIDEN
POST {{host}}/api/auth/sign-in

Content-type: application/json

{
	"email":"lancelot@heroics.inc",
	"password":"LeapotFaith!"
}

HTTP 201
[Captures]
auth-token-cookie-var: cookie "auth_token"


PATCH {{host}}/api/teams/82df0f4a-2a32-4c14-86d9-4b17fc7566e4
Cookie: auth_token={{auth-token-cookie-var}}

Content-type: application/json

{
	"name":"Quoison's revenge! This time!"
}

HTTP 403


POST {{host}}/api/auth/sign-out
Cookie: auth_token={{ auth-token-cookie-var }}

HTTP 204


# Patch organizer account
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
	"name":""
}

HTTP 422


PATCH {{host}}/api/teams/b3410598-ecbc-41be-9f68-925da74bc613
Cookie: auth_token={{auth-token-cookie-var}}

Content-type: application/json

{}

HTTP 422


PATCH {{host}}/api/teams/b3410598-ecbc-41be-9f68-925da74bc613
Cookie: auth_token={{auth-token-cookie-var}}

Content-type: application/json

{
	"name":"Quoison's revenge!",
	"description":"A little bit of love for me"
}

HTTP 200


PATCH {{host}}/api/teams/b3410598-ecbc-41be-9f68-925da74bc613
Cookie: auth_token={{auth-token-cookie-var}}

Content-type: application/json

{
	"name":""
}

HTTP 422


PATCH {{host}}/api/teams/b3410598-ecbc-41be-9f68-925da74bc613
Cookie: auth_token={{auth-token-cookie-var}}

Content-type: application/json

{}

HTTP 422


POST {{host}}/api/auth/sign-out
Cookie: auth_token={{ auth-token-cookie-var }}

HTTP 204


# Patch admin/root account
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


PATCH {{host}}/api/teams/b3410598-ecbc-41be-9f68-925da74bc613
Cookie: auth_token={{auth-token-cookie-var}}

Content-type: application/json

{
	"name":""
}

HTTP 422


PATCH {{host}}/api/teams/b3410598-ecbc-41be-9f68-925da74bc613
Cookie: auth_token={{auth-token-cookie-var}}

Content-type: application/json

{
	"name":"Quoison quoisson quoizon",
	"description":"I sense a pattern"
}

HTTP 200


POST {{host}}/api/auth/sign-out
Cookie: auth_token={{ auth-token-cookie-var }}

HTTP 204
