# Runtime SVG sprite should be served as a static SVG asset from the expected path.

GET {{host}}/scripts/icon-definitions.svg
HTTP 200
[Asserts]
header "Content-Type" contains "image/svg+xml"
body contains "<svg"
body contains "<symbol"
