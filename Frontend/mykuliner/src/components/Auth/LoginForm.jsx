import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.js';
import { useForm } from '../../hooks/useForm.js';
import Input from '../UI/Input.jsx';
import Button from '../UI/Button.jsx';
import Spinner from '../UI/Spinner.jsx';

const LoginForm = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login: authLogin } = useAuth();
  const navigate = useNavigate();

  const initialFormValues = {
    email: '',
    password: '',
  };

  const handleLoginSubmit = async (formValues) => {
    setError('');
    setLoading(true);
    try {
      await authLogin({ email: formValues.email, password: formValues.password });
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Login gagal. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  const { values, handleChange, handleSubmit } = useForm(initialFormValues, handleLoginSubmit);

  return (
    <div className="card" style={{ maxWidth: '400px', margin: '40px auto' }}>
      {loading && <Spinner />}
      <h2>Login Akun</h2>
      {/* Menggunakan handleSubmit dari useForm */}
      <form onSubmit={handleSubmit}>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <Input
          label="Email"
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          required
        />
        <Input
          label="Password"
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          required
        />
        <Button type="submit" variant="primary" disabled={loading}>
          {loading ? 'Memproses...' : 'Login'}
        </Button>
      </form>
      <p style={{ marginTop: '15px' }}>
        Belum punya akun? <Link to="/register">Daftar di sini</Link>
      </p>
    </div>
  );
};

export default LoginForm;