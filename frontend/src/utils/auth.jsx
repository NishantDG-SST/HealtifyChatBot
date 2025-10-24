// Get JWT token from localStorage
export const getToken = () => {
  return localStorage.getItem('token');
};

// Set JWT token in localStorage
export const setToken = (token) => {
  localStorage.setItem('token', token);
};

// Remove JWT token from localStorage
export const removeToken = () => {
  localStorage.removeItem('token');
};

// Get user data from localStorage
export const getUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

// Set user data in localStorage
export const setUser = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

// Remove user data from localStorage
export const removeUser = () => {
  localStorage.removeItem('user');
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return !!getToken();
};

// Logout user - clear all auth data
export const logout = () => {
  removeToken();
  removeUser();
};