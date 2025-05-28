// src/components/UI/StarRating.jsx
import React, { useState } from 'react';
import './StarRating.css';

const Star = ({ filled, onClick, onMouseEnter, onMouseLeave, starId }) => (
  <span
    className={`star ${filled ? 'filled' : ''}`}
    onClick={() => onClick(starId)}
    onMouseEnter={() => onMouseEnter(starId)}
    onMouseLeave={onMouseLeave}
  >
    ★
  </span>
);

const StarRating = ({ totalStars = 5, initialRating = 0, onRatingChange, readOnly = false }) => {
  const [rating, setRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState(0);

  React.useEffect(() => {
    setRating(initialRating);
  }, [initialRating]);

  const handleClick = (newRating) => {
    if (readOnly) return;
    setRating(newRating);
    if (onRatingChange) {
      onRatingChange(newRating);
    }
  };

  const handleMouseEnter = (hoveredRating) => {
    if (readOnly) return;
    setHoverRating(hoveredRating);
  };

  const handleMouseLeave = () => {
    if (readOnly) return;
    setHoverRating(0);
  };

  return (
    <div className={`star-rating ${readOnly ? 'read-only' : ''}`}>
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1;
        return (
          <Star
            key={starValue}
            starId={starValue}
            filled={hoverRating ? starValue <= hoverRating : starValue <= rating}
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
        );
      })}
      {!readOnly && rating > 0 && (
         <button type="button" onClick={() => handleClick(0)} className="clear-rating">Reset</button>
      )}
    </div>
  );
};

export default StarRating;