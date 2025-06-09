# Sign-up success OKAY

POST http://localhost:3000/api/auth/sign-up

Content-Type: application/json

{
	"name":"Mr Robot",
	"email":"sign-up@example.com",
	"password":"FruityThisIs911!@#"
}

HTTP 200


# Sign-up duplicate email OKAY

POST http://localhost:3000/api/auth/sign-up

Content-Type: application/json

{
	"name":"Mr Duplicate Email",
	"email":"sign-up@example.com",
	"password":"FruityThisIs911!@#"
}

HTTP 200


# Sign-up duplicate email with different casing OKAY

POST http://localhost:3000/api/auth/sign-up

Content-Type: application/json

{
	"name":"Mr Duplicate Email",
	"email":"SIGN-up@example.com",
	"password":"FruityThisIs911!@#"
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

#HTTP 400


# Sign-up missing name field

POST http://localhost:3000/api/auth/sign-up

Content-Type: appplication/json

{
	"name":"",
	"email":"name@missing.com",
	"password":"missingNameField!@#$4"
}

HTTP 422


# Sign-up missing email field

POST http://localhost:3000/api/auth/sign-up

Content-Type: application/json

{
	"name":"Mr Missing Email",
	"email":"",
	"password":"missingemailField134!@#$"
}

HTTP 422


# Sign-up missing password field

POST http://localhost:3000/api/auth/sign-up

Content-Type: application/json

{
	"name":"Missing Passowrd",
	"email":"email@missingpassword.com",
	"password":""
}

HTTP 422


# Sign-up name extra spaces
# https://github.com/torontojs/communityhub/issues/118
POST http://localhost:3000/api/auth/sign-up

Content-Type: application/json

{
	"name":" Mr Edgar  Extra Spaces ",
	"email":"name@extra-spaces.com",
	"password":"ExtraSpaces911!@#$"
}

HTTP 200


# Sign-up email extra spaces
# https://github.com/torontojs/communityhub/issues/118
POST http://localhost:3000/api/auth/sign-up

Content-Type: application/json

{
	"name":"Mr Edgar Extra Spaces",
	"email":" email@extra-spaces.com ",
	"password":"ExtraSpaces911!@#$"
}

HTTP 422


# Sign-up password extra spaces
# https://github.com/torontojs/communityhub/issues/118
POST http://localhost:3000/api/auth/sign-up

Content-Type: application/json

{
	"name":"Mr Edgar Extra Spaces",
	"email":"email@extra-spaces.com",
	"password":" ExtraS paces911!@#$ "
}

HTTP 200


# Invalid email format

POST http://localhost:3000/api/auth/sign-up

Content-Type: application/json

{
	"name":"Invalid Eamil Format",
	"email":"invalid-format.com",
	"password":"invalidEmailF911!@#$"
}

HTTP 422


# Sign-up single digit name

POST http://localhost:3000/api/auth/sign-up

Content-Type: application/json

{
	"name":"x",
	"email":"single-digit-name@example.com",
	"password":"SingleDigitName84!#$"
}

HTTP 200


# Sign-up empty body

POST http://localhost:3000/api/auth/sign-up

HTTP 422


# Sign-up missing content-Type

POST http://localhost:3000/api/auth/sign-up

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

#HTTP 200
