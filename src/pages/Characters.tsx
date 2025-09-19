// src/pages/Characters.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { rickMortyAPI } from '../api';
import LoadingSpinner from '../components/LoadingSpinner';
import './Characters.css';

const Characters: React.FC = () => {
  const navigate = useNavigate();
  const [characters, setCharacters] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');

  useEffect(() => {
    loadCharacters(currentPage, searchTerm, statusFilter);
  }, [currentPage, searchTerm, statusFilter]);

  const loadCharacters = async (page: number, name?: string, status?: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await rickMortyAPI.getCharacters(page, name, status);
      setCharacters(response.results);
      setTotalPages(response.info.pages);
    } catch (err: any) {
      setError(err.message || 'Error loading characters');
      setCharacters([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status === statusFilter ? '' : status);
    setCurrentPage(1);
  };

  const handleCharacterClick = (characterId: number) => {
    navigate(`/characters/${characterId}`);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'alive': return '#4caf50';
      case 'dead': return '#f44336';
      default: return '#9e9e9e';
    }
  };

  const renderPagination = () => {
    const pages = [];
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);

    if (currentPage > 1) {
      pages.push(
        <button key="prev" onClick={() => handlePageChange(currentPage - 1)}>
          ← Anterior
        </button>
      );
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          className={i === currentPage ? 'active' : ''}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }

    if (currentPage < totalPages) {
      pages.push(
        <button key="next" onClick={() => handlePageChange(currentPage + 1)}>
          Siguiente →
        </button>
      );
    }

    return pages;
  };

  if (loading && characters.length === 0) {
    return <LoadingSpinner />;
  }

  return (
    <div className="characters-page">
      <div className="characters-container">
        <header className="characters-header">
          <button className="back-btn" onClick={() => navigate('/')}>
            ← Volver al Dashboard
          </button>
          
          <h1 className="characters-title">
            <span className="title-icon">👨‍🔬</span>
            Characters
          </h1>
          
          <p className="characters-subtitle">
            Descubre todos los personajes del universo Rick and Morty
          </p>
        </header>

        <div className="filters-section">
          <div className="search-container">
            <input
              type="text"
              placeholder="Buscar personajes..."
              value={searchTerm}
              onChange={handleSearch}
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>

          <div className="status-filters">
            <span className="filter-label">Estado:</span>
            {['alive', 'dead', 'unknown'].map((status) => (
              <button
                key={status}
                className={`status-filter ${statusFilter === status ? 'active' : ''}`}
                onClick={() => handleStatusFilter(status)}
                style={{ 
                  borderColor: getStatusColor(status),
                  backgroundColor: statusFilter === status ? getStatusColor(status) : 'transparent'
                }}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="error-message">
            <p>❌ {error}</p>
            <button onClick={() => loadCharacters(1)}>Reintentar</button>
          </div>
        )}

        {!error && (
          <>
            <div className="characters-grid">
              {characters.map((character) => (
                <div
                  key={character.id}
                  className="character-card"
                  onClick={() => handleCharacterClick(character.id)}
                >
                  <div className="character-image-container">
                    <img 
                      src={character.image} 
                      alt={character.name}
                      className="character-image"
                      loading="lazy"
                    />
                    <div 
                      className="status-indicator"
                      style={{ backgroundColor: getStatusColor(character.status) }}
                    ></div>
                  </div>
                  
                  <div className="character-info">
                    <h3 className="character-name">{character.name}</h3>
                    <p className="character-detail">
                      <strong>Especie:</strong> {character.species}
                    </p>
                    <p className="character-detail">
                      <strong>Origen:</strong> {character.origin.name}
                    </p>
                    <div 
                      className="character-status"
                      style={{ backgroundColor: getStatusColor(character.status) }}
                    >
                      {character.status}
                    </div>
                  </div>
                  
                  <div className="card-hover-overlay">
                    <span>Ver detalles →</span>
                  </div>
                </div>
              ))}
            </div>

            {loading && characters.length > 0 && (
              <div className="loading-more">
                <LoadingSpinner />
              </div>
            )}

            {totalPages > 1 && (
              <div className="pagination">
                {renderPagination()}
              </div>
            )}

            <div className="results-info">
              <p>
                Página {currentPage} de {totalPages} • Mostrando {characters.length} personajes
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Characters;