import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  // Decode the token and return the profile information
  getProfile() {
    const token = this.getToken();
    if (token) {
      return jwtDecode<JwtPayload>(token);
    }
    return null;
  }

  // Check if the user is logged in
  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  // Check if the token is expired
  isTokenExpired(token: string) {
    try {
      const { exp } = jwtDecode<JwtPayload>(token);
      if (!exp) {
        return true;
      }
      return Date.now() >= exp * 1000; // Convert exp from seconds to milliseconds
    } catch (error) {
      console.error('Error decoding token:', error);
      return true;
    }
  }

  // Get the token from localStorage
  getToken(): string | null {
    return localStorage.getItem('id_token');
  }

  // Set the token to localStorage and redirect to the home page
  login(idToken: string) {
    localStorage.setItem('id_token', idToken);
    window.location.assign('/'); // Redirect to the home page
  }

  // Remove the token from localStorage and redirect to the login page
  logout() {
    localStorage.removeItem('id_token');
    window.location.assign('/login'); // Redirect to the login page
  }
}

export default new AuthService();
