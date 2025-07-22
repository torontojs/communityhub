# Basic document signing for a profile

# Sign-in first
POST {{host}}/api/auth/sign-in
{
	"email": "{{sign_document_user_email}}",
	"password": "{{sign_document_user_password}}"
}
HTTP 201
[Captures]
auth-token: cookie "auth_token"

# Sign the code of conduct with this profile
POST {{host}}/api/documents/sign/code-of-conduct
Cookie: auth_token={{auth-token}}
HTTP 200

# Verify the document is signed
GET {{host}}/api/documents/signed
Cookie: auth_token={{auth-token}}
HTTP 200
[Asserts]
jsonpath "$.data[*].type" contains "code-of-conduct"
