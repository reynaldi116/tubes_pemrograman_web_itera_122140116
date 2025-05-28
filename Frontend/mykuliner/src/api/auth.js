const MOCK_USERS_DB = 'mykuliner_users';
const MOCK_CURRENT_USER_DB = 'mykuliner_currentUser';

const DUMMY_USERS = [
  {
    id: 'user001',
    name: 'Budi Kuliner',
    email: 'budi@example.com',
    password: 'password123',
  },
  {
    id: 'user002',
    name: 'Siti Reviewer',
    email: 'siti@example.com',
    password: 'password123',
  },
];

if (!localStorage.getItem(MOCK_USERS_DB) || JSON.parse(localStorage.getItem(MOCK_USERS_DB)).length === 0) {
  console.log('AUTH API: Initializing MOCK_USERS_DB with dummy users.');
  localStorage.setItem(MOCK_USERS_DB, JSON.stringify(DUMMY_USERS));
}

export const registerUser = async (userData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem(MOCK_USERS_DB));
      const existingUser = users.find(user => user.email === userData.email);
      if (existingUser) {
        reject({ message: 'Email sudah terdaftar.' });
      } else {
        // Untuk pengguna baru yang diregistrasi, kita beri ID unik
        const newUser = { id: `reg-${Date.now().toString()}`, ...userData };
        users.push(newUser);
        localStorage.setItem(MOCK_USERS_DB, JSON.stringify(users));
        // Saat registrasi, langsung loginkan juga (simulasi)
        const userToStore = { id: newUser.id, name: newUser.name, email: newUser.email };
        const token = `fake-jwt-token-for-${newUser.id}`;
        localStorage.setItem(MOCK_CURRENT_USER_DB, JSON.stringify({ user: userToStore, token }));
        resolve({ user: userToStore, token });
      }
    }, 500);
  });
};

export const loginUser = async (credentials) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem(MOCK_USERS_DB));
      const user = users.find(u => u.email === credentials.email && u.password === credentials.password); // Password check sederhana
      if (user) {
        const userToStore = { id: user.id, name: user.name, email: user.email };
        const token = `fake-jwt-token-for-${user.id}`;
        localStorage.setItem(MOCK_CURRENT_USER_DB, JSON.stringify({ user: userToStore, token }));
        resolve({ user: userToStore, token });
      } else {
        reject({ message: 'Email atau password salah.' });
      }
    }, 500);
  });
};

export const logoutUser = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      localStorage.removeItem(MOCK_CURRENT_USER_DB);
      resolve({ message: 'Logout berhasil.' });
    }, 200);
  });
};

export const getCurrentUser = () => {
  const storedUser = localStorage.getItem(MOCK_CURRENT_USER_DB);
  if (storedUser) {
    return JSON.parse(storedUser);
  }
  return null;
};