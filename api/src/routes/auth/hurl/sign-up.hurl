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


# Sign-up name extra spaces

POST http://localhost:3000/api/auth/sign-up

Content-Type: application/json

{
	"name":" Mr Edgar Extra Spaces ",
	"email":"email@extra-spaces.com",
	"password":"ExtraSpaces911!@#$"
}


# Invalid email format

POST http://localhost:3000/api/auth/sign-up

Content-Type: application/json

{
	"name":"Invalid Eamil Format",
	"email":"invalid-format.com",
	"password":"invalidEmailF911!@#$"
}

HTTP 422


# Sign-up empty name

POST http://localhost:3000/api/auth/sign-up

Content-Type: application/json

{
	"name":"",
	"email":"empty-name@example.com",
	"password":"abcd"
}

HTTP 422


# Sign-up single digit name

POST http://localhost:3000/api/auth/sign-up

Content-Type: application/json

{
	"name":"x",
	"email":"single-digit-name@example.com",
	"password":"abcd"
}

HTTP 200


# Sign-up empty password

POST http://localhost:3000/api/auth/sign-up

Content-Type: application/json

{
	"name":"y",
	"email":"single-digit-password@example.com",
	"password":""
}

HTTP 422


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
