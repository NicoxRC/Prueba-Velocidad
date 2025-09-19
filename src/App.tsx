import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Locations from './pages/locations/Locations';
import LocationDetail from './pages/locations/LocationsDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/locations" element={<Locations />} />
        <Route path="/locations/:id" element={<LocationDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
