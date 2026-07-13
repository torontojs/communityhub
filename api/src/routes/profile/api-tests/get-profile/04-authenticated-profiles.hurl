# Authenticated profiles list — organizers get private fields (email) + pagination

# Sign in as organizer
POST {{host}}/api/auth/sign-in
{
	"email": "{{organizer_email}}",
	"password": "{{organizer_password}}"
}
HTTP 200
[Captures]
auth-token: cookie "auth_token"

# Organizers get the profiles list including the private email field
GET {{host}}/api/profiles/authenticated
Cookie: auth_token={{auth-token}}
HTTP 200
[Asserts]
jsonpath "$.data[*].id" contains "{{organizer_id}}"
jsonpath "$.data[*].id" contains "{{volunteer_id}}"
jsonpath "$.data[*].id" not contains "{{deleted_id}}"
jsonpath "$.data[0].email" exists

# Organizers get a single profile including private fields
GET {{host}}/api/profiles/{{volunteer_id}}/authenticated
Cookie: auth_token={{auth-token}}
HTTP 200
[Asserts]
jsonpath "$.data.id" == "{{volunteer_id}}"
jsonpath "$.data.email" exists

# Pagination respects limit
GET {{host}}/api/profiles/authenticated?limit=1
Cookie: auth_token={{auth-token}}
HTTP 200
[Asserts]
jsonpath "$.start" == 0
jsonpath "$.currentPage" == 1
jsonpath "$.size" == 1

# Invalid pagination values are rejected
GET {{host}}/api/profiles/authenticated?limit=0
Cookie: auth_token={{auth-token}}
HTTP 422

GET {{host}}/api/profiles/authenticated?page=abc
Cookie: auth_token={{auth-token}}
HTTP 422
