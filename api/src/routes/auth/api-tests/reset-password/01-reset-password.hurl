# Reset password auth route

# Reset password with valid token(not found in kv) and password
POST {{host}}/api/auth/reset-password

{
  "token":"{{reset_password_valid_uuid}}",
  "password": "{{reset_password_valid_password}}"
}

HTTP 422

# Reset password with invalid uuid
POST {{host}}/api/auth/reset-password

{
  "token":"00000000-00000000-00000000-00000000",
  "password": "{{reset_password_valid_password}}"
}

HTTP 422

# Reset password with empty token
POST {{host}}/api/auth/reset-password

{
  "token": "",
  "password":"{{reset_password_valid_password}}"
}

HTTP 422

# Reset password with empty password
POST {{host}}/api/auth/reset_password

{
  "token": "{{reset_password_valid_uuid}}",
  "password":""
}

HTTP 422

# Reset password empty object
POST {{host}}/api/auth/reset-password

{}

HTTP 404
