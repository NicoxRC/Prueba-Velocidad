// src/pages/Dashboard.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const cards = [
    {
      id: 'characters',
      title: 'Characters',
      description: 'Descubre todos los personajes del universo de Rick and Morty. Desde científicos locos hasta alienígenas interdimensionales.',
      icon: '👨‍🔬',
      route: '/characters',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      available: true
    },
    {
      id: 'locations',
      title: 'Locations',
      description: 'Explora las diferentes ubicaciones y dimensiones que aparecen en la serie. Cada lugar tiene su propia historia única.',
      icon: '🌍',
      route: '/locations',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      available: false
    },
    {
      id: 'episodes',
      title: 'Episodes',
      description: 'Revive todos los episodios de la serie. Desde aventuras científicas hasta crisis interdimensionales.',
      icon: '📺',
      route: '/episodes',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      available: false
    }
  ];

  const handleCardClick = (card: any) => {
    if (card.available) {
      navigate(card.route);
    } else {
      alert(`🚧 ${card.title} funcionalidad próximamente...`);
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-container">
        <header className="dashboard-header">
          <h1 className="dashboard-title">
            <span className="title-icon">🛸</span>
            Rick and Morty API
          </h1>
          <p className="dashboard-subtitle">
            Explora el multiverso de Rick y Morty
          </p>
        </header>

        <div className="dashboard-grid">
          {cards.map((card) => (
            <div
              key={card.id}
              className={`dashboard-card ${!card.available ? 'disabled' : ''}`}
              onClick={() => handleCardClick(card)}
              style={{ background: card.gradient }}
            >
              <div className="card-content">
                <div className="card-icon">{card.icon}</div>
                <h3 className="card-title">{card.title}</h3>
                <p className="card-description">{card.description}</p>
                {!card.available && (
                  <div className="coming-soon">Próximamente</div>
                )}
              </div>
              <div className="card-overlay"></div>
            </div>
          ))}
        </div>

        <footer className="dashboard-footer">
          <p>Powered by Rick and Morty API</p>
          <div className="footer-links">
            <a 
              href="https://rickandmortyapi.com" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              API Documentation
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Dashboard;