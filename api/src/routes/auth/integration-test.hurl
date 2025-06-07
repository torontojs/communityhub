# Sign in intergration test
POST http://localhost:3000/api/auth/sign-in
Content-Type: application/json

{
  "email": "profile1@example.com",
  "password": "securePassword123#"
}

HTTP 201
[Captures]
auth-token-cookie-var: cookie "auth_token"
[Asserts]
status == 201

# Heartbeat intergration test NOT FOUND
POST http://localhost:3000/api/auth/heartbeat
Content-Type: application/json

HTTP 404
[Asserts]
status == 404

# # Heartbeat intergration test UNAUTHORIZED
# POST http://localhost:3000/api/auth/heartbeat
# Content-Type: application/json

# HTTP 401
# [Asserts]
# status == 401

# # Sign in intergration test
# POST http://localhost:3000/api/auth/sign-in
# Content-Type: application/json
#
# {
#   "email": "profile1@example.com",
#   "password": "securePassword123#"
# }

# HTTP 201

# [Captures]
# auth-token-cookie-var: cookie "auth_token"
# [Asserts]const { email } = context.req.valid('json');
# status == 201

# # Heartbeat check after successful sign-in
# GET http://localhost:3000/api/auth/heartbeat
# Cookie: auth_token={% auth-token-cookie-var %}
#
# HTTP 200
# [Asserts]
# status == 200

# # Initial Sign up intergration test
# POST http://localhost:3000/api/auth/sign-up
# Content-Type: application/json
#
# {
#   "email": "signup@example.com",
#   "password": "signupPassword123$",
#   "name": "Random Name"
# }
#
# HTTP 200
# [Asserts]
# status == 200
#
# # Sign up duplicate email intergration tests
# POST http://localhost:3000/api/auth/sign-up
# Content-Type: application/json
#
# {
#   "email": "signup@example.com",
#   "password": "signupPassword123$",
#   "name":"Random Name"
# }
#
# HTTP 200
# [Asserts]
# status == 200

# Forgot password with valid email
POST http://localhost:3000/api/auth/forgot-password
Content-Type: application/json

{
  "email": "profile1@example.com"
}

HTTP 200
[Asserts]
status == 200
jsonpath "$.message" == "If an account with that e-mail exists, a password reset link has been sent."

# Forgot password with non-existent email (should still return 200 for security)
POST http://localhost:3000/api/auth/forgot-password
Content-Type: application/json

{
  "email": "nonexistent@example.com"
}

HTTP 200
[Asserts]
status == 200
jsonpath "$.message" == "If an account with that e-mail exists, a password reset link has been sent."

# Forgot password with invalid email format
POST http://localhost:3000/api/auth/forgot-password
Content-Type: application/json

{
  "email": "invalid-email"
}

HTTP 422
[Asserts]
status == 422

# Forgot password with missing email field
POST http://localhost:3000/api/auth/forgot-password
Content-Type: application/json

{}

HTTP 422
[Asserts]
status == 422

# Forgot password with empty email
POST http://localhost:3000/api/auth/forgot-password
Content-Type: application/json

{
  "email": ""
}

HTTP 422
[Asserts]
status == 422
