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
