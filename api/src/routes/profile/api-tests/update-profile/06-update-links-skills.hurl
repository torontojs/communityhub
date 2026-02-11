# Tests for updating profile links and skills (replace-all behavior)

# Sign in user first
POST {{host}}/api/auth/sign-in
{
	"email": "{{update_profile_email}}",
	"password": "{{update_profile_password}}"
}
HTTP 201
[Captures]
auth-token: cookie "auth_token"

# =====================
# LINKS TESTS
# =====================

# Add initial links
PATCH {{host}}/api/profiles/{{update_profile_id}}
Cookie: auth_token={{auth-token}}
{
	"links": [
		{ "platform": "github", "url": "https://github.com/testuser" },
		{ "platform": "linkedin", "url": "https://linkedin.com/in/testuser" }
	]
}
HTTP 200

# Verify links were added
GET {{host}}/api/profiles/{{update_profile_id}}
HTTP 200
[Asserts]
jsonpath "$.data.links" count == 2
jsonpath "$.data.links[*].platform" contains "github"
jsonpath "$.data.links[*].platform" contains "linkedin"

# Update existing link (replace URL)
PATCH {{host}}/api/profiles/{{update_profile_id}}
Cookie: auth_token={{auth-token}}
{
	"links": [
		{ "platform": "github", "url": "https://github.com/newuser" },
		{ "platform": "linkedin", "url": "https://linkedin.com/in/testuser" }
	]
}
HTTP 200

# Verify link was updated
GET {{host}}/api/profiles/{{update_profile_id}}
HTTP 200
[Asserts]
jsonpath "$.data.links" count == 2
jsonpath "$.data.links[?(@.platform=='github')].url" contains "https://github.com/newuser"

# Remove a link by not including it
PATCH {{host}}/api/profiles/{{update_profile_id}}
Cookie: auth_token={{auth-token}}
{
	"links": [
		{ "platform": "github", "url": "https://github.com/newuser" }
	]
}
HTTP 200

# Verify linkedin was removed
GET {{host}}/api/profiles/{{update_profile_id}}
HTTP 200
[Asserts]
jsonpath "$.data.links" count == 1
jsonpath "$.data.links[0].platform" == "github"

# Remove all links by sending empty array
PATCH {{host}}/api/profiles/{{update_profile_id}}
Cookie: auth_token={{auth-token}}
{
	"links": []
}
HTTP 200

# Verify all links removed
GET {{host}}/api/profiles/{{update_profile_id}}
HTTP 200
[Asserts]
jsonpath "$.data.links" count == 0

# =====================
# SKILLS TESTS
# =====================

# Add initial skills
PATCH {{host}}/api/profiles/{{update_profile_id}}
Cookie: auth_token={{auth-token}}
{
	"skills": ["JavaScript", "TypeScript", "React"]
}
HTTP 200

# Verify skills were added
GET {{host}}/api/profiles/{{update_profile_id}}
HTTP 200
[Asserts]
jsonpath "$.data.skills" count == 3
jsonpath "$.data.skills" contains "JavaScript"
jsonpath "$.data.skills" contains "TypeScript"
jsonpath "$.data.skills" contains "React"

# Replace skills (add new, remove old)
PATCH {{host}}/api/profiles/{{update_profile_id}}
Cookie: auth_token={{auth-token}}
{
	"skills": ["JavaScript", "Node.js", "PostgreSQL"]
}
HTTP 200

# Verify skills were replaced
GET {{host}}/api/profiles/{{update_profile_id}}
HTTP 200
[Asserts]
jsonpath "$.data.skills" count == 3
jsonpath "$.data.skills" contains "JavaScript"
jsonpath "$.data.skills" contains "Node.js"
jsonpath "$.data.skills" contains "PostgreSQL"
jsonpath "$.data.skills" not contains "TypeScript"
jsonpath "$.data.skills" not contains "React"

# Remove all skills by sending empty array
PATCH {{host}}/api/profiles/{{update_profile_id}}
Cookie: auth_token={{auth-token}}
{
	"skills": []
}
HTTP 200

# Verify all skills removed
GET {{host}}/api/profiles/{{update_profile_id}}
HTTP 200
[Asserts]
jsonpath "$.data.skills" count == 0

# =====================
# OMITTING LINKS/SKILLS LEAVES EXISTING DATA UNTOUCHED
# =====================

# Set up links and skills
PATCH {{host}}/api/profiles/{{update_profile_id}}
Cookie: auth_token={{auth-token}}
{
	"links": [
		{ "platform": "github", "url": "https://github.com/testuser" },
		{ "platform": "linkedin", "url": "https://linkedin.com/in/testuser" }
	],
	"skills": ["JavaScript", "TypeScript"]
}
HTTP 200

# Update only name — links and skills should be untouched
PATCH {{host}}/api/profiles/{{update_profile_id}}
Cookie: auth_token={{auth-token}}
{
	"name": "Lancelot Updated"
}
HTTP 200

# Verify links are still there
GET {{host}}/api/profiles/{{update_profile_id}}
HTTP 200
[Asserts]
jsonpath "$.data.name" == "Lancelot Updated"
jsonpath "$.data.links" count == 2
jsonpath "$.data.links[*].platform" contains "github"
jsonpath "$.data.links[*].platform" contains "linkedin"
jsonpath "$.data.skills" count == 2
jsonpath "$.data.skills" contains "JavaScript"
jsonpath "$.data.skills" contains "TypeScript"

# Update only links — skills should be untouched
PATCH {{host}}/api/profiles/{{update_profile_id}}
Cookie: auth_token={{auth-token}}
{
	"links": [
		{ "platform": "github", "url": "https://github.com/updated" }
	]
}
HTTP 200

# Verify skills are still there but links were replaced
GET {{host}}/api/profiles/{{update_profile_id}}
HTTP 200
[Asserts]
jsonpath "$.data.links" count == 1
jsonpath "$.data.links[0].platform" == "github"
jsonpath "$.data.links[0].url" == "https://github.com/updated"
jsonpath "$.data.skills" count == 2
jsonpath "$.data.skills" contains "JavaScript"
jsonpath "$.data.skills" contains "TypeScript"

# Update only skills — links should be untouched
PATCH {{host}}/api/profiles/{{update_profile_id}}
Cookie: auth_token={{auth-token}}
{
	"skills": ["React"]
}
HTTP 200

# Verify links are still there but skills were replaced
GET {{host}}/api/profiles/{{update_profile_id}}
HTTP 200
[Asserts]
jsonpath "$.data.links" count == 1
jsonpath "$.data.links[0].platform" == "github"
jsonpath "$.data.skills" count == 1
jsonpath "$.data.skills" contains "React"

# Clean up: remove all links and skills
PATCH {{host}}/api/profiles/{{update_profile_id}}
Cookie: auth_token={{auth-token}}
{
	"links": [],
	"skills": []
}
HTTP 200
