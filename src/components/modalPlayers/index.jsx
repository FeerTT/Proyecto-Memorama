import React, { useState } from 'react';


const ModalPlayers = ({ onClose, onSelectPlayers }) => {
  const [numPlayers, setNumPlayers] = useState(1);

  const handleNumPlayersChange = (event) => {
    const selectedPlayers = parseInt(event.target.value, 10);
    setNumPlayers(selectedPlayers);
    onSelectPlayers(selectedPlayers);
  };

  const handleStartGame = () => {
    onSelectPlayers(numPlayers);
    onClose();
  };
  
  return (
    <main className='mainModal'>
      <h2 className='h2cantidad'>Select the number of players</h2>
      <label className='labelnumber' htmlFor="numPlayers">Number of Players:</label>
      <div id='numPlayersContainer'>
        <select id="numPlayers" value={numPlayers} onChange={handleNumPlayersChange}>
        {[1, 2, 3, 4].map((num) => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </select>
      </div>
      
      {/* <button className='buttonComenzar' onClick={handleStartGame}>Comenzar Juego</button> */}
    </main>
  );
};

export default ModalPlayers;