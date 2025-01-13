import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  getProfile() {
    // TODO: return the decoded token
    const token = this.getToken();
    if (token) {
      return jwtDecode<JwtPayload>(token);
    }
    return null;
  }

  loggedIn() {
    // TODO: return a value that indicates if the user is logged in
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }
  
  isTokenExpired(token: string) {
    // TODO: return a value that indicates if the token is expired
    // Complete
    try {
      const decodedToken = jwtDecode<JwtPayload>(token);
      const currentTime = Date.now() / 1000;
      return decodedToken.exp ? decodedToken.exp < currentTime : true;
    } catch (error) {
      return true;
    }
  }

  getToken(): string {
    // TODO: return the token
    // Complete

    return localStorage.getItem('token') || '';
  }

  login(idToken: string) {
    // TODO: set the token to localStorage
    // Complete
    localStorage.setItem('token', idToken);
    // TODO: redirect to the home page
    // Complete
    window.location.assign('/');
  }

  logout() {
    // TODO: remove the token from localStorage
    // Complete
    localStorage.removeItem('token');
    // TODO: redirect to the login page
    // Complete
    window.location.assign('/login');
  }
}

export default new AuthService();