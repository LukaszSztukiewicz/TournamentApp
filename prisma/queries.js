import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function getUserById(id) {
  return await prisma.user.findUnique({
    where: { id: id },
  })
}

// async function getUserByEmail(email) {
//   return await prisma.user.findUnique({
//     where: { email: email },
//   })
// }

async function getTorunamentsAndHostsPaginated(page, perPage) {
  const tournaments = await prisma.tournament.findMany({
    skip: page * perPage,
    take: perPage,
    include: { host: {
      select: {
        id: true,
        avatar: true,
        firstName: true,
        lastName: true,
      }
    } },
  })
  return tournaments
}

async function getTournamentById(id) {
  return await prisma.tournament.findUnique({
    where: { id: id },
    include: { 
      host: true, 
      sponsors: { 
          select: {
            sponsorId: true,
          }
        },
      registrations: {
          include: {
            player: true
          }
        } 
      },
  })
}

async function createUser(user) {
  return await prisma.user.create({
    data: user,
  })
}

async function getSponsors(sponsors) {
  return await prisma.sponsor.findMany({
    where: {
      id: {
        in: sponsors.map((sponsor) => sponsor.sponsorId),
      },
    },
  })
}

async function getRegistrations(registrations) {
  return await prisma.registration.findMany({
    where: {
      id: {
        in: registrations.map((registration) => registration.id),
      },
    },
    include: {
      player: true
    }
  })
}

async function checkUserHostTournament(userId, tournamentId) {
  const user = await getUserById(userId)
  if (user.hosted_tournaments.find((tournament) => tournament.id === tournamentId)) {
    return true
  }
  return false
}

async function checkIfUserRegisteredTournament(userId, tournamentId) {
  const user = await getUserById(userId)
  if (user.registered_tournaments.find((tournament) => tournament.id === tournamentId)) {
    return true
  }
  return false
}

async function getUserRegisteredTournaments(userId) {
  const user = await getUserById(userId)
  return user.registered_tournaments
}

async function hasTournamentFreeSlots(tournamentId) {
  return false
}

async function getUserHostMoreThanNTournament(n=0) {

  const users = await prisma.user.findMany({
    include: { hostedTournaments: true},
  })
  return users.filter((user) => user.hostedTournaments.length > n)

}


async function getSponsorsOfTournament(tournamentId) {
  const tournament = await prisma.tournament.findUnique({
    where: { id: tournamentId },
    include: { 
      sponsors: { 
        include: { 
          sponsor: true 
        } 
      },
      registrations: {
        include: {
          player: true
        }
      } 
    },
  })
  return tournament.sponsors
}

async function getTournamentMoreThanNSponsors(n=0) {
  const tournaments = await prisma.tournament.findMany({
    include: { sponsors: true },
  })
  return tournaments.filter((tournament) => tournament.sponsors.length > n)
}

async function getUserByEmail(email) {
  return await prisma.user.findUnique({
    where: { email: email },
  })
}

async function main() {
  const allUsers = await prisma.user.findMany({
    include: { hostedTournaments: true},
  })
  //log first 10 users
  // console.log(allUsers.slice(0, 10))
  // const hosts = await getUserHostMoreThanNTournament(4)
  // console.log(hosts)
  // const sponsors = await getTournamentMoreThanNSponsors(5)
  // console.log(sponsors)
  const tournaments = await getTorunamentsAndHostsPaginated(1, 2);
  console.log(tournaments)
}

// main()
//   .then(async () => {
//     await prisma.$disconnect()
//   })
//   .catch(async (e) => {
//     console.error(e)
//     await prisma.$disconnect()
//     process.exit(1)
//   })

export {
  getUserById,
  getTorunamentsAndHostsPaginated,
  checkUserHostTournament,
  checkIfUserRegisteredTournament,
  getUserRegisteredTournaments,
  hasTournamentFreeSlots,
  getUserHostMoreThanNTournament,
  getSponsorsOfTournament,
  getTournamentMoreThanNSponsors,
  getTournamentById,
  getSponsors,
  getRegistrations,
  getUserByEmail,
  createUser,
}
