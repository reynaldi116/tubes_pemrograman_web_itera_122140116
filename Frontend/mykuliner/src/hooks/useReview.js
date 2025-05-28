import { useContext } from 'react';
import { ReviewContext } from '../contexts/ReviewContext.jsx';

export const useReviews = () => {
  const context = useContext(ReviewContext);
  if (context === undefined) {
    throw new Error('useReviews must be used within a ReviewProvider');
  }
  return context;
};