import Link from 'next/link';

import { getTournamentById, getRegistrations, getSponsors } from '@prismaDir/queries';
import TournamentDetails from '@/components/tournament-details';

export default async function TournamentDetailsPage({ params }) {

  const tournament = await getTournamentById(params.id);
  const sponsors = await getSponsors(tournament.sponsors);
  const registrations = await getRegistrations(tournament.registrations);

  return (
    <>
    <TournamentDetails tournament={tournament} sponsors={sponsors} registrations={registrations} />
    <Link href={`/tournament`}> Go Back </Link>
    </>
  );
}
