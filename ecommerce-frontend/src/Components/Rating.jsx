import React from 'react';

export default function Rating(props) {
  const { rating, numReviews } = props;
  return (
    <div className="rating" title={rating}>
      <span>
        <i
          className={
            rating >= 1
              ? 'fas fa-star fill'
              : rating >= 0.5
              ? 'fas fa-star-half-alt fill'
              : 'fas fa-star'
          }
        ></i>
      </span>
      <span>
        <i
          className={
            rating >= 2
              ? 'fas fa-star fill'
              : rating >= 1.5
              ? 'fas fa-star-half-alt fill'
              : 'fas fa-star'
          }
        ></i>
      </span>
      <span>
        <i
          className={
            rating >= 3
              ? 'fas fa-star fill'
              : rating >= 2.5
              ? 'fas fa-star-half-alt fill'
              : 'fas fa-star'
          }
        ></i>
      </span>
      <span>
        <i
          className={
            rating >= 4
              ? 'fas fa-star fill'
              : rating >= 3.5
              ? 'fas fa-star-half-alt fill'
              : 'fas fa-star'
          }
        ></i>
      </span>
      <span>
        <i
          className={
            rating >= 5
              ? 'fas fa-star fill'
              : rating >= 4.5
              ? 'fas fa-star-half-alt fill'
              : 'fas fa-star'
          }
        ></i>
      </span>
      {!isNaN(numReviews) && <span className="numReviews">{!isNaN(numReviews) ? `(${numReviews})` : null}</span>} 
    </div>
  );
}
