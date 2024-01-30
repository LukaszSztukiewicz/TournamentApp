'use client'
import Image from 'next/image';

export default function TournamentCard({ tournament, indexNumber }) {
  const handleClick = () => {
    window.location.href = `/tournament/${tournament.id}`;
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', border: '5px solid black', borderRadius:"30px", margin: '10px', padding: '10px', alignItems:"center" }}>
      <h2>Tournament {indexNumber}</h2>
      {/* <h3>Name: {tournament.tournamentName}</h3> */}
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
        <div style={{ color: 'green', paddingRight: "20px" }}><strong>Host</strong></div>
        <Image src={tournament.host.avatar} alt="avatar" width={50} height={50} style={{ borderRadius: '20%' }} />
        
        <div style={{paddingLeft: "20px"}}>{tournament.host.firstName}</div>
        <div style={{paddingLeft: "20px"}}>{tournament.host.lastName}</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: "20px"}}>
        <div style={{color:"yellow", paddingLeft: "20px"}}><stronq>Discipline</stronq></div>
        <div style={{paddingLeft: "20px"}}>{tournament.discipline}</div>
      </div>
      <p>Max Players: {tournament.maxPlayers.toString()}</p>
      {/* <p>Location: {tournament.location}</p> */}
      {/* <p>{tournament.applicationDeadline.toString()}</p> */}
      <button onClick={handleClick}>View</button>
    </div>
  );
}
