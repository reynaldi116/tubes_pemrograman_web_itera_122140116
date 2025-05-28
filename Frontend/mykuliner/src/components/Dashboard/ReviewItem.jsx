import React from 'react';
import { Link } from 'react-router-dom';
import { useReviews } from '../../hooks/useReview'
import StarRating from '../UI/StarRating.jsx';
import Button from '../UI/Button.jsx';
import './ReviewItem.css';

const ReviewItem = ({ review }) => {
  const { deleteExistingReview, loading: reviewLoading } = useReviews();

  const handleDelete = async () => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus review untuk "${review.kulinerName}"?`)) {
      try {
        await deleteExistingReview(review.id);
      } catch (error) {
        alert(`Gagal menghapus review: ${error.message}`);
      }
    }
  };

  return (
    <div className="review-item card">
      <div className="review-item-image-container">
        <img
          src={review.photoUrl || 'https://via.placeholder.com/150x100.png?text=Kuliner'}
          alt={review.kulinerName}
          className="review-item-image"
        />
      </div>
      <div className="review-item-content">
        <h3>{review.kulinerName}</h3>
        <p className="restaurant-name"><strong>Restoran:</strong> {review.restaurantName}</p>
        <p className="address"><strong>Alamat:</strong> {review.address}</p>
        <div className="rating-display">
            <StarRating initialRating={review.rating} readOnly={true} />
        </div>
        <p className="description">{review.description}</p>
        <small>Di-review pada: {new Date(review.createdAt).toLocaleDateString()}</small>
      </div>
      <div className="review-item-actions">
        <Link to={`/edit-review/${review.id}`}>
          <Button variant="secondary" className="edit-button">Edit</Button>
        </Link>
        <Button variant="danger" onClick={handleDelete} disabled={reviewLoading} className="delete-button">
          {reviewLoading ? 'Menghapus...' : 'Hapus'}
        </Button>
      </div>
    </div>
  );
};

export default ReviewItem;