import React from 'react';
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { Activity, Search, BarChart3 } from 'lucide-react';
import Activities from './pages/Activities';
import ActivityDetail from './pages/ActivityDetail';
import Filter from './pages/Filter';
import Stats from './pages/Stats';


function App() {
  const location = useLocation();

  return (
    <div>
      <nav className="glass-card" style={{ marginBottom: '2rem', padding: '1rem 2rem', display: 'flex', gap: '2rem', alignItems: 'center' }}>
        <div style={{ fontWeight: '800', fontSize: '1.5rem', background: 'linear-gradient(to right, var(--accent-primary), var(--accent-secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginRight: '2rem' }}>
          T4E Dataset B
        </div>
        <Link to="/activities" className={location.pathname.startsWith('/activities') ? 'active' : ''} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Activity size={18} /> Activities
        </Link>
        <Link to="/filter" className={location.pathname === '/filter' ? 'active' : ''} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Search size={18} /> Filter
        </Link>
        <Link to="/stats" className={location.pathname === '/stats' ? 'active' : ''} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <BarChart3 size={18} /> Stats
        </Link>
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/activities" replace />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/activities/:id" element={<ActivityDetail />} />
          <Route path="/filter" element={<Filter />} />
          <Route path="/stats" element={<Stats />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
