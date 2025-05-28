import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }} className="container">
      <h1>404 - Halaman Tidak Ditemukan</h1>
      <p>Maaf, halaman yang Anda cari tidak ada.</p>
      <Link to="/" className="button-primary" style={{textDecoration:'none'}}>Kembali ke Beranda</Link>
      {/* Atau pakai komponen Button jika mau:
      <Button onClick={() => navigate('/')} variant="primary">Kembali ke Beranda</Button> */}
    </div>
  );
};

export default NotFoundPage;