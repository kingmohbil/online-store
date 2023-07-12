import axios from 'axios';
export function clearTokensFromLocalStorage() {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
}

export async function requestAccessToken(refreshToken: string) {
  try {
    const response = await axios.post('/api/auth/access_token', {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });
    if (response.status === 200) return response.data.accessToken;
  } catch (error: any) {
    if (error.response.status === 401) return null;
  }
}

export async function logoutTokens(refreshToken: string) {
  try {
    const logoutResponse = await axios.get('/api/auth/logout', {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });
    if (logoutResponse.status === 200) {
      clearTokensFromLocalStorage();
      return true;
    }
  } catch (error) {
    return false;
  }
}
