import React from "react";
import ToyCard from "./ToyCard";

function ToyContainer({toys, handleDonation, handleLike}) {

  return (
    <div id="toy-collection">
      {toys.map(toy => <ToyCard key={toy.id} toy={toy} handleDonation={handleDonation} handleLike={handleLike} />)}
    </div>
  );
}

export default ToyContainer;
