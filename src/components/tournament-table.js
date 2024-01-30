import Link from "next/link";
import { TournamentCard } from "@components/tournament-card";

export default async function TournamentTable(
  {
    query,
    page,
  }
) {
  const { tournaments, count } = await getTournamentsAndHostsPaginated({
    page,
    query,
  });

  return (
    <>
      <h1>Tournaments</h1>
      <div className="flex flex-wrap">
        {tournaments.map((tournament) => (
          <TournamentCard
            key={tournament.id}
            tournament={tournament}
          />
        ))}
      </div>
      <div className="flex justify-between">
        <Link href={`/tournament?page=${page - 1}`}>
          <a className="btn" disabled={page === 1}>
            Previous
          </a>
        </Link>
        <Link href={`/tournament?page=${page + 1}`}>
          <a className="btn" disabled={page === Math.ceil(count / 10)}>
            Next
          </a>
        </Link>
      </div>
    </>
  );
}
