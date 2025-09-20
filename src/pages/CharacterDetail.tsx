/* eslint-disable @typescript-eslint/no-explicit-any */
// src/pages/CharacterDetail.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { rickMortyAPI } from '../api';
import LoadingSpinner from '../components/LoadingSpinner';
import './CharacterDetail.css';

const CharacterDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [character, setCharacter] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      loadCharacter(parseInt(id));
    }
  }, [id]);

  const loadCharacter = async (characterId: number) => {
    try {
      setLoading(true);
      setError(null);
      const characterData = await rickMortyAPI.getCharacterById(characterId);
      setCharacter(characterData);
    } catch (err: any) {
      setError(err.message || 'Error loading character');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'alive':
        return '#4caf50';
      case 'dead':
        return '#f44336';
      default:
        return '#9e9e9e';
    }
  };

  const handleLocationClick = (locationUrl: string) => {
    const locationId = rickMortyAPI.extractIdFromUrl(locationUrl);
    if (locationId) {
      navigate(`/locations/${locationId}`);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return <LoadingSpinner message="Cargando personaje..." />;
  }

  if (error || !character) {
    return (
      <div className="character-detail-page">
        <div className="error-container">
          <h2>❌ Error</h2>
          <p>{error || 'Personaje no encontrado'}</p>
          <button onClick={() => navigate('/characters')}>
            Volver a Characters
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="character-detail-page">
      <div className="character-detail-container">
        <header className="detail-header">
          <button className="back-btn" onClick={() => navigate('/characters')}>
            ← Volver a Characters
          </button>

          <button className="home-btn" onClick={() => navigate('/')}>
            🏠 Dashboard
          </button>
        </header>

        <div className="character-hero">
          <div className="character-image-section">
            <div className="image-container">
              <img
                src={character.image}
                alt={character.name}
                className="character-image"
              />
              <div
                className="status-badge"
                style={{ backgroundColor: getStatusColor(character.status) }}
              >
                <span className="status-dot"></span>
                {character.status}
              </div>
            </div>
          </div>

          <div className="character-info-section">
            <h1 className="character-name">{character.name}</h1>

            <div className="character-basic-info">
              <div className="info-chip species">
                <span className="chip-icon">🧬</span>
                {character.species}
              </div>

              <div className="info-chip gender">
                <span className="chip-icon">⚧️</span>
                {character.gender}
              </div>

              {character.type && (
                <div className="info-chip type">
                  <span className="chip-icon">🏷️</span>
                  {character.type}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="character-details">
          <div className="details-grid">
            <div className="detail-card location-card">
              <h3>📍 Ubicación Actual</h3>
              <div
                className="location-item clickable"
                onClick={() => handleLocationClick(character.location.url)}
              >
                <span className="location-name">{character.location.name}</span>
                <span className="click-hint">Click para ver detalles →</span>
              </div>
            </div>

            <div className="detail-card origin-card">
              <h3>🏠 Origen</h3>
              <div
                className="location-item clickable"
                onClick={() => handleLocationClick(character.origin.url)}
              >
                <span className="location-name">{character.origin.name}</span>
                <span className="click-hint">Click para ver detalles →</span>
              </div>
            </div>

            <div className="detail-card episodes-card">
              <h3>📺 Episodios</h3>
              <div className="episodes-info">
                <div className="episode-count">
                  <span className="count-number">
                    {character.episode.length}
                  </span>
                  <span className="count-label">episodios</span>
                </div>
                <p className="episodes-description">
                  Este personaje aparece en {character.episode.length} episodio
                  {character.episode.length !== 1 ? 's' : ''} de la serie.
                </p>
              </div>
            </div>

            <div className="detail-card creation-card">
              <h3>⏰ Información Adicional</h3>
              <div className="creation-info">
                <p>
                  <strong>Creado en la API:</strong>
                </p>
                <p className="creation-date">{formatDate(character.created)}</p>
                <p>
                  <strong>ID del personaje:</strong> #{character.id}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="action-buttons">
          <button
            className="action-btn primary"
            onClick={() => window.open(character.url, '_blank')}
          >
            Ver en API 🔗
          </button>

          <button
            className="action-btn secondary"
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              alert('¡Enlace copiado al portapapeles!');
            }}
          >
            Compartir 📋
          </button>
        </div>

        <div className="character-stats">
          <h3>📊 Estadísticas</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-label">Estado</span>
              <span
                className="stat-value status"
                style={{ color: getStatusColor(character.status) }}
              >
                {character.status}
              </span>
            </div>

            <div className="stat-item">
              <span className="stat-label">Especie</span>
              <span className="stat-value">{character.species}</span>
            </div>

            <div className="stat-item">
              <span className="stat-label">Género</span>
              <span className="stat-value">{character.gender}</span>
            </div>

            <div className="stat-item">
              <span className="stat-label">Episodios</span>
              <span className="stat-value">{character.episode.length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetail;
