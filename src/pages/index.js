import React,{useState} from "react"
import Board from "@/components/board"
import Card from "@/components/cards"
import Modal from "react-modal";
import ModalPlayers from "@/components/modalPlayers";
import { useEffect } from "react";
import SocialMediaBox from "@/components/redes";

export default function Memorama() {
  const [showModal, setShowModal] = useState(false);
  const [cards, setCards] = useState([
    { id: 1, value: 'A', isFlipped: false, image:'/img/img1.jpg'  },
    { id: 2, value: 'B', isFlipped: false, image: '/img/img2.jpg' },
    { id: 3, value: 'A', isFlipped: false, image:'/img/img1.jpg'  },
    { id: 4, value: 'B', isFlipped: false, image: '/img/img2.jpg' },
    { id: 5, value: 'C', isFlipped: false, image: '/img/img3.jpg' },
    { id: 6, value: 'C', isFlipped: false, image: '/img/img3.jpg' },
    { id: 7, value: 'D', isFlipped: false, image: '/img/img4.jpg' },
    { id: 8, value: 'D', isFlipped: false, image: '/img/img4.jpg' },
    { id: 9, value: 'E', isFlipped: false, image: '/img/img5.jpg' },
    { id: 10, value: 'E', isFlipped: false, image: '/img/img5.jpg' },
    { id: 11, value: 'F', isFlipped: false, image: '/img/img6.jpg' },
    { id: 12, value: 'F', isFlipped: false, image: '/img/img6.jpg' },
    { id: 13, value: 'G', isFlipped: false, image: '/img/img7.jpg' },
    { id: 14, value: 'G', isFlipped: false, image: '/img/img7.jpg' },
    { id: 15, value: 'H', isFlipped: false, image: '/img/img8.jpg' },
    { id: 16, value: 'H', isFlipped: false, image: '/img/img8.jpg' },
    { id: 17, value: 'I', isFlipped: false, image: '/img/img9.jpg' },
    { id: 18, value: 'I', isFlipped: false, image: '/img/img9.jpg' },
    { id: 19, value: 'J', isFlipped: false, image: '/img/img10.jpg' },
    { id: 20, value: 'J', isFlipped: false, image: '/img/img10.jpg' },
    { id: 21, value: 'K', isFlipped: false, image: '/img/img11.jpg' },
    { id: 22, value: 'K', isFlipped: false, image: '/img/img11.jpg' },
    { id: 23, value: 'L', isFlipped: false, image: '/img/img12.jpg' },
    { id: 24, value: 'L', isFlipped: false, image: '/img/img12.jpg' },
    { id: 25, value: 'M', isFlipped: false, image: '/img/img13.jpg' },
    { id: 26, value: 'M', isFlipped: false, image: '/img/img13.jpg' },
    { id: 27, value: 'N', isFlipped: false, image: '/img/img14.jpg' },
    { id: 28, value: 'N', isFlipped: false, image: '/img/img14.jpg' },
    { id: 29, value: 'O', isFlipped: false, image: '/img/img15.jpg' },
    { id: 30, value: 'O', isFlipped: false, image: '/img/img15.jpg' },
  ]);
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

 
  useEffect(() => {
    
    mezclarCartas();
  }, []);

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
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((card) =>
              card.id === firstCard.id || card.id === clickedCard.id
                ? { ...card, isMatched: true }
                : card
            )
          );
          setPlayers((prevPlayers) =>
          prevPlayers.map((player) =>
            player.isTurn ? { ...player, score: player.score + 1 } : player
          )
        );
          setCards((prevCards) => {
            const allMatched = prevCards.every((card) => card.isMatched);
            if (allMatched) {
              findWinner();
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
    const cartasMezcladas = [...cards].sort(() => Math.random() - 0.5);

   
    const cartasOcultas = cartasMezcladas.map(card => ({ ...card, isFlipped: false }));
    
    setCards(cartasOcultas);
    const jugadoresReiniciados = players.map((jugador) => ({
      ...jugador,
      score: 0,
    }));
    setPlayers(jugadoresReiniciados);
    setWinner(null);

  };
  const findWinner = () => {
    
    const currentPlayer = players.find(player => player.isTurn);
  
   
    if (currentPlayer) {
      const updatedPlayers = players.map(player =>
        player.id === currentPlayer.id
          ? { ...player, score: player.score + 1 }
          : player
      );
  
     
      setPlayers(updatedPlayers);
    }
  
    
    const gameWinner = players.reduce((max, player) =>
      player.score > max.score ? player : max,
      players[0]
    );
  
   
    setWinner(gameWinner);
  };

  return (
    <main className="space" role="img" aria-label="cartoon to represent space (an animated astronaut floating away)">
      
    <div className="text-center mt-8">
    <h1 className="text-3xl font-bold mb-6">Memory Game</h1>
    
    
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
      <Board cards={cards} onCardClick={handleCardClick}></Board>
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
      <p className="text-center mt-8" style={{ fontFamily: 'Montserrat, sans-serif', color: '#888', fontSize: '14px' }}>Website designed and developed by: Fernando T. Trillo</p>
      <SocialMediaBox></SocialMediaBox>
      </footer>
    </main>
  )
}
