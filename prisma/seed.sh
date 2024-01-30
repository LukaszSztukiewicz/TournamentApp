#!/bin/bash


# Change the auto-generated seeder
sed -i '1s/.*/import {  } from '\''\/home\/lukasz\/STUDIES\/TournamentApp\/node_modules\/@prisma\/client\/index.js'\'';/' ./prisma/_auto_data-generators.js

node ./prisma/seed.js
