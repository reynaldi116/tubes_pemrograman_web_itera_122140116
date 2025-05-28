import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useReviews } from '../../hooks/useReview.js';
import { useForm } from '../../hooks/useForm.js';
import Input from '../UI/Input.jsx';
import Button from '../UI/Button.jsx';
import StarRating from '../UI/StarRating.jsx';
import Spinner from '../UI/Spinner.jsx';

const DEFAULT_FORM_VALUES = {
  kulinerName: '',
  restaurantName: '',
  address: '',
  description: '',
  photoUrl: '',
  rating: 0,
};

const ReviewForm = ({ reviewToEdit }) => {
  const [localError, setLocalError] = useState('');
  const [loading, setLoading] = useState(false);
  const { addNewReview, updateExistingReview } = useReviews();
  const navigate = useNavigate();

  const handleFormSubmitCallback = async (formValues) => {
    console.log('ReviewForm: handleFormSubmitCallback triggered with values:', formValues);
    setLocalError('');

    if (formValues.rating === 0) {
      const errMsg = 'Rating bintang tidak boleh kosong.';
      console.warn('ReviewForm Validation:', errMsg);
      setLocalError(errMsg);
      return;
    }
    if (!formValues.kulinerName.trim() || !formValues.restaurantName.trim() || !formValues.address.trim() || !formValues.description.trim()) {
      const errMsg = 'Semua field kecuali Foto harus diisi.';
      console.warn('ReviewForm Validation:', errMsg);
      setLocalError(errMsg);
      return;
    }

    setLoading(true);
    try {
      if (reviewToEdit) {
        console.log('ReviewForm: Attempting to update review ID:', reviewToEdit.id);
        await updateExistingReview(reviewToEdit.id, formValues);
        console.log('ReviewForm: Review updated successfully.');
      } else {
        console.log('ReviewForm: Attempting to add new review.');
        await addNewReview(formValues);
        console.log('ReviewForm: New review added successfully.');
      }
    if (!reviewToEdit) {
    resetForm();
      }
navigate('/dashboard');
      navigate('/dashboard');
    } catch (err) {
      console.error('ReviewForm: Error during review submission:', err);
      setLocalError(err.message || 'Gagal menyimpan review. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  const { values, handleChange, handleSubmit, setFieldValue, updateFormValues, resetForm } = useForm(
    DEFAULT_FORM_VALUES,
    handleFormSubmitCallback
  );

  useEffect(() => {
    if (reviewToEdit) {
      console.log('ReviewForm: reviewToEdit detected, populating form:', reviewToEdit);
      updateFormValues({
        kulinerName: reviewToEdit.kulinerName || '',
        restaurantName: reviewToEdit.restaurantName || '',
        address: reviewToEdit.address || '',
        description: reviewToEdit.description || '',
        photoUrl: reviewToEdit.photoUrl || '',
        rating: reviewToEdit.rating || 0,
      });
    } else {
        console.log('ReviewForm: No reviewToEdit, form uses default values.');
    }
  }, [reviewToEdit, updateFormValues]);
  
  const handleRatingChange = (newRating) => {
    console.log('ReviewForm: Rating changed to:', newRating);
    setFieldValue('rating', newRating);
  };

  return (
    <div className="card" style={{ maxWidth: '600px', margin: '20px auto' }}>
      {loading && <Spinner />}
      <h2>{reviewToEdit ? 'Edit Review Kuliner' : 'Tambah Review Kuliner Baru'}</h2>
      <form onSubmit={handleSubmit}>
        {localError && <p style={{ color: 'red', border: '1px solid red', padding: '10px', borderRadius: '4px' }}>{localError}</p>}
        {/* ... Input fields sama seperti sebelumnya ... */}
        <Input
          label="Nama Kuliner"
          name="kulinerName"
          value={values.kulinerName}
          onChange={handleChange}
          required
        />
        <Input
          label="Nama Restoran/Tempat Makan"
          name="restaurantName"
          value={values.restaurantName}
          onChange={handleChange}
          required
        />
        <Input
          label="Alamat"
          name="address"
          value={values.address}
          onChange={handleChange}
          required
        />
        <div className="form-group">
          <label htmlFor="description">Deskripsi/Review Anda</label>
          <textarea
            id="description"
            name="description"
            value={values.description}
            onChange={handleChange}
            rows="4"
            required
            style={{width: 'calc(100% - 22px)', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem', resize: 'vertical', minHeight: '80px'}}
          />
        </div>
        <Input
          label="URL Foto Kuliner (opsional)"
          name="photoUrl"
          value={values.photoUrl}
          onChange={handleChange}
          placeholder="https://example.com/image.jpg"
        />
        <div className="form-group">
          <label>Rating Bintang</label>
          <StarRating
            initialRating={values.rating}
            onRatingChange={handleRatingChange}
          />
        </div>
        <Button type="submit" variant="primary" disabled={loading}>
          {loading ? 'Menyimpan...' : (reviewToEdit ? 'Update Review' : 'Simpan Review')}
        </Button>
        <Button type="button" variant="secondary" onClick={() => navigate(-1)} disabled={loading} style={{marginLeft: '10px'}}>
          Batal
        </Button>
      </form>
    </div>
  );
};

export default ReviewForm;