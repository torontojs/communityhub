# Organizer delete team member(s)
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


# Volunteer insuficient access delete role in team
POST {{host}}/api/auth/sign-in

Content-Type: application/json

{
	"email":"lancelot@heroics.inc",
	"password":"LeapotFaith!"
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


# Admin/root delete role
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
Cookie: auth_token={{ auth-token-cookie-var} }

HTTP 204
