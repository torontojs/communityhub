npm run db:setup
npm run db:seed
npm run dev

hurl ./hurl/auth.hurl || hurl ./hurl/auth.hurl --verbose || hurl ./hurl/auth.hurl

# Wranger useful commands

npx wrangler d1 execute <DATABASE_NAME> --command "SELECT * FROM profile;"
