include .env

.PHONY: query
query: # Query the database
	node ${DATABASE_UTILS_DIR}/queries.js

.PHONY: seed
seed: # Seed the database
	sh ${SCRIPTS_DIR}/seed.sh

.PHONY: delete-db
delete-db: # Delete the database
	rm -rf ./prisma/database.db
	rm -rf ./prisma/migrations
	rm -rf ./prisma/database.db-journal

.PHONY: generate-db 
prune-db: 
	npx prisma generate
	npx prisma migrate dev --name init

.PHONY: prune-db 
prune-db: 
	rm -rf ./prisma/database.db
	rm -rf ./prisma/migrations
	rm -rf ./prisma/database.db-journal
	npx prisma generate
	npx prisma migrate dev --name init

.PHONY: fresh-db
fresh-db: prune-db seed query
