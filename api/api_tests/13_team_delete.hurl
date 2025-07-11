# Delete team with no session token UNAUTHORIZED
DELETE {{host}}/api/teams/82df0f4a-2a32-4c14-86d9-4b17fc7566e4

HTTP 401


# Delele team with volunteer account FORBIDEN
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


POST {{host}}/api/auth/sign-out
Cookie: auth_token={{ auth-token-cookie-var }}

HTTP 204


# Delete with organizer account
POST {{host}}/api/auth/sign-in

Content-type: application/json

{
	"email":"king.arthur@camelot.uk",
	"password":"H0lyGr@il42!"
}

HTTP 201
[Captures]
auth-token-cookie-var: cookie "auth_token"


DELETE {{host}}/api/teams/b3410598-ecbc-41be-9f68-925da74bc613'
Cookie: auth_token={{auth-token-cookie-var}}

HTTP 403


POST {{host}}/api/auth/sign-out
Cookie: auth_token={{ auth-token-cookie-var }}

HTTP 204


# Delete with admin/root account
POST {{host}}/api/auth/sign-in

Content-type: application/json

{
	"email":"root@torontojs.com",
	"password":"correct horse battery staple"
}

HTTP 201
[Captures]
auth-token-cookie-var: cookie "auth_token"


DELETE {{host}}/api/teams/b3410598-ecbc-41be-9f68-925da74bc61
Cookie: auth_token={{auth-token-cookie-var}}

HTTP 422


DELETE {{host}}/api/teams
Cookie: auth_token={{auth-token-cookie-var}}

HTTP 404


DELETE {{host}}/api/teams/b3410598-ecbc-41be-9f68-925da74bc613
Cookie: auth_token={{auth-token-cookie-var}}

HTTP 200


POST {{host}}/api/auth/sign-out
Cookie: auth_token={{ auth-token-cookie-var }}

HTTP 204
