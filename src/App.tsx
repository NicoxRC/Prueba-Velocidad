import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Characters from './pages/Characters';
import CharacterDetail from './pages/CharacterDetail';
import Locations from './pages/locations/Locations';
import LocationDetail from './pages/locations/LocationsDetail';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/characters" element={<Characters />} />
          <Route path="/characters/:id" element={<CharacterDetail />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="/locations/:id" element={<LocationDetail />} />
          <Route
            path="*"
            element={
              <div className="not-found-page">❌ Página no encontrada</div>
            }
          />
        </Routes>
      </div>
      <Routes></Routes>
    </Router>
  );
}

export default App;
