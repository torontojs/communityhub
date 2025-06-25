# Get all team members from a team id

GET {{host}}/api/teams/b3410598-ecbc-41be-9f68-925da74bc61/members

HTTP 422



GET {{host}}/api/teams/b3410598-ecbc-41be-9f68-925da74bc613/members

HTTP 200

[Asserts]
jsonpath "$.data[0].id" == "012c9ecf-4897-4879-bd7c-9c877d409626"
jsonpath "$.data[1].id" == "2217e267-144e-4651-bfce-87ce653f9f03"
jsonpath "$.data[2].id" == "22fa5d4f-1e53-42f3-a00d-7010e7973b12"


# TODO Test team members pagination when the feature is built


# UNAUTHORIZED add new team member(s)
POST {{host}}/api/teams/72bdd945-1479-4f87-8ce7-ef0a6c5101c8/members

Content-Type: application/json
[
	{
		"name":"My Role is Quoison",
		"profileId":"bf950534-e8f9-4f5a-a246-610aa63faf21",
		"description":"Marco's assistant"
	}
]

HTTP 401


POST {{host}}/api/teams/bf950534-e8f9-4f5a-a246-610aa63faf21/members

Content-Type: application/json

[
	{
		"name":"My Role is Quoison",
		"profileId":"bf950534-e8f9-4f5a-a246-610aa63faf21",
		"description":"Marco's assistant"
	},
	{
		"name":"Unauthorized quoison role",
		"profileId":"22fa5d4f-1e53-42f3-a00d-7010e7973b12"
	}
]

HTTP 401


# AUTHORIZED organizer adds new team member(s)
POST {{host}}/api/auth/sign-in

Content-Type: application/json

{
	"email":"black.knight@bridgeguard.io",
	"password":"ItzJustaFsh!"
}

HTTP 201
[Captures]
auth-token-cookie-var: cookie "auth_token"


POST {{host}}/api/teams/72bdd945-1479-4f87-8ce7-ef0a6c5101c8/members
Cookie: auth_token={{ auth-token-cookie-var} }

Content-Type: application/json

	{
		"name":"My Role is Quoison",
		"profileId":"bf950534-e8f9-4f5a-a246-610aa63faf21",
		"description":"Marco's assistant"
	}

HTTP 422


POST {{host}}/api/teams/b3410598-ecbc-41be-9f68-925da74bc613/members
Cookie: auth_token={{ auth-token-cookie-var} }

Content-Type: application/json

[
	{
		"name":"My Role is Quoison",
		"profileId":"bf950534-e8f9-4f5a-a246-610aa63faf21",
		"description":"Marco's assistant"
	}
]

HTTP 201


POST {{host}}/api/teams/b3410598-ecbc-41be-9f68-925da74bc613/members
Cookie: auth_token={{ auth-token-cookie-var }}

Content-Type: application/json

[
	{
		"name":"My Role is Quoison Quoizon Cuisson",
		"profileId":"bf950534-e8f9-4f5a-a246-610aa63faf21",
		"description":"Marco's lesser known annoying assistant"
	},
	{
		"name":"This role",
		"profileId":"bf950534-e8f9-4f5a-a246-610aa63faf21",
		"description":"Quoizo's intern"
	}
]

HTTP 201


POST {{host}}/api/auth/sign-out
Cookie: auth_token={{ auth-token-cookie-var }}

HTTP 204


GET {{host}}/api/teams/b3410598-ecbc-41be-9f68-925da74bc613/members

HTTP 200



#UNAUTHORIZED volunteer attempts to add new team members
POST {{host}}/api/auth/sign-in

Content-Type: application/json

{
	"email":"sir.robin@cowardly.co",
	"password":"RunAway!1234"
}

HTTP 201
[Captures]
auth-token-cookie-var: cookie "auth_token"


POST {{host}}/api/teams/b3410598-ecbc-41be-9f68-925da74bc613//members
Cookie: auth_token={{ auth-token-cookie-var} }

Content-Type: application/json

[
	{
		"name":"My Role is Quoison",
		"profileId":"72bdd945-1479-4f87-8ce7-ef0a6c5101c8",
		"description":"Marco's assistant"
	}
]

HTTP 404


POST {{host}}/api/teams/b3410598-ecbc-41be-9f68-925da74bc613//members
Cookie: auth_token={{ auth-token-cookie-var }}

Content-Type: application/json

[
	{
		"name":"My Role is Quoison Assistant",
		"profileId":"72bdd945-1479-4f87-8ce7-ef0a6c5101c8",
		"description":"Another Marco assistant"
	},
	{
		"name":"My role is a role",
		"profileId":"72bdd945-1479-4f87-8ce7-ef0a6c5101c8",
		"description":"A group of new team members"
	}
]

