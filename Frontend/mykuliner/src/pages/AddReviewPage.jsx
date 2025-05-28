import React from 'react';
import ReviewForm from '../components/Review/ReviewForm.jsx';

const AddReviewPage = () => {
  console.log("AddReviewPage: Rendering..."); // Tambahkan log ini
  return (
    <div>
      {/* Jika Anda ingin judul di sini, bisa ditambahkan: <h1>Tambah Review Baru</h1> */}
      <ReviewForm /> {/* reviewToEdit tidak di-pass, jadi ini mode "tambah baru" */}
    </div>
  );
};

export default AddReviewPage;