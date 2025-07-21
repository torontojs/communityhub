# Checks for content that can be potential errors

# Wrong content type - hex type
POST {{host}}/api/auth/sign-up
Content-Type: application/octet-stream
{
	"name": "Test",
	"email": "test-type@example.com",
	"password": "{{default_password}}"
}

HTTP 422

# Wrong content type - plain text
POST {{host}}/api/auth/sign-up
Content-Type: text/plain
{
	"name": "Test",
	"email": "test-type@example.com",
	"password": "{{default_password}}"
}

HTTP 422

# Wrong content type - Basic form
POST {{host}}/api/auth/sign-up
[Form]
name: Test
email: test-type@example.com
password: {{default_password}}

HTTP 422

# Wrong content type - Multipart form
POST {{host}}/api/auth/sign-up
[Multipart]
name: Test
email: test-type@example.com
password: {{default_password}}

HTTP 422


# Empty body
POST {{host}}/api/auth/sign-up

HTTP 422
