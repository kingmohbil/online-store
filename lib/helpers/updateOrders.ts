import axios from 'axios';
export async function updateConfirmedStatus(
  accessToken: string,
  id: string,
  status: string
) {
  try {
    const response = await axios.put(
      '/api/orders',
      {
        id,
        status,
      },
      {
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      }
    );
    Promise.resolve(response);
  } catch (error) {
    Promise.reject(error);
  }
}
