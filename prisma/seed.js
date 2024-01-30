import { PrismaClient } from '@prisma/client'
import { fakeUserComplete, fakeTournamentComplete, fakeRegistrationComplete, fakeGameComplete, fakeTournamentSponsorComplete, fakeSponsorComplete } from './_auto_data-generators.js';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient()

const disciplines = [
  'Volleball',
  'Basketball',
  'Football',
  'Tennis',
  'Table tennis',
  'Badminton',
  'Squash',
];

const defaultDummyConfig = {
  users: {
    count: 500,
  },
  tournaments : {
    count: 100,
    registrations: {
      min: 0,
      max: 12,
    },
    sponsors: {
      min: 2,
      max: 5,
    },
  },
  sponsors : {
    count: 20,
  },
}

async function generateDummyData( config ) {
  console.log("--------- Generating dummy data ... -----------");
  const users = Array.from({ length: config.users.count }, fakeUserComplete);
  const tournaments = Array.from({ length: config.tournaments.count }, fakeTournamentComplete);
  const sponsors = Array.from({ length: config.sponsors.count }, fakeSponsorComplete);
  
  // Generate real passwords
  for (const user of users) {
    user.revealedPassword = faker.internet.password();
    user.password = await bcrypt.hash(user.revealedPassword, 8);
    user.avatar = faker.image.avatarGitHub();
  }
  console.log(users[0]); console.log("Generated users");

  // Generate proper tournament data
  for (const tournament of tournaments) {
    tournament.hostId = users[Math.floor(Math.random() * users.length)].id;
    tournament.maxPlayers = faker.number.int({min: 2, max: 16});
    tournament.datetime = faker.date.future();
    tournament.location = faker.location.streetAddress({ useFullAddress: true });
    tournament.discipline = disciplines[Math.floor(Math.random() * disciplines.length)];
    if (Math.random() < 0.5 ) {
      tournament.applicationDeadline =  faker.date.soon({days : 3});
    }
    else {
      tournament.applicationDeadline =  faker.date.recent({days : 3});
    }
  }
  console.log(tournaments[0]); console.log("Generated tournaments");

  // Generate proper sponsor data
  for (const sponsor of sponsors) {
    sponsor.name = faker.company.buzzAdjective() + ' ' + faker.company.buzzNoun();
    sponsor.slogan = faker.company.catchPhrase();
    sponsor.logo = faker.image.avatarLegacy();
    sponsor.website = faker.internet.url();
  }
  console.log(sponsors[0]); console.log("Generated sponsors");

  // Assign sponsors to tournaments
  const tournamentsSponsors = []
  for (const tournament of tournaments) {
    var sponsorsCount = Math.floor(Math.random() * (config.tournaments.sponsors.max - config.tournaments.sponsors.min + 1)) + config.tournaments.sponsors.min;
    
    while (sponsorsCount > 0) {
      const sponsor = sponsors[Math.floor(Math.random() * sponsors.length)];
      if (!tournamentsSponsors.includes({tournamentId: tournament.id, sponsorId: sponsor.id})) {
        var tournamentSponsor = fakeTournamentSponsorComplete();
        tournamentSponsor.tournamentId = tournament.id;
        tournamentSponsor.sponsorId = sponsor.id;
        tournamentsSponsors.push(tournamentSponsor);
        sponsorsCount--;
      }
    } 
  }
  console.log(tournamentsSponsors[0]); console.log("Generated tournamentsSponsors");

  // Generate proper registration data
  const registrations = []
  for (const tournament of tournaments) {
    var registrationsCount = Math.floor(Math.random() * (config.tournaments.registrations.max - config.tournaments.registrations.min + 1)) + config.tournaments.registrations.min;
    if (registrationsCount > tournament.maxPlayers) {
      registrationsCount = tournament.maxPlayers;
    }
    
    while (registrationsCount > 0) {
      const user = users[Math.floor(Math.random() * users.length)];
      // Check if user is already registered
      
      if (registrations.filter((r) => r.playerId == user.id && r.tournamentId == tournament.id).length > 0) {
        continue;
      }

      var registration = fakeRegistrationComplete();
      registration.playerId = user.id;
      registration.tournamentId = tournament.id;
      registrations.push(registration);
      registrationsCount--;
    } 
  }
  console.log(registrations[0]); console.log("Generated registrations");

  console.log("--------- Dummy data generated -----------");


  return {
    users,
    tournaments,
    sponsors,
    registrations,
    tournamentsSponsors,
  }

}

async function initializeData( { dummyData }) {

    // Insert dummy data - workaround for for https://github.com/prisma/prisma/issues/10710
    var inserts = [];
    for (const user of dummyData.users) {
      inserts.push(prisma.user.create({
        data: user,
      }));
    }
    

    for (const tournament of dummyData.tournaments) {
      inserts.push(prisma.tournament.create({
        data: tournament,
      }));
    }

    for (const sponsor of dummyData.sponsors) {
      inserts.push(prisma.sponsor.create({
        data: sponsor,
      }));
    }


    for (const registration of dummyData.registrations) {
      inserts.push(prisma.registration.create({
        data: registration,
      }));
    }

    for (const tournamentSponsor of dummyData.tournamentsSponsors) {
      inserts.push(prisma.tournamentSponsor.create({
        data: tournamentSponsor,
      }));
    }

    await prisma.$transaction(inserts);
}


async function initializeDatabase() {
  const config = defaultDummyConfig;
  const dummyData = await generateDummyData(config);
  await initializeData({ dummyData: dummyData});
}

async function main() {
  await prisma.$connect()
  await initializeDatabase();
  await prisma.$disconnect()
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
