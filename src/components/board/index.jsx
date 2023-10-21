import React from 'react';
import Card from '../cards';

const Board = ({ cards, onCardClick, mode }) => {
  let numberOfCardsToShow;

  switch (mode) {
    case 'facil':
      numberOfCardsToShow = 10;
      break;
    case 'normal':
      numberOfCardsToShow = 20;
      break;
    case 'extremo':
      numberOfCardsToShow = 30;
      break;
    default:
      numberOfCardsToShow = 30;
  }
  const visibleCards = cards.slice(0, numberOfCardsToShow);
  
  return (
    <div className="board flex flex-wrap justify-center">
      {visibleCards.map((card) => (
        <Card key={card.id} card={card} onClick={onCardClick} />
      ))}
    </div>
  );
};

export default Board;
