# Check for invalid document type

# Sign-in first
POST {{host}}/api/auth/sign-in
{
	"email": "{{sign_document_user_email}}",
	"password": "{{sign_document_user_password}}"
}
HTTP 201
[Captures]
auth-token: cookie "auth_token"

# Try to sign error document type
POST {{host}}/api/documents/sign/error-document-type
Cookie: auth_token={{auth-token}}
HTTP 422
