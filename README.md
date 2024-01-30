Project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

To setup the project run:

  npm install
  make fresh-db

Run the Prisma Studio

  npx prisma studio

To start the development server run:

  npm run dev

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Opt-out from telemetry collection by running the following command:
export CHECKPOINT_DISABLE=1

Other usefull funstions

Node versions

  npm update -g npm
  nvm install 20.11.0

Migrations in Prisma

  npx prisma generate 
  npx prisma migrate dev --name YOUR_MIGRATION_NAME

All needed scripts are implemented in Makefile for easy use.
