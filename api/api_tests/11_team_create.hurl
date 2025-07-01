# create team with no token
POST {{host}}/api/teams

{
	"name":"This time Quoison will rise!"
}

HTTP 401

# Create team with volunteer account FORBIDEN
POST {{host}}/api/auth/sign-in

Content-type: application/json

{
	"email":"lancelot@heroics.inc",
	"password":"LeapotFaith!"
}

HTTP 201
[Captures]
auth-token-cookie-var: cookie "auth_token"


POST {{host}}/api/teams
Cookie: auth_token={{auth-token-cookie-var}}

{
	"name":"This time Quoison will rise!"
}

HTTP 403


POST {{host}}/api/auth/sign-out
Cookie: auth_token={{ auth-token-cookie-var }}

HTTP 204


# Create with organizer account
POST {{host}}/api/auth/sign-in

Content-type: application/json

{
	"email":"king.arthur@camelot.uk",
	"password":"H0lyGr@il42!"
}

HTTP 201
[Captures]
auth-token-cookie-var: cookie "auth_token"


POST {{host}}/api/teams
Cookie: auth_token={{auth-token-cookie-var}}

{
	"name":"This time Quoison will rise!"
}

HTTP 403


POST {{host}}/api/auth/sign-out
Cookie: auth_token={{ auth-token-cookie-var }}

HTTP 204


# Create with admin/root account
POST {{host}}/api/auth/sign-in

Content-type: application/json

{
	"email":"root@torontojs.com",
	"password":"correct horse battery staple"
}

HTTP 201
[Captures]
auth-token-cookie-var: cookie "auth_token"


POST {{host}}/api/teams
Cookie: auth_token={{auth-token-cookie-var}}

Content-type: application/json

{
	"name":"This time Quoison will rise!"
}

HTTP 201


POST {{host}}/api/teams
Cookie: auth_token={{auth-token-cookie-var}}

Content-type: application/json

{
	"description":"hihi de huhu"
}

HTTP 422


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
