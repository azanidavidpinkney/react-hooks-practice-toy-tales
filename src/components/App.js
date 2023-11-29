import React, { useEffect, useState } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

// App
// |- Header
// |- Toy Form
// |- Toy Container (receives toys data from App via prop)
//    |- Toy Card

const toysAPI = "  http://localhost:3001/toys"

function App() {

  const [toys, setToys] = useState([])

  useEffect(() => {
    fetch(toysAPI)
    .then(response => response.json())
    .then(setToys)
  }, [])

  const [showForm, setShowForm] = useState(false);

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  // functionality to handle STATE UPDATE for NEW TOY
  function addNewToy(newToy) {
    setToys([...toys, newToy])
  }

  // functionality to handle DELETE and STATE UPDATE for DONATED TOY
  function handleDonation(e, donatedToy) {
    e.preventDefault()

    fetch(`${toysAPI}/${donatedToy.id}`, {
      method: 'DELETE',
      headers: {
        Accepts: 'application/json',
        'Content-type': 'application/json'
      },
    }).then(() => deleteToy(donatedToy))
  }
  
  function deleteToy(donatedToy) {
    setToys(toys.filter(toy => toy.id !== donatedToy.id));
  }

  // functionality for PATCH and STATE UPDATE for NEW LIKES
  function handleLike(e, likedToy) {
    e.preventDefault()

    const newLikes = likedToy.likes + 1

    fetch(`${toysAPI}/${likedToy.id}`, {
      method: 'PATCH',
      headers: {
        Accepts: 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({likes: newLikes}) // updates new likes on server-side
    }).then(response => response.json())
      .then((data) => {
        likedToy.likes = newLikes; // reflects new likes on client-side
        updateToys(data) // functionality to update overall STATE, written below
      })
  }

  function updateToys(likedToy) {
    const updatedToys = toys.map(toy => toy.id === likedToy.id? likedToy : toy )
    setToys(updatedToys)
  }

  // JSX Elements Returned
  return (
    <>
      <Header />
      {showForm ? <ToyForm toysAPI={toysAPI} addNewToy={addNewToy}/> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer toys={toys} handleDonation={handleDonation} handleLike={handleLike}/>
    </>
  );
}

export default App;
