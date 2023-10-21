import React,{useState} from "react"
import Board from "@/components/board"
import Card from "@/components/cards"
import Modal from "react-modal";
import ModalPlayers from "@/components/modalPlayers";
import { useEffect } from "react";
import SocialMediaBox from "@/components/redes";

export default function Memorama() {
  const [updatedPlayers, setUpdatedPlayers] = useState([]);
  const [mode, setMode] = useState('normal'); // Modo por defecto: normal
  const generateCards = (mode) => {
    let pairs = 0;

    switch (mode) {
      case 'facil':
        pairs = 5;
        break;
      case 'normal':
        pairs = 10;
        break;
      case 'extremo':
      default:
        pairs = 15;
    }

    const cardValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O'];
    let generatedCards = [];

    for (let i = 1; i <= pairs; i++) {
      const randomValue = cardValues[i - 1];
      generatedCards.push(
        { id: i, value: randomValue, isFlipped: false, image: `/img/img${i}.jpg` },
        { id: i + pairs, value: randomValue, isFlipped: false, image: `/img/img${i}.jpg` }
      );
    }

    return generatedCards;
  };
  useEffect(() => {
    const initialCards = generateCards(mode);
    setCards(initialCards);
    mezclarCartas();
  }, [mode]);
  const [showModal, setShowModal] = useState(false);
  const [cards, setCards] = useState(generateCards(mode));

  const [selectedCards, setSelectedCards] = useState([]);

  const [players, setPlayers] = useState([
    // { id: 1, name: 'Player 1', score: 0, isTurn: true },
    // { id: 2, name: 'Player 2', score: 0, isTurn: false },
    // { id: 3, name: 'Player 3', score: 0, isTurn: false },
    // { id: 4, name: 'Player 4', score: 0, isTurn: false },
  ]);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [numPlayers, setNumPlayers] = useState(1);
  const [winner, setWinner] = useState(null);

  const switchTurns = () => {
    setPlayers(prevPlayers =>
      prevPlayers.map((player, index) => ({
        ...player,
        isTurn: index === currentPlayer ? false : index === nextPlayerIndex ? true : player.isTurn,
      }))
    );

   
    const nextPlayerIndex = (currentPlayer + 1) % players.length;

  
    setCurrentPlayer(nextPlayerIndex);
  };

  const handleSelectPlayers = (selectedPlayers) => {
    setNumPlayers(selectedPlayers);
    const newPlayers = Array.from({ length: selectedPlayers }, (_, index) => ({
      id: index + 1,
      name: `Player ${index + 1}`,
      score: 0,
      isTurn: index === 0, 
    }));

    setPlayers(newPlayers);
  };


  const handleCardClick = (clickedCard) => {
    console.log('Clic en la carta', clickedCard);
  
  
    if (selectedCards.some((card) => card.id === clickedCard.id)) {
      return; 
    }
  
    if (clickedCard.isFlipped || clickedCard.isMatched) {
      return; 
    }
    if (selectedCards.length === 2) {
      return; 
    }
    
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === clickedCard.id ? { ...card, isFlipped: true } : card
      )
    );
    setSelectedCards((prevSelectedCards) => [...prevSelectedCards, clickedCard]);

    if (selectedCards.length === 1) {
      const [firstCard] = selectedCards;
      if (firstCard.value === clickedCard.value) {
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.id === firstCard.id || card.id === clickedCard.id
              ? { ...card, isMatched: true }
              : card
          )
        );
    
        // Aumenta el puntaje del jugador actual
        setPlayers((prevPlayers) =>
          prevPlayers.map((player) =>
            player.isTurn ? { ...player, score: player.score + 1 } : player
          )
        );
    
        setTimeout(() => {
          setCards((prevCards) => {
            const allMatched = prevCards.every((card) => card.isMatched);
            if (allMatched) {
              const updatedPlayers = players.map((player) => {
                if (player.isTurn) {
                  return { ...player, score: player.score + 1 };
                }
                return player;
              });
        
              // Establece el nuevo estado de los jugadores
              setPlayers(updatedPlayers);
        
              // Llama a la función findWinner después de actualizar los puntajes
              findWinner(updatedPlayers);
        
              // Muestra el modal
              setShowModal(true);
            }
            return prevCards;
          });
        
          setSelectedCards([]);
        }, 1000);
    
      } else {
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((card) =>
              card.id === firstCard.id || card.id === clickedCard.id
                ? { ...card, isFlipped: false }
                : card
            )
          );
    
          setSelectedCards([]);
          switchTurns();
        }, 1000);
      }
    }
  };

  const findWinner = (updatedPlayers) => {
    const gameWinner = updatedPlayers.reduce((max, player) =>
      player.score > max.score ? player : max,
      updatedPlayers[0]
    );
    const isTie = updatedPlayers.every(player => player.score === gameWinner.score);

    if (isTie) {
    setWinner("Empate");
  } else {
    setWinner(gameWinner);
  }
  };

  const mezclarCartas = () => {
    const cartasMezcladas = [...cards].sort(() => Math.random() - 0.5);
    setCards(cartasMezcladas);
  };

  const closeModal =(event) =>{
    if (event){
      setShowModal(false);
    }
  }

  const reiniciarJuego = () => {
    // Mezclar las cartas
    const cartasMezcladas = [...cards].sort(() => Math.random() - 0.5);
  
    // Restablecer el estado de las cartas
    const cartasReiniciadas = cartasMezcladas.map(card => ({ ...card, isFlipped: false, isMatched: false }));
  
    // Restablecer el estado de los jugadores
    const jugadoresReiniciados = players.map((jugador) => ({
      ...jugador,
      score: 0,
    }));
  
    // Restablecer el estado del ganador
    setCards(cartasReiniciadas);
    setPlayers(jugadoresReiniciados);
    setWinner(null);
  };


  // Función para cambiar el modo de juego
  const handleModeChange = (newMode) => {
    setMode(newMode);
    const newCards = generateCards(newMode);
    setCards(newCards);
  };

  return (
    <main className="space" role="img" aria-label="cartoon to represent space (an animated astronaut floating away)">
      
    <div className="text-center mt-8">
    <h1 className="text-3xl font-bold mb-6">Memory Game</h1>
    <div className="space-x-2">
  <button
    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded text-lg"
    onClick={() => handleModeChange('facil')}
  >
    Easy Mode
  </button>
  <button
    className="bg-green-500 hover:bg-green-700 text-white font-bold py-4 px-8 rounded text-lg"
    onClick={() => handleModeChange('normal')}
  >
    Normal
  </button>
  <button
    className="bg-red-500 hover:bg-red-700 text-white font-bold py-4 px-8 rounded text-lg"
    onClick={() => handleModeChange('extremo')}
  >
    Extreme
  </button>
</div>
    <br></br>
    <br></br>
    <br></br>
  <ModalPlayers onSelectPlayers={handleSelectPlayers}/>
        <div className="player-list">
        {players.map((player) => (
          <div key={player.id} className="player">
            <p className="player-name">{`${player.name}'s Turn`}</p>
            <p className="player-score">Score: {player.score}</p>
          </div>
        ))}
      </div>
      
    <button className="bg-blue-500 hover:bg-blue-700 transform hover:scale-115 text-white mb-10 font-bold py-4 px-8 rounded border border-blue-700 text-lg" onClick={reiniciarJuego}>Restart Game</button>
      <Board cards={cards} mode={mode} onCardClick={handleCardClick}></Board>
    </div>
    <Modal
        isOpen={showModal}
        onRequestClose={closeModal}
        contentLabel="¡Felicidades! Has completado el juego."
        className="modal"
        overlayClassName="overlay"
      >
        <h2 className="h2Ganador">¡Congratulations to: {winner && winner.name} for winning the game!</h2>
        <button className="close-button" onClick={closeModal}>Close</button>
      </Modal>
      <footer>
      <p className="text-center mt-20" style={{ fontFamily: 'Montserrat, sans-serif', color: '#888', fontSize: '14px' }}>Website designed and developed by: Fernando T. Trillo</p>
      <SocialMediaBox></SocialMediaBox>
      </footer>
    </main>
  )
}
