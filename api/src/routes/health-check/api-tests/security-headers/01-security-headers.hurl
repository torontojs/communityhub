# API responses should include baseline browser security headers.

GET {{host}}/api
HTTP 200
[Asserts]
header "Content-Security-Policy" contains "default-src 'self'"
header "Content-Security-Policy" contains "frame-ancestors 'none'"
header "X-Content-Type-Options" == "nosniff"
header "X-Frame-Options" == "DENY"
header "Referrer-Policy" == "no-referrer"
header "Permissions-Policy" contains "camera=()"
header "Permissions-Policy" contains "geolocation=()"
header "Permissions-Policy" contains "microphone=()"
