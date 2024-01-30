import Link from "next/link";
import TournamentCard from "@components/tournament-card";
import { getTorunamentsAndHostsPaginated } from "@prismaDir/queries";

export default async function TournamentPage(
  { searchParams }
) {
  const query = searchParams.query || "";
  const page = Number(searchParams.page) || 0;
  const previous_page = Math.max(0, page - 1);
  const next_page = page + 1;
  const perPage = 10;

  const tournaments = await getTorunamentsAndHostsPaginated(page, perPage);
  
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",

        }}
      >
        <h1>Tournaments</h1>
        <h2>Displaying latest 10 tournaments</h2>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              flexWrap: "wrap",
            }}
          >
            {tournaments.map((tournament, index) => (
              <TournamentCard
                key={tournament.id}
                tournament={tournament}
                indexNumber={index+page*perPage}
              />
            ))}
          </div>
          <div className="pagination">
            <Link href={`/tournament?page=${previous_page}`}>
              <button>Previous</button>
            </Link>
            <Link href={`/tournament?page=${next_page}`}>
              <button>Next</button>
            </Link>
            </div>
        </div>
      </div>
    </>
  );
}
