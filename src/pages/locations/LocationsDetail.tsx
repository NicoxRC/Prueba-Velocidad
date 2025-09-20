// src/pages/LocationDetail.tsx
import { useEffect, useState, type Key } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './LocationDetail.module.css';
import { getLocationById } from '../../api';

export default function LocationDetail() {
  const { id } = useParams();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [location, setLocation] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getLocationById(id)
        .then((data) => setLocation(data))
        .catch((err) => console.error(err));
    }
  }, [id]);

  if (!location) return <p>Cargando...</p>;

  // Extraer el número de cada URL de resident

  return (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        ← Volver
      </button>

      <div className={styles.card}>
        <h1 className={styles.cardTitle}>{location.name}</h1>
        <p>
          <strong>Type:</strong> {location.type}
        </p>
        <p>
          <strong>Dimension:</strong> {location.dimension}
        </p>
      </div>

      <div className={styles.card}>
        <h2 className={styles.cardTitle}>Residents</h2>
        <div className={styles.residents}>
          {location.residents.map(
            (url: string, index: Key | null | undefined) => {
              const num = url.split('/').pop();
              return (
                <button
                  key={index}
                  className={styles.residentButton}
                  onClick={() => navigate(`/characters/${num}`)}
                >
                  {num}
                </button>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
}
