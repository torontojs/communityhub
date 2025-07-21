# Get all signed documents for a profile
POST {{host}}/api/auth/sign-in

Content-Type: application/json

{
	"email":"black.knight@bridgeguard.io",
	"password":"ItzJustaFsh!"
}

HTTP 201
[Captures]
auth-token-cookie-var: cookie "auth_token"


GET {{host}}/api/documents/signed
Cookie: auth_token={{ auth-token-cookie-var} }

HTTP 200

[Asserts]
jsonpath "$.data[*].type" contains "code-of-conduct"
jsonpath "$.data[*].type" contains "image-release-form"
jsonpath "$.data[*].type" contains "volunteer-agreement"
