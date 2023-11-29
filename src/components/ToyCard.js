import React from "react";

function ToyCard({toy, handleDonation, handleLike}) {
  return (
    <div className="card">
      <h2>{toy.name}</h2>
      <img
        src={toy.image}
        alt={toy.name}
        className="toy-avatar"
      />
      <p>{toy.likes} Likes </p>
      <button className="like-btn" onClick={(e) => handleLike(e, toy)}>Like {"<3"}</button>
      <button className="del-btn" onClick={(e) => handleDonation(e, toy)}>Donate to GoodWill</button>
    </div>
  );
}

export default ToyCard;
