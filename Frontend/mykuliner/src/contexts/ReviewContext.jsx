import React, { createContext, useState, useEffect, useCallback } from 'react';
import { reviewApi } from '../api';
import { useAuth } from '../hooks/useAuth.js';

export const ReviewContext = createContext(null);

export const ReviewProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchReviewsForUser = useCallback(async () => {
    if (isAuthenticated && user) {
      setLoading(true);
      setError(null);
      try {
        const allReviews = await reviewApi.fetchAllReviews();
        const userReviews = allReviews.filter(review => review.userId === user.id);
        setReviews(userReviews);
      } catch (err) {
        setError(err.message || 'Gagal memuat review pengguna.');
      } finally {
        setLoading(false);
      }
    } else {
      setReviews([]);
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    fetchReviewsForUser();
  }, [fetchReviewsForUser]);

  const addNewReview = async (reviewData) => {
    console.log('ReviewContext: addNewReview called with data:', reviewData);
    if (!user) {
      const errMsg = "Anda harus login untuk menambah review.";
      console.error('ReviewContext Error:', errMsg);
      setError(errMsg);
      throw new Error(errMsg);
    }
    setLoading(true);
    setError(null);
    try {
      console.log('ReviewContext: Calling reviewApi.addReview for userId:', user.id);
      const newReviewFromApi = await reviewApi.addReview(reviewData, user.id);
      console.log('ReviewContext: Review added via API:', newReviewFromApi);
      setReviews(prevReviews => [newReviewFromApi, ...prevReviews]);
      setLoading(false);
      return newReviewFromApi;
    } catch (err) {
      const errMsg = err.message || 'Gagal menambah review dari context.';
      console.error('ReviewContext Error:', errMsg, err);
      setError(errMsg);
      setLoading(false);
      throw err;
    }
  };

  const updateExistingReview = async (reviewId, reviewData) => {
    console.log(`ReviewContext: updateExistingReview called for ID ${reviewId} with data:`, reviewData);
    if (!user) {
        const errMsg = "Anda harus login untuk memperbarui review.";
        console.error('ReviewContext Error:', errMsg);
        setError(errMsg);
        throw new Error(errMsg);
    }
    setLoading(true);
    setError(null);
    try {
      const response = await reviewApi.updateReview(reviewId, reviewData, user.id);
      const updatedReview = response.data;
      console.log('ReviewContext: Review updated via API, response data:', updatedReview);

      setReviews(prevReviews =>
        prevReviews.map(r => (r.id === reviewId ? updatedReview : r))
      );
      setLoading(false);
      return updatedReview;
    } catch (err) {
      const errMsg = err.message || 'Gagal memperbarui review dari context.';
      console.error('ReviewContext Error:', errMsg, err);
      setError(errMsg);
      setLoading(false);
      throw err;
    }
  };

  const deleteExistingReview = async (reviewId) => {
    console.log(`ReviewContext: deleteExistingReview called for ID ${reviewId}`);
    if (!user) {
        const errMsg = "Anda harus login untuk menghapus review.";
        console.error('ReviewContext Error:', errMsg);
        setError(errMsg);
        throw new Error(errMsg);
    }
    setLoading(true);
    setError(null);
    try {
        await reviewApi.deleteReview(reviewId, user.id);
        console.log('ReviewContext: Review deleted via API for ID:', reviewId);

        setReviews(prevReviews => prevReviews.filter(r => r.id !== reviewId));
        setLoading(false);
    } catch (err) {
        const errMsg = err.message || 'Gagal menghapus review dari context.';
        console.error('ReviewContext Error:', errMsg, err);
        setError(errMsg);
        setLoading(false);
        throw err;
    }
  };

  const getReviewById = (reviewId) => {
    return reviews.find(review => review.id === reviewId);
  };

  return (
    <ReviewContext.Provider
      value={{
        reviews,
        loading,
        error,
        fetchReviewsForUser,
        addNewReview,
        updateExistingReview,
        deleteExistingReview,
        getReviewById,
        setReviews
      }}
    >
      {children}
    </ReviewContext.Provider>
  );
};