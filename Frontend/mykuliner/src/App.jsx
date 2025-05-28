import React from 'react';
import AppRoutes from './routes/AppRoutes.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { ReviewProvider } from './contexts/ReviewContext.jsx';

function App() {
  return (
    <AuthProvider>
      <ReviewProvider>
        <AppRoutes />
      </ReviewProvider>
    </AuthProvider>
  );
}

export default App;