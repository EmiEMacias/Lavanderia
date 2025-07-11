const API_URL = 'http://localhost:5000/api/garments'; 

export async function getGarments() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Error al obtener prendas');
  return res.json();
}

export async function createGarment(garment) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(garment),
  });
  if (!res.ok) throw new Error('Error al crear prenda');
  return res.json();
}

export async function updateGarment(id, garment) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(garment),
  });
  if (!res.ok) throw new Error('Error al actualizar prenda');
  return res.json();
}

export async function deleteGarment(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Error al eliminar prenda');
}