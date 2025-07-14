# Delete profile with no token
DELETE {{host}}/api/profiles/37a4882c-3b7d-46c0-b019-c37e2445dae8

HTTP 401


# Delete profile with insuficient authorization(volunteer)
POST {{host}}/api/auth/sign-in

Content-Type: application/json

{
  "email": "knight.ni@forestsayni.com",
  "password": "NiNiNiNi42?!"
}

HTTP 201
[Captures]
auth-token-cookie-var: cookie "auth_token"

DELETE {{host}}/api/profiles/37a4882c-3b7d-46c0-b019-c37e2445dae8
Cookie: auth_token={{ auth-token-cookie-var }}

HTTP 403


POST {{host}}/api/auth/sign-out
Cookie: auth_token={{ auth-token-cookie-var }}


# Delete profile with insuficient authorization(organizer)
POST {{host}}/api/auth/sign-in

Content-Type: application/json

{
  "email": "king.arthur@camelot.uk",
  "password": "H0lyGr@il42!"
}

HTTP 201
[Captures]
auth-token-cookie-var: cookie "auth_token"

DELETE {{host}}/api/profiles/37a4882c-3b7d-46c0-b019-c37e2445dae8
Cookie: auth_token={{ auth-token-cookie-var }}

HTTP 403


POST {{host}}/api/auth/sign-out
Cookie: auth_token={{ auth-token-cookie-var }}


# Delete incorect id with root/admin account
POST {{host}}/api/auth/sign-in

Content-Type: application/json

{
  "email": "root@torontojs.com",
  "password": "correct horse battery staple"
}

HTTP 201
[Captures]
auth-token-cookie-var: cookie "auth_token"


DELETE {{host}}/api/profiles/7a4882c-3b7d-46c0-b019-c37e2445dae
Cookie: auth_token={{ auth-token-cookie-var }}

HTTP 422


# Delete succesfully with authorized access(root/admin)
DELETE {{host}}/api/profiles/777b0252-5d54-4fcf-92da-c94715edd5f3
Cookie: auth_auth={{ auth-token-cookie-var }}

HTTP 200


POST {{host}}/api/auth/sign-out
Cookie: auth_token={{ auth-token-cookie-var }}

HTTP 204
