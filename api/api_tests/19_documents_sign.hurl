# Sign a document for a profile
POST {{host}}/api/auth/sign-in

Content-Type: application/json

{
	"email":"black.knight@bridgeguard.io",
	"password":"ItzJustaFsh!"
}

HTTP 201
[Captures]
auth-token-cookie-var: cookie "auth_token"


POST {{host}}/api/documents/sign/code-of-conduct
Cookie: auth_token={{ auth-token-cookie-var} }

HTTP 200
