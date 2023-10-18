import React from 'react';
import Card from '../cards';

const Board = ({ cards, onCardClick }) => {
  return (
    <div className="board flex flex-wrap justify-center">
    {cards.map((card) => (
      <Card key={card.id} card={card} onClick={onCardClick} />
    ))}
  </div>
);
};

export default Board;