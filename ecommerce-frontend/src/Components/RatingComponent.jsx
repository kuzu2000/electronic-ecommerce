import React, { useState, useEffect } from 'react';
import Star from './Star';
import Rating from './Rating';
import { addReviewRating } from '../redux/api';
import { useDispatch, useSelector } from 'react-redux';
import Moment from 'moment';
export default function RatingComponent({
  rating,
  numReviews,
  productId,
  reviews,
  error,
}) {
  const [gradeIndex, setGradeIndex] = useState();
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState(reviews);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const GRADES = ['Poor', 'Fair', 'Good', 'Very good', 'Excellent'];
  const activeStar = {
    fill: 'yellow',
  };

  const changeGradeIndex = (index) => {
    setGradeIndex(index);
  };

  const ratingSubmit = (e) => {
    e.preventDefault();
    const value = {
      comment,
      rating: Number(gradeIndex) + 1,
    };
    addReviewRating(dispatch, productId, value);
  };

  useEffect(() => {
    setComments(reviews);
  }, [reviews]);

  const alreadySubmitted = () => {
    const commentExists = comments?.find(
      (c) => c.name._id === user.currentUser?.result?._id
    );
    if (commentExists) {
      return true;
    }
    return false;
  };

  return (
    <div className="rating-container">
      <form onSubmit={ratingSubmit}>
        {error && (
          <p className="rating-error">You already submitted a review</p>
        )}
        {GRADES[gradeIndex] ? (
          <h2 className="result">{GRADES[gradeIndex]}</h2>
        ) : (
          <h2 className="result">
            {alreadySubmitted() ? null : "You haven't reviewed yet"}
          </h2>
        )}
        <div className="stars">
          {GRADES.map((grade, index) => (
            <Star
              index={index}
              key={grade}
              changeGradeIndex={changeGradeIndex}
              style={gradeIndex >= index ? activeStar : {}}
            />
          ))}
        </div>
        <div className="rating-form">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Message"
          >
            Enter here{' '}
          </textarea>
          <button type="submit">Submit</button>
        </div>
      </form>
      <div className="comment-box">
        {comments?.length > 0 ? (
          <>
            <ul className="comments">
              {comments?.map((c, i) => (
                <li key={i}>
                  <div className="comment-info">
                    <div className="comment-user">
                      <span className="comment-username">
                        {c?.name?.username}
                      </span>
                      <Rating rating={c.rating} />
                    </div>
                    <span className="comment-date">
                      {Moment(c.createdAt).format('MMM DD, YYYY')}
                    </span>
                  </div>
                  <p>{c.comment}</p>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <>
            <h3>No reviews</h3>
          </>
        )}
      </div>
    </div>
  );
}
