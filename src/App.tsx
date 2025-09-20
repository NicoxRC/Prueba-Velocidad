// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Characters from './pages/Characters';
import CharacterDetail from './pages/CharacterDetail';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/characters" element={<Characters />} />
          <Route path="/characters/:id" element={<CharacterDetail />} />
          {/* Rutas futuras para tu compañero */}
          <Route path="/locations" element={<div className="coming-soon-page">🌍 Locations - Próximamente</div>} />
          <Route path="/episodes" element={<div className="coming-soon-page">📺 Episodes - Próximamente</div>} />
          {/* 404 Page */}
          <Route path="*" element={<div className="not-found-page">❌ Página no encontrada</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;