import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Uploads from './pages/Uploads';
import Specs from './pages/Specs';
import Tickets from './pages/Tickets';
import Settings from './pages/Settings';
import { Engineers } from './pages/Engineers';
import { EngineerDetails } from './pages/EngineerDetails';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/uploads" element={<Uploads />} />
          <Route path="/specs" element={<Specs />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/engineers" element={<Engineers />} />
          <Route path="/engineers/:id" element={<EngineerDetails />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;