/* eslint-disable @typescript-eslint/no-explicit-any */
const BASE_URL = 'https://rickandmortyapi.com/api';

export async function getLocations() {
  const res = await fetch(`${BASE_URL}/location`);
  if (!res.ok) throw new Error('Error fetching locations');
  return res.json();
}

export async function getLocationById(id: string) {
  const res = await fetch(`${BASE_URL}/location/${id}`);
  if (!res.ok) throw new Error('Error fetching location detail');
  return res.json();
}

export const rickMortyAPI = {
  async getCharacters(
    page: number = 1,
    name?: string,
    status?: string
  ): Promise<any> {
    let url = `${BASE_URL}/character?page=${page}`;

    if (name) url += `&name=${encodeURIComponent(name)}`;
    if (status) url += `&status=${status}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  },

  async getCharacterById(id: number): Promise<any> {
    const response = await fetch(`${BASE_URL}/character/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  },

  extractIdFromUrl(url: string): number | null {
    if (!url || url === '') return null;
    const parts = url.split('/');
    const id = parts[parts.length - 1];
    return id && !isNaN(Number(id)) ? parseInt(id) : null;
  },
};

export default rickMortyAPI;
