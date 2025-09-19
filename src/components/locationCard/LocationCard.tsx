import { Link } from 'react-router-dom';
import styles from './LocationsCard.module.css';

interface LocationCardProps {
  id: number;
  name: string;
  type: string;
  dimension: string;
}

export default function LocationCard({
  id,
  name,
  type,
  dimension,
}: LocationCardProps) {
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>{name}</h2>
      <p className={styles.text}>
        <strong>Type:</strong> {type}
      </p>
      <p className={styles.text}>
        <strong>Dimension:</strong> {dimension}
      </p>
      <Link to={`/locations/${id}`} className={styles.button}>
        Ver
      </Link>
    </div>
  );
}
