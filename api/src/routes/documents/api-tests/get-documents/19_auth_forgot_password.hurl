# Forgot password with valid email
POST http://localhost:3000/api/auth/forgot-password
Content-Type: application/json

{
  "email": "king.arthur@camelot.uk",
  "password":"H0lyGr@il42!"
}

HTTP 200
[Asserts]
status == 200

# Forgot password with non-existent email (should still return 200 for security)
POST http://localhost:3000/api/auth/forgot-password
Content-Type: application/json

{
  "email": "nonexistent@example.com"
}

HTTP 200
[Asserts]
status == 200

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
