# Checks for error on the auth cookie

# Invalid auth token
GET {{host}}/api/auth/sign-out
Cookie: auth_token=00000000-0000-0000-0000-000000000000

HTTP 404

# Missing auth token
POST {{host}}/api/auth/sign-out

HTTP 401
