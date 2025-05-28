const MOCK_REVIEWS_DB = 'mykuliner_reviews';
const DUMMY_REVIEWS = [
  {
    id: 'rev001',
    userId: 'user001',
    kulinerName: 'Nasi Goreng Gila Menteng',
    restaurantName: 'Nasi Goreng Gila Outlet Menteng',
    address: 'Jl. Menteng Raya No. 1, Jakarta Pusat',
    description: 'Porsinya brutal, rasanya nendang! Pedasnya pas buat yang suka tantangan. Wajib coba kalau lagi di sekitar Menteng.',
    photoUrl: 'https://via.placeholder.com/300x200.png?text=Nasi+Goreng+Gila',
    rating: 5,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(), // 5 hari lalu
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
  },
  {
    id: 'rev002',
    userId: 'user002',
    kulinerName: 'Soto Ayam Lamongan Cak Har',
    restaurantName: 'Soto Ayam Lamongan Asli Cak Har',
    address: 'Jl. Embong Malang No. 78, Surabaya',
    description: 'Kuahnya gurih banget, koya-nya melimpah. Ayamnya empuk dan porsinya pas. Selalu jadi pilihan kalau kangen soto.',
    photoUrl: 'https://via.placeholder.com/300x200.png?text=Soto+Ayam',
    rating: 4,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), // 3 hari lalu
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
  },
  {
    id: 'rev003',
    userId: 'user001',
    kulinerName: 'Kopi Susu Tetangga Sebelah',
    restaurantName: 'Kedai Kopi Sebelah',
    address: 'Jl. Cikini No. 17, Jakarta Pusat',
    description: 'Kopi susunya creamy, manisnya pas, nggak bikin eneg. Tempatnya juga cozy buat nongkrong atau kerja.',
    photoUrl: 'https://via.placeholder.com/300x200.png?text=Kopi+Susu',
    rating: 4,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 hari lalu
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(), // diupdate 1 hari lalu
  },
  {
    id: 'rev004',
    userId: 'user002',
    kulinerName: 'Martabak Manis Bangka Spesial',
    restaurantName: 'Martabak Bangka Jaya Abadi',
    address: 'Jl. Sabang No. 25A, Jakarta Pusat',
    description: 'Adonannya lembut, toppingnya royal banget! Keju coklat kacang wijennya juara. Selalu antri tapi worth it.',
    photoUrl: 'https://via.placeholder.com/300x200.png?text=Martabak+Manis',
    rating: 5,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 jam lalu
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
  },
  {
    id: 'rev005',
    userId: 'user001',
    kulinerName: 'Gudeg Yu Djum Pusat',
    restaurantName: 'Gudeg Yu Djum Wijilan',
    address: 'Jl. Wijilan No. 167, Yogyakarta',
    description: 'Gudegnya otentik, manisnya pas, kreceknya mantap. Suasana Jogjanya dapet banget. Wajib beli buat oleh-oleh juga.',
    photoUrl: 'https://via.placeholder.com/300x200.png?text=Gudeg+Yu+Djum',
    rating: 4,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(), // 10 hari lalu
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(),
  }
];

if (!localStorage.getItem(MOCK_REVIEWS_DB) || JSON.parse(localStorage.getItem(MOCK_REVIEWS_DB)).length === 0) {
  console.log('REVIEWS API: Initializing MOCK_REVIEWS_DB with dummy reviews.');
  localStorage.setItem(MOCK_REVIEWS_DB, JSON.stringify(DUMMY_REVIEWS));
}

export const fetchAllReviews = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const reviews = JSON.parse(localStorage.getItem(MOCK_REVIEWS_DB)) || [];
      console.log("API: fetchAllReviews returning:", reviews);
      resolve(reviews);
    }, 300);
  });
};

export const addReview = async (reviewData, userId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const reviews = JSON.parse(localStorage.getItem(MOCK_REVIEWS_DB)) || [];
      const newReview = {
        ...reviewData,
        id: `rev-${Date.now().toString()}`, // ID baru untuk review yang diregistrasi
        userId: userId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      reviews.push(newReview);
      localStorage.setItem(MOCK_REVIEWS_DB, JSON.stringify(reviews));
      console.log("API: addReview created:", newReview);
      resolve(newReview); // Mengembalikan review yang baru dibuat
    }, 500);
  });
};

export const updateReview = async (reviewId, reviewData, userIdAttemptingUpdate) => {
  console.log(`API: updateReview called for reviewId: ${reviewId}, userIdAttemptingUpdate: ${userIdAttemptingUpdate}`, reviewData);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let reviews = JSON.parse(localStorage.getItem(MOCK_REVIEWS_DB)) || [];
      const reviewIndex = reviews.findIndex(review => review.id === reviewId);

      if (reviewIndex === -1) {
        console.error(`API Error: Review dengan ID ${reviewId} tidak ditemukan.`);
        reject({ status: 404, message: `Review dengan ID ${reviewId} tidak ditemukan.` });
        return;
      }
      const reviewToUpdate = reviews[reviewIndex];
      if (reviewToUpdate.userId !== userIdAttemptingUpdate) {
        console.error(`API Error: Pengguna ${userIdAttemptingUpdate} tidak diizinkan mengubah review ID ${reviewId} milik pengguna ${reviewToUpdate.userId}.`);
        reject({ status: 403, message: 'Anda tidak diizinkan untuk mengubah review ini.' });
        return;
      }
      const updatedReview = {
        ...reviewToUpdate,
        ...reviewData,
        updatedAt: new Date().toISOString()
      };
      reviews[reviewIndex] = updatedReview;
      localStorage.setItem(MOCK_REVIEWS_DB, JSON.stringify(reviews));
      console.log('API: Review berhasil diperbarui di localStorage:', updatedReview);
      resolve({ status: 200, data: updatedReview, message: 'Review berhasil diperbarui.' });
    }, 500);
  });
};

export const deleteReview = async (reviewId, userIdAttemptingDelete) => {
  console.log(`API: deleteReview called for reviewId: ${reviewId}, userIdAttemptingDelete: ${userIdAttemptingDelete}`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let reviews = JSON.parse(localStorage.getItem(MOCK_REVIEWS_DB)) || [];
      const reviewIndex = reviews.findIndex(review => review.id === reviewId);

      if (reviewIndex === -1) {
        console.error(`API Error: Review dengan ID ${reviewId} tidak ditemukan untuk dihapus.`);
        reject({ status: 404, message: `Review dengan ID ${reviewId} tidak ditemukan.` });
        return;
      }
      const reviewToDelete = reviews[reviewIndex];
      if (reviewToDelete.userId !== userIdAttemptingDelete) {
        console.error(`API Error: Pengguna ${userIdAttemptingDelete} tidak diizinkan menghapus review ID ${reviewId} milik pengguna ${reviewToDelete.userId}.`);
        reject({ status: 403, message: 'Anda tidak diizinkan untuk menghapus review ini.' });
        return;
      }
      reviews.splice(reviewIndex, 1);
      localStorage.setItem(MOCK_REVIEWS_DB, JSON.stringify(reviews));
      console.log(`API: Review dengan ID ${reviewId} berhasil dihapus dari localStorage.`);
      resolve({ status: 200, message: 'Review berhasil dihapus.' });
    }, 500);
  });
};