import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LocationCard from '../../components/locationCard/LocationCard';
import styles from './Locations.module.css';
import { getLocations } from '../../api';

export default function Locations() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [locations, setLocations] = useState<any[]>([]);

  useEffect(() => {
    getLocations()
      .then((data) => setLocations(data.results))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link to="/" className={styles.backButton}>
          Volver
        </Link>
        <h1 className={styles.pageTitle}>Locations</h1>
      </header>

      <div className={styles.grid}>
        {locations.map((loc) => (
          <LocationCard
            key={loc.id}
            id={loc.id}
            name={loc.name}
            type={loc.type}
            dimension={loc.dimension}
          />
        ))}
      </div>
    </div>
  );
}
