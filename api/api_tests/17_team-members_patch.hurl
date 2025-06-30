# patch team member with organizer account

POST {{host}}/api/auth/sign-in

Content-Type: application/json

{
	"email":"black.knight@bridgeguard.io",
	"password":"ItzJustaFsh!"
}

HTTP 201
[Captures]
auth-token-cookie-var: cookie "auth_token"


PATCH {{host}}/api/teams/72bdd945-1479-4f87-8ce7-ef0a6c5101c8/members
Cookie: auth_token={{ auth-token-cookie-var} }

Content-Type: application/json

[
	{
	"id":"f7068575-7836-45da-af7a-0cf32928c1c5",
	"name":"Super cool role new name",
	"description":""
	}
]

HTTP 200


PATCH {{host}}/api/teams/72bdd945-1479-4f87-8ce7-ef0a6c5101c8/members
Cookie: auth_token={{ auth-token-cookie-var} }

Content-Type: application/json

[
	{
	"id":"376d3bf1-2f82-41b5-ab8c-f8476c722b56",
	"name":"role patched by organizer"
	},
	{
	"id":"f1192512-6fb7-41b2-861e-49a38e3f7a09",
	"name":"super duper awesome not cool role name given by organizer",
	"description":"this role makes me look important"
	}
]

HTTP 200


POST {{host}}/api/auth/sign-out

HTTP 204


# admin/root patch role
POST {{host}}/api/auth/sign-in

Content-Type: application/json

{
	"email":"root@torontojs.com",
	"password":"correct horse battery staple"
}

HTTP 201
[Captures]
auth-token-cookie-var: cookie "auth_token"

PATCH {{host}}/api/teams/70ca1ff2-6ab6-4533-ae79-203f5b08742c/members
Cookie: auth_token={{ auth-token-cookie-var} }

Content-Type: application/json

[
	{
	"id":"f7068575-7836-45da-af7a-0cf32928c1c5",
	"name":"Root given role new name",
	"description":""
	}
]

HTTP 200


PATCH {{host}}/api/teams/70ca1ff2-6ab6-4533-ae79-203f5b08742c/members
Cookie: auth_token={{ auth-token-cookie-var} }

Content-Type: application/json

[
	{
	"id":"376d3bf1-2f82-41b5-ab8c-f8476c722b56",
	"name":"Root says this is my role name now"
	},
	{
	"id":"f1192512-6fb7-41b2-861e-49a38e3f7a09",
	"name":"super duper awesome not cool role name given by root",
	"description":"this role makes me look important because root account says so"
	}
]

HTTP 200


POST {{host}}/api/auth/sign-out


# unathorized & fordiden patch attempts
PATCH {{host}}/api/teams/72bdd945-1479-4f87-8ce7-ef0a6c5101c8/members

Content-Type: application/json

[
	{
	"id":"f7068575-7836-45da-af7a-0cf32928c1c5",
	"name":"Super cool role new name",
	"description":""
	}
]

HTTP 401


PATCH {{host}}/api/teams/72bdd945-1479-4f87-8ce7-ef0a6c5101c8/members

Content-Type: application/json

[
	{
	"id":"376d3bf1-2f82-41b5-ab8c-f8476c722b56",
	"name":"role patched by organizer"
	},
	{
	"id":"f1192512-6fb7-41b2-861e-49a38e3f7a09",
	"name":"super duper awesome not cool role name given by organizer",
	"description":"this role makes me look important"
	}
]

HTTP 401


POST {{host}}/api/auth/sign-in

Content-Type: application/json

{
	"email":"lancelot@heroics.inc",
	"password":"LeapotFaith!"
}

HTTP 201
[Captures]
auth-token-cookie-var: cookie "auth_token"



PATCH {{host}}/api/teams/72bdd945-1479-4f87-8ce7-ef0a6c5101c8/members
Cookie: auth_token={{ auth-token-cookie-var} }

Content-Type: application/json

[
	{
	"id":"f7068575-7836-45da-af7a-0cf32928c1c5",
	"name":"Super cool role new name",
	"description":""
	}
]

HTTP 403


PATCH {{host}}/api/teams/72bdd945-1479-4f87-8ce7-ef0a6c5101c8/members
Cookie: auth_token={{ auth-token-cookie-var} }

Content-Type: application/json

[
	{
	"id":"376d3bf1-2f82-41b5-ab8c-f8476c722b56",
	"name":"role patched by organizer"
	},
	{
	"id":"f1192512-6fb7-41b2-861e-49a38e3f7a09",
	"name":"super duper awesome not cool role name given by organizer",
	"description":"this role makes me look important"
	}
]

HTTP 403
