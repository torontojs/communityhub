# Sign in intergration test
POST http://localhost:4242/auth/sign-in
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
POST http://localhost:4242/auth/heartbeat
Content-Type: application/json

HTTP 404
[Asserts]
status == 404

# # Heartbeat intergration test UNAUTHORIZED
# POST http://localhost:4242/auth/heartbeat
# Content-Type: application/json

# HTTP 401
# [Asserts]
# status == 401

# # Sign in intergration test
# POST http://localhost:4242/auth/sign-in
# Content-Type: application/json
#
# {
#   "email": "profile1@example.com",
#   "password": "securePassword123#"
# }

# HTTP 201

# [Captures]
# auth-token-cookie-var: cookie "auth_token"
# [Asserts]
# status == 201

# # Heartbeat check after successful sign-in
# GET http://localhost:4242/auth/heartbeat
# Cookie: auth_token={% auth-token-cookie-var %}
#
# HTTP 200
# [Asserts]
# status == 200

# # Initial Sign up intergration test
# POST http://localhost:4242/auth/sign-up
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
# POST http://localhost:4242/auth/sign-up
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
