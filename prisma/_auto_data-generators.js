import {  } from '/home/lukasz/STUDIES/TournamentApp/node_modules/@prisma/client/index.js';
import { faker } from '@faker-js/faker';



export function fakeUser() {
  return {
    avatar: faker.image.avatar(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.lorem.words(5),
    revealedPassword: undefined,
    updatedAt: faker.date.anytime(),
  };
}
export function fakeUserComplete() {
  return {
    id: faker.number.int(),
    avatar: faker.image.avatar(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.lorem.words(5),
    revealedPassword: undefined,
    createdAt: new Date(),
    updatedAt: faker.date.anytime(),
  };
}
export function fakeTournament() {
  return {
    tournamentName: faker.lorem.words(5),
    datetime: undefined,
    location: undefined,
    discipline: faker.lorem.words(5),
    maxPlayers: faker.number.int(),
    applicationDeadline: faker.date.anytime(),
    updatedAt: faker.date.anytime(),
  };
}
export function fakeTournamentComplete() {
  return {
    id: faker.number.int(),
    tournamentName: faker.lorem.words(5),
    datetime: undefined,
    location: undefined,
    discipline: faker.lorem.words(5),
    maxPlayers: faker.number.int(),
    applicationDeadline: faker.date.anytime(),
    hostId: faker.number.int(),
    createdAt: new Date(),
    updatedAt: faker.date.anytime(),
  };
}
export function fakeRegistration() {
  return {
    ranking: faker.number.int(),
    licenseNumber: faker.number.int(),
    updatedAt: faker.date.anytime(),
  };
}
export function fakeRegistrationComplete() {
  return {
    id: faker.number.int(),
    playerId: faker.number.int(),
    tournamentId: faker.number.int(),
    ranking: faker.number.int(),
    licenseNumber: faker.number.int(),
    createdAt: new Date(),
    updatedAt: faker.date.anytime(),
  };
}
export function fakeGame() {
  return {
    updatedAt: faker.date.anytime(),
  };
}
export function fakeGameComplete() {
  return {
    id: faker.number.int(),
    tournamentId: faker.number.int(),
    player1Id: faker.number.int(),
    player2Id: faker.number.int(),
    winnerId: faker.number.int(),
    scoreStatus: 'open',
    createdAt: new Date(),
    updatedAt: faker.date.anytime(),
  };
}
export function fakeTournamentSponsor() {
  return {
    updatedAt: faker.date.anytime(),
  };
}
export function fakeTournamentSponsorComplete() {
  return {
    id: faker.number.int(),
    sponsorId: faker.number.int(),
    tournamentId: faker.number.int(),
    createdAt: new Date(),
    updatedAt: faker.date.anytime(),
  };
}
export function fakeSponsor() {
  return {
    name: faker.person.fullName(),
    logo: faker.lorem.words(5),
    slogan: undefined,
    website: undefined,
    updatedAt: faker.date.anytime(),
  };
}
export function fakeSponsorComplete() {
  return {
    id: faker.number.int(),
    name: faker.person.fullName(),
    logo: faker.lorem.words(5),
    slogan: undefined,
    website: undefined,
    createdAt: new Date(),
    updatedAt: faker.date.anytime(),
  };
}
