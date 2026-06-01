# Check for basic update profile operations

# Sign in user first
POST {{host}}/api/auth/sign-in
{
	"email": "{{update_profile_email}}",
	"password": "{{update_profile_password}}"
}
HTTP 201
[Captures]
auth-token: cookie "auth_token"

# Update self profile
PATCH {{host}}/api/profiles/{{update_profile_id}}
Cookie: auth_token={{auth-token}}
{
	"name": "Updated Name"
}
HTTP 200

# Verify if profile was updated
GET {{host}}/api/profiles/{{update_profile_id}}
HTTP 200
[Asserts]
jsonpath "$.data.name" == "Updated Name"
jsonpath "$.data.email" == "{{update_profile_email}}"
