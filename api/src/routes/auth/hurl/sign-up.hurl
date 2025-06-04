# Sign-up success

POST http://localhost:3000/api/auth/sign-up

Content-Type: application/json

{
	"name":"Mr Robot",
	"email":"sign-up@example.com",
	"password":"FruityThisIs911!@#"
}

HTTP 200


# Sign-up duplicate email

POST http://localhost:3000/api/auth/sign-up

Content-Type: application/json

{
	"name":"Mr Duplicate Email",
	"email":"SIGN-UP@example.com",
	"password":"FruityThisIs911!@#"
}

HTTP 200


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


# Sign-up missing passworld field

POST http://localhost:3000/api/auth/sign-up

Content-Type: application/json

{
	"name":"Missing Passowrd",
	"email":"email@missingpassword.com",
	"password":""
}

HTTP 422


# Sign-up name extra spaces

POST http://localhost:3000/api/auth/sign-up

Content-Type: application/json

{
	"name":" Mr Edgar  Extra Spaces ",
	"email":"name@extra-spaces.com",
	"password":"ExtraSpaces911!@#$"
}

HTTP 200


# Sign-up email extra spaces

POST http://localhost:3000/api/auth/sign-up

Content-Type: application/json

{
	"name":"Mr Edgar Extra Spaces",
	"email":" email@extra-spaces.com ",
	"password":"ExtraSpaces911!@#$"
}

HTTP 422

# Sign-up password extra spaces(FIX ME)

POST http://localhost:3000/api/auth/sign-up

Content-Type: application/json

{
	"name":" Mr Edgar Extra Spaces ",
	"email":"email@extra-spaces.com",
	"password":" ExtraSpaces911!@#$ "
}

HTTP 200


# Invalid email format

# POST http://localhost:3000/api/auth/sign-up

# Content-Type: application/json

# {
# 	"name":"Invalid Eamil Format",
# 	"email":"invalid-format.com",
# 	"password":"invalidEmailF911!@#$"
# }

# HTTP 422


# Sign-up single digit name

POST http://localhost:3000/api/auth/sign-up

Content-Type: application/json

{
	"name":"x",
	"email":"single-digit-name@example.com",
	"password":"abcd"
}

HTTP 200


# Sign-up empty body

POST http://localhost:3000/api/auth/sign-up

HTTP 422


# Sign-up missing content-Type

POST http://localhost:3000/api/auth/sign-up

{
	"name":"Missinger Header",
	"email":"missing@header.com",
	"password":"ThisMissingHeader911!@#$"
}

HTTP 200


# Sign-up name should not be longer than 100 characters(FIX ME 200)

POST http://localhost:3000/api/auth/sign-up

{
	"name":"Maximiliano-Alexanderthegreat VonSchwarzensteinberg-MacDonaldson O'Flannagan-Smith-Johansson-Ricci",
	"email":"longname@header.com",
	"password":"ShouldNotBeLongerThan100124!@#$"
}

HTTP 200
