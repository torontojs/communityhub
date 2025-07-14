# Sign-up success OKAY
POST {{host}}/api/auth/sign-up

Content-Type: application/json

{
	"name":"Mr Robot",
	"email":"sign-up@example.com",
	"password":"FruityThisIs911!@#"
}

HTTP 200


# Sign-up duplicate email UNPROCESSABLE CONTENT
POST {{host}}/api/auth/sign-up

Content-Type: application/json

{
	"name":"Mr Duplicate Email",
	"email":"sign-up@example.com",
	"password":"FruityThisIs911!@#"
}

HTTP 422


# Sign-up duplicate email with different casing UNPROCESSABLE CONTENT
# FIXME: https://github.com/torontojs/communityhub/issues/97
POST {{host}}/api/auth/sign-up

Content-Type: application/json

{
	"name":"Mr Duplicate Email",
	"email":"SIGN-up@example.com",
	"password":"FruityThisIs911!@#"
}

HTTP 422


# sign-up-subdomain-email
POST {{host}}/api/auth/sign-up
Content-Type: application/json

{
  "name": "Mr Subdomain",
  "email": "user@mail.example.com",
  "password": "ValidSubdomain911!@#"
}

HTTP 200


# Missing content-type
# https://github.com/torontojs/communityhub/issues/171
POST {{host}}/api/auth/sign-up

{
  "name": "No Header",
  "email": "noheader@example.com",
  "password": "NoHeader911!@#"
}

HTTP 422


#Sign up name utilizing emoji characters
POST {{host}}/api/auth/sign-up
Content-Type: application/json

{
  "name": "Mr 😎🔥",
  "email": "emoj@unicode.com",
  "password": "Emoji911🙃♻️!@#"
}

HTTP 200


# Sign-up weak password check

# POST http://localhost:3000/api/auth/sign-up
# https://github.com/torontojs/communityhub/issues/96
#Content-Type: application/json

#{
#	"name":"Mr Weak Password",
#	"email":"weak@weakpassword.com",
#	"password":"quoison"
#}

#HTTP 422


# Sign-up missing name field
POST {{host}}/api/auth/sign-up

Content-Type: appplication/json

{
	"name":"",
	"email":"name@missing.com",
	"password":"missingNameField!@#$4"
}

HTTP 422


# Sign-up missing email field
POST {{host}}/api/auth/sign-up

Content-Type: application/json

{
	"name":"Mr Missing Email",
	"email":"",
	"password":"missingemailField134!@#$"
}

HTTP 422


# Sign-up missing password field
POST {{host}}/api/auth/sign-up

Content-Type: application/json

{
	"name":"Missing Passowrd",
	"email":"email@missingpassword.com",
	"password":""
}

HTTP 422


# Sign-up name extra spaces
POST {{host}}/api/auth/sign-up

Content-Type: application/json

{
	"name":" Mr Edgar  Extra Spaces ",
	"email":"name@extra-spaces.com",
	"password":"ExtraSpaces911!@#$"
}

HTTP 200


# Sign-up email extra spaces
POST {{host}}/api/auth/sign-up

Content-Type: application/json

{
	"name":"Mr Edgar Extra Spaces",
	"email":" email@extra-spaces.com ",
	"password":"ExtraSpaces911!@#$"
}

HTTP 422


# Sign-up password allows password utilizing space characters wihin allowed characters but not outside
POST {{host}}/api/auth/sign-up

Content-Type: application/json

{
	"name":"Mr Edgar Extra Spaces",
	"email":"email@extra-spaces.com",
	"password":"ExtraS paces911!@#$ "
}

HTTP 200


# Sign-up Invalid email format
POST {{host}}/api/auth/sign-up

Content-Type: application/json

{
	"name":"Invalid Eamil Format",
	"email":"invalid-format.com",
	"password":"invalidEmailF911!@#$"
}

HTTP 422


# Sign-up single digit name
POST {{host}}/api/auth/sign-up

Content-Type: application/json

{
	"name":"x",
	"email":"single-digit-name@example.com",
	"password":"SingleDigitName84!#$"
}

HTTP 200


# Sign-up empty body
POST {{host}}/api/auth/sign-up

HTTP 422


# Sign-up missing content-Type
POST {{host}}/api/auth/sign-up

Content-Type: application/image

{
	"name":"Missinger Header",
	"email":"missing@header.com",
	"password":"ThisMissingHeader911!@#$"
}

HTTP 422

# Maximum name email password 512 characters
# For create profile field 10240(10kb) characters(text area, profile description, longer text areas and )
# Sign-up name should not be longer than 100 characters
# https://github.com/torontojs/communityhub/issues/122

# POST http://localhost:3000/api/auth/sign-up

# Content-Type: application/json

# {
#	"name":"BortMaximiliano-Alexanderthegreat VonSchwarzensteinberg-MacDonaldson O'Flannagan-Smith-Johansson-Ricci",
#	"email":"longname@header.com",
#	"password":"ShouldNotBeLongerThan100124!@#$"
#}

#HTTP 422
