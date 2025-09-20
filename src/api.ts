const BASE_URL = 'https://rickandmortyapi.com/api';

export const rickMortyAPI = {
  async getCharacters(page: number = 1, name?: string, status?: string): Promise<any> {
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
  }
};

export default rickMortyAPI;