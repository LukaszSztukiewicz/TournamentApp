"use client";

import Image from "next/image";

export default function TournamentDetails({ tournament, sponsors, registrations}) {
  const handleApply = () => {
    console.log("apply");
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",

          padding: "100px",
        }}
      >
        <h2>Tournament</h2>
        <h3><strong>Name: </strong>{tournament.tournamentName}</h3>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ color: "green", paddingRight: "20px" }}>
            <strong>Host</strong>
          </div>
          <Image
            src={tournament.host.avatar}
            alt="avatar"
            width={50}
            height={50}
            style={{ borderRadius: "20%" }}
          />

          <div style={{ paddingLeft: "20px" }}>{tournament.host.firstName}</div>
          <div style={{ paddingLeft: "20px" }}>{tournament.host.lastName}</div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
          }}
        >
          <div style={{ color: "yellow", paddingLeft: "20px" }}>
            <stronq>Discipline</stronq>
          </div>
          <div style={{ paddingLeft: "20px" }}>{tournament.discipline}</div>
        </div>
        <p style={{color: "red"}}>Players: {registrations.length}/{tournament.maxPlayers.toString()}</p>
        <p>Location: {tournament.location}</p>
        <p>{tournament.applicationDeadline.toString()}</p>
        <div>
          <h3>Registrations </h3>
          {registrations.map((registration) => (
            <div key={registration.id}>
              <div style={{ display: "flex", flexDirection: "row", padding: "20px", alignContent:"space-between"}}>
              <Image
                src={registration.player.avatar}
                alt="avatar"
                width={50}
                height={50}
                style={{ borderRadius: "20%" }}
              />
              
                <div>{registration.player.firstName}</div>
                <div>{registration.player.lastName}</div>
                </div>  
                <div> Ranking {registration.ranking.toString()}</div>
                <div> License {registration.licenseNumber.toString()}</div>
            </div>
          ))}
        </div>
        <div>
          <h3> Sponsors </h3>
          {sponsors.map((sponsor) => (
            <div key={sponsor.id}>
              <Image
                src={sponsor.logo}
                alt="logo"
                width={50}
                height={50}
                style={{ borderRadius: "20%" }}
              />
              <div>{sponsor.name}</div>
              <div>{sponsor.slogan}</div>
              <div>{sponsor.website}</div>
            </div>
          ))}
        </div>
        <button onClick={handleApply}>Apply</button>
      </div>
    </>
  );
}