HTTP 404

POST {{host}}/api/auth/sign-out
Cookie: auth_token={{ auth-token-cookie-var }}

HTTP 204


# AUTHORIZED root admin adds new team member(s)
POST {{host}}/api/auth/sign-in

Content-Type: application/json

{
	"email":"root@torontojs.com",
	"password":"correct horse battery staple"
}

HTTP 201
[Captures]
auth-token-cookie-var: cookie "auth_token"


POST {{host}}/api/teams/b3410598-ecbc-41be-9f68-925da74bc613/members
Cookie: auth_token={{ auth-token-cookie-var} }

Content-Type: application/json

[
	{
		"name":"Admiral Director Quoison",
		"profileId":"b3410598-ecbc-41be-9f68-925da74bc613",
		"description":"Marco's boss"
	}
]

HTTP 201


POST {{host}}/api/teams/b3410598-ecbc-41be-9f68-925da74bc613/members
Cookie: auth_token={{ auth-token-cookie-var }}

Content-Type: application/json

[
	{
		"name":"Lower grounds director",
		"profileId":"bf950534-e8f9-4f5a-a246-610aa63faf21",
		"description":"Who knows"
	},
	{
		"name":"Supreme burger",
		"profileId":"bf950534-e8f9-4f5a-a246-610aa63faf21",
		"description":"tasty"
	}
]

HTTP 201


POST {{host}}/api/auth/sign-out
Cookie: auth_token={{ auth-token-cookie-var }}

HTTP 204


GET {{host}}/api/teams/b3410598-ecbc-41be-9f68-925da74bc613/members

HTTP 200


# update team member(s)


# organizer delete team member(s)
POST {{host}}/api/auth/sign-in

Content-Type: application/json

{
	"email":"black.knight@bridgeguard.io",
	"password":"ItzJustaFsh!"
}

HTTP 201
[Captures]
auth-token-cookie-var: cookie "auth_token"


DELETE {{host}}/api/teams/72bdd945-1479-4f87-8ce7-ef0a6c5101c8/members
Cookie: auth_token={{ auth-token-cookie-var} }

Content-Type: application/json

[
	"f7068575-7836-45da-af7a-0cf32928c1c5"
]

HTTP 200


DELETE {{host}}/api/teams/72bdd945-1479-4f87-8ce7-ef0a6c5101c8/members
Cookie: auth_token={{ auth-token-cookie-var} }

Content-Type: application/json

[
	"376d3bf1-2f82-41b5-ab8c-f8476c722b56",
	"f1192512-6fb7-41b2-861e-49a38e3f7a09"
]

HTTP 200


POST {{host}}/api/auth/sign-out

HTTP 204


# volunteer insuficient access delete role in team
POST {{host}}/api/auth/sign-in

Content-Type: application/json

{
	"email":"sir.robin@cowardly.co",
	"password":"RunAway!1234"
}

HTTP 201
[Captures]
auth-token-cookie-var: cookie "auth_token"


DELETE {{host}}/api/teams/72bdd945-1479-4f87-8ce7-ef0a6c5101c8/members
Cookie: auth_token={{ auth-token-cookie-var} }

Content-Type: application/json

[
	"f7068575-7836-45da-af7a-0cf32928c1c5"
]

HTTP 403


DELETE {{host}}/api/teams/72bdd945-1479-4f87-8ce7-ef0a6c5101c8/members
Cookie: auth_token={{ auth-token-cookie-var} }

Content-Type: application/json

[
	"376d3bf1-2f82-41b5-ab8c-f8476c722b56",
	"f1192512-6fb7-41b2-861e-49a38e3f7a09"
]

HTTP 403


POST {{host}}/api/auth/sign-out

HTTP 204


# admin/root delete role
POST {{host}}/api/auth/sign-in

Content-Type: application/json

{
	"email":"root@torontojs.com",
	"password":"correct horse battery staple"
}

HTTP 201
[Captures]
auth-token-cookie-var: cookie "auth_token"


DELETE {{host}}/api/teams/70ca1ff2-6ab6-4533-ae79-203f5b08742c/members
Cookie: auth_token={{ auth-token-cookie-var} }

Content-Type: application/json

[
	"ed2a893e-54ee-43af-b03d-eed39374fc9c"
]

HTTP 200


DELETE {{host}}/api/teams/70ca1ff2-6ab6-4533-ae79-203f5b08742c/members
Cookie: auth_token={{ auth-token-cookie-var} }

Content-Type: application/json

[
	"6f73e09d-8481-4a05-b4a3-524cd86080cd",
	"841f251a-6197-4282-a527-6db44c6d2215"
]

HTTP 200


POST {{host}}/api/auth/sign-out

HTTP 204


# patch team memeber with organizer account

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
