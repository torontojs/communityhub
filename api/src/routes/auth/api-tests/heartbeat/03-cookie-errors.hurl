# Checks for error on the auth cookie

# Invalid auth token
GET {{host}}/api/auth/hearbeat
Cookie: auth_token=00000000-0000-0000-0000-000000000000
HTTP 404

# Missing auth token
POST {{host}}/api/auth/hearbeat
HTTP 404
