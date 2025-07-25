# Run all steps after a profile is activated until it is completed

# Sign-in user first
POST {{host}}/api/auth/sign-in
{
	"email": "{{profile_status_email}}",
	"password": "{{profile_status_password}}"
}
HTTP 201
[Captures]
auth-token: cookie "auth_token"

# 01 - activated

# Check profile status
GET {{host}}/api/auth/heartbeat
Cookie: auth_token={{auth-token}}
HTTP 200
[Asserts]
jsonpath "$.id" == "{{profile_status_id}}"
jsonpath "$.status" == "activated"

# 02 - tos-accepted

# Sign documents
POST {{host}}/api/documents/sign/code-of-conduct
Cookie: auth_token={{auth-token}}
HTTP 200

POST {{host}}/api/documents/sign/volunteer-agreement
Cookie: auth_token={{auth-token}}
HTTP 200

POST {{host}}/api/documents/sign/image-release-form
Cookie: auth_token={{auth-token}}
HTTP 200

# Check profile status
# TODO: fix profile logic
GET {{host}}/api/auth/heartbeat
Cookie: auth_token={{auth-token}}
HTTP 200
[Asserts]
jsonpath "$.id" == "{{profile_status_id}}"
jsonpath "$.status" == "tos-accepted"

# 03 - social-handle-provided

# There is no intermediate step for this state

# 04 - profile-completed

# Update profile
# TODO: fix url handling
PATCH {{host}}/api/profiles/{{profile_status_id}}
Cookie: auth_auth={{auth-token}}
[Options]
skip: true
{
	"links": [{
		"platform": "slack",
		"url": "profile-status-user"
	}]
}
HTTP 200

# Check profile status
# TODO: fix profile logic
GET {{host}}/api/auth/heartbeat
Cookie: auth_token={{auth-token}}
[Options]
skip: true
HTTP 200
[Asserts]
jsonpath "$.id" == "{{profile_status_id}}"
jsonpath "$.status" == "profile-completed"
