import React from 'react';


const Card = ({ card, onClick }) => {
  
    return (
        <div
      className={`card relative w-24 h-24 rounded-md flex items-center justify-center text-white font-bold cursor-pointer
                  ${card.isFlipped ? '' : ''} ${card.isMatched ? 'matched' : ''} 
                  ${!card.isFlipped ? 'covered' : ''} m-2`}
      onClick={() => onClick(card)}
    >
      <div className={`w-full h-full`}>
        {card.isFlipped ? (
          <img src={card.image} alt={card.value} className="w-full h-full object-cover rounded-md" />
        ) : (
          ' '
        )}
      </div>
    </div>
    );
  };
  export default Card



