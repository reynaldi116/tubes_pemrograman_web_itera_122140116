import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import ReviewForm from '../components/Review/ReviewForm.jsx';
import { useReviews } from '../hooks/useReview.js';
import Spinner from '../components/UI/Spinner.jsx';

const EditReviewPage = () => {
  const { reviewId } = useParams();
  const { getReviewById, loading, reviews } = useReviews();
  const [reviewToEdit, setReviewToEdit] = React.useState(null);
  const [isLoadingReview, setIsLoadingReview] = React.useState(true);

  React.useEffect(() => {
    if (reviews.length > 0) {
        const review = getReviewById(reviewId);
        setReviewToEdit(review);
        setIsLoadingReview(false);
    } else if (!loading) {
        setIsLoadingReview(false);
    }
  }, [reviewId, getReviewById, reviews, loading]);


  if (loading || isLoadingReview) {
    return <Spinner />;
  }

  if (!reviewToEdit) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div>
      <ReviewForm reviewToEdit={reviewToEdit} />
    </div>
  );
};

export default EditReviewPage;