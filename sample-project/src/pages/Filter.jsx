import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DatasetContext } from '../context/DatasetContext';
import { Search, Activity } from 'lucide-react';

const Filter = () => {
  const { state, dispatch, fetchDataset } = useContext(DatasetContext);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchDataset();
  }, [fetchDataset]);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    // Dispatches to reducer which uses the `filter` method
    dispatch({ type: 'APPLY_FILTER', payload: term });
  };

  if (state.loading) return <div className="spinner"></div>;

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1>Filter Dataset</h1>
        <p>Search activities by name, type, or description.</p>
        
        <div style={{ position: 'relative', maxWidth: '600px', margin: '2rem auto' }}>
          <div style={{ position: 'absolute', top: '50%', left: '1rem', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }}>
            <Search size={20} />
          </div>
          <input 
            type="text" 
            placeholder="Type to filter..." 
            value={searchTerm}
            onChange={handleSearch}
            style={{ paddingLeft: '3rem', fontSize: '1.2rem', padding: '1rem 1rem 1rem 3rem' }}
          />
        </div>
      </div>

      <div className="grid">
        {state.filteredData.map((activity) => (
          <div key={activity.id} className="glass-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ margin: 0 }}>{activity.name}</h3>
              <span className="badge">{activity.type}</span>
            </div>
            <p style={{ fontSize: '0.9rem', marginBottom: '1.5rem' }}>{activity.description}</p>
            <Link to={`/activities/${activity.id}`} className="btn" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
              <Activity size={16} /> Details
            </Link>
          </div>
        ))}
        {state.filteredData.length === 0 && (
          <div className="glass-card" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem' }}>
            <h2>No matches found</h2>
            <p>Try adjusting your search filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Filter;
