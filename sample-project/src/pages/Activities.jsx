import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DatasetContext } from '../context/DatasetContext';
import { Activity, Clock, Flame } from 'lucide-react';

const Activities = () => {
  const { state, fetchDataset } = useContext(DatasetContext);

  useEffect(() => {
    fetchDataset();
  }, [fetchDataset]);

  if (state.loading) return <div className="spinner"></div>;
  if (state.error) return <div className="glass-card"><p style={{color: '#ef4444'}}>Error: {state.error}</p></div>;

  return (
    <div>
      <h1>Activities List</h1>
      <p>Browse through your complete dataset B of activities.</p>
      
      <div className="grid">
        {state.data.map((activity) => (
          <div key={activity.id} className="glass-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <h2>{activity.name}</h2>
              <span className="badge">{activity.type}</span>
            </div>
            
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <Clock size={16} /> {activity.duration} min
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <Flame size={16} /> {activity.calories} cal
              </span>
            </div>
            
            <p>{activity.description}</p>
            
            <div style={{ marginTop: '1.5rem' }}>
              <Link to={`/activities/${activity.id}`} className="btn">
                <Activity size={18} /> View Details
              </Link>
            </div>
          </div>
        ))}
        {state.data.length === 0 && <p>No activities found in the dataset.</p>}
      </div>
    </div>
  );
};

export default Activities;
