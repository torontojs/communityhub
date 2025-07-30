# Reset password auth route

# Reset password with valid token(not found in kv) and password
POST {{host}}/auth/reset-password

{
  "token":{{reset-password-valid-uuid}}
  "password": {{reset-valid-password}}
}

HTTP 422

# Reset password with invalid uuid
POST {{host}}/auth/forgot-password

{
  "token":"00000000-00000000-00000000-00000000",
  "password": {{reset-valid-password}}
}

HTTP 422

# Reset password with empty token
POST {{host}}/api/auth/reset-password

{
  "token": "",
  "password":{{reset-valid-password}}
}

HTTP 422

# Reset password with empty password
POST {{host}}/api/auth/reset-password

{
  "token": {{reset-password-valid-uuid}},
  "password":""
}

HTTP 422

# Reset password empty object
POST {{host}}/api/auth/reset-password

{}

HTTP 422
