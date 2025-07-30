# Forgot password auth route

# Forgot password with valid email
POST {{host}}/auth/forgot-password

{
  "email": "king.arthur@camelot.uk",
}

HTTP 200

# Forgot password with non-existent email (should still return 200 for security)
POST {{host}}/api/auth/forgot-password

{
  "email": "nonexistent@example.com"
}

HTTP 200

# Forgot password with invalid email format
POST {{host}}/api/auth/forgot-password

{
  "email": "invalid-email"
}

HTTP 422

# Forgot password empty object
POST {{host}}/api/auth/forgot-password

{}

HTTP 422


# Forgot password with empty email
POST {{host}}/api/auth/forgot-password

{
  "email": ""
}

HTTP 422
