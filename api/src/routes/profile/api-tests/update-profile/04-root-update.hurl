# Root users should be able to update any profile

# Sign in user first
POST {{host}}/api/auth/sign-in
{
	"email": "{{root_email}}",
	"password": "{{root_password}}"
}
HTTP 200
[Captures]
auth-token: cookie "auth_token"

# Update self profile
PATCH {{host}}/api/profiles/{{update_profile_id}}
Cookie: auth_token={{auth-token}}
{
	"name": "Updated Name - root"
}
HTTP 200

# Verify if profile was updated
GET {{host}}/api/profiles/{{update_profile_id}}
HTTP 200
[Asserts]
jsonpath "$.data.name" == "Updated Name - root"
jsonpath "$.data.email" == "{{update_profile_email}}"
