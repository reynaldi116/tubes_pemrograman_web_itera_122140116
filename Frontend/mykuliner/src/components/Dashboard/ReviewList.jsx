import React, { useState, useEffect, useMemo } from 'react';
import { useReviews } from '../../hooks/useReview';
import ReviewItem from './ReviewItem.jsx';
import Spinner from '../UI/Spinner.jsx';
import SearchBar from './SearchBar.jsx';
import Filter from './Filter.jsx';
import { Link } from 'react-router-dom';
import Button from '../UI/Button.jsx';

const ReviewList = () => {
  const { reviews: originalReviews, loading, error, fetchReviewsForUser } = useReviews();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ rating: '', sort: 'default' });

  useEffect(() => {
    fetchReviewsForUser();
  }, [fetchReviewsForUser]);

  const handleSearch = (term) => {
    setSearchTerm(term.toLowerCase());
  };

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({ ...prev, [filterName]: value }));
  };

  const handleSortChange = (value) => {
    setFilters(prev => ({ ...prev, sort: value }));
  };

  const filteredAndSortedReviews = useMemo(() => {
    let processedReviews = [...originalReviews];

    if (searchTerm) {
      processedReviews = processedReviews.filter(
        (review) =>
          review.kulinerName.toLowerCase().includes(searchTerm) ||
          review.restaurantName.toLowerCase().includes(searchTerm)
      );
    }

    if (filters.rating) {
      const minRating = parseInt(filters.rating, 10);
      processedReviews = processedReviews.filter(review => review.rating >= minRating);
    }

    switch (filters.sort) {
      case 'name_asc':
        processedReviews.sort((a, b) => a.kulinerName.localeCompare(b.kulinerName));
        break;
      case 'name_desc':
        processedReviews.sort((a, b) => b.kulinerName.localeCompare(a.kulinerName));
        break;
      case 'restaurant_asc':
        processedReviews.sort((a, b) => a.restaurantName.localeCompare(b.restaurantName));
        break;
      case 'restaurant_desc':
        processedReviews.sort((a, b) => b.restaurantName.localeCompare(a.restaurantName));
        break;
      case 'default':
      default:
         processedReviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
    }
    return processedReviews;
  }, [originalReviews, searchTerm, filters]);

  if (loading && !originalReviews.length) return <Spinner />;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

  return (
    <div>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
        <h2>Semua Review Anda</h2>
        <Link to="/add-review">
            <Button variant="primary">Tambah Review Baru</Button>
        </Link>
      </div>

      <SearchBar onSearch={handleSearch} />
      <Filter
        onFilterChange={handleFilterChange}
        onSortChange={handleSortChange}
        currentFilters={filters}
      />

      {loading && <p>Memuat pembaruan...</p>}

      {filteredAndSortedReviews.length === 0 && !loading ? (
        <div className="card" style={{textAlign: 'center', padding: '30px'}}>
            <p>Anda belum memiliki review, atau tidak ada review yang cocok dengan pencarian/filter Anda.</p>
            <Link to="/add-review">
                <Button variant="primary">Buat Review Pertama Anda</Button>
            </Link>
        </div>
      ) : (
        <div className="review-list-container">
          {filteredAndSortedReviews.map((review) => (
            <ReviewItem key={review.id} review={review} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewList;