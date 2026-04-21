import React, { useContext, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { DatasetContext } from '../context/DatasetContext';
import { ArrowLeft, Clock, Flame, Info } from 'lucide-react';

const ActivityDetail = () => {
  const { id } = useParams();
  const { state, fetchDataset } = useContext(DatasetContext);

  useEffect(() => {
    fetchDataset();
  }, [fetchDataset]);

  if (state.loading) return <div className="spinner"></div>;
  
  const activity = state.data.find(a => String(a.id) === String(id));

  if (!activity) {
    return (
      <div className="glass-card" style={{ textAlign: 'center' }}>
        <h2>Activity Not Found</h2>
        <p>Could not locate the dataset B record with ID: {id}</p>
        <Link to="/activities" className="btn"><ArrowLeft size={18} /> Back to Activities</Link>
      </div>
    );
  }

  return (
    <div>
      <Link to="/activities" style={{ color: 'var(--accent-primary)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
        <ArrowLeft size={18} /> Back to List
      </Link>
      
      <div className="glass-card" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
          <h1>{activity.name}</h1>
          <span className="badge" style={{ fontSize: '1.2rem', padding: '0.5rem 1rem' }}>{activity.type}</span>
        </div>
        
        <div className="stats-grid" style={{ marginBottom: '2rem' }}>
          <div className="glass-card" style={{ background: 'rgba(59, 130, 246, 0.1)', textAlign: 'center' }}>
            <Clock size={40} style={{ margin: '0 auto 1rem', color: 'var(--accent-primary)' }} />
            <div className="stat-value" style={{ fontSize: '2.5rem' }}>{activity.duration}</div>
            <div className="stat-label">Minutes</div>
          </div>
          <div className="glass-card" style={{ background: 'rgba(239, 68, 68, 0.1)', textAlign: 'center' }}>
            <Flame size={40} style={{ margin: '0 auto 1rem', color: '#ef4444' }} />
            <div className="stat-value" style={{ fontSize: '2.5rem', backgroundImage: 'linear-gradient(to right, #ef4444, #f97316)' }}>{activity.calories}</div>
            <div className="stat-label">Calories</div>
          </div>
        </div>
        
        <div style={{ padding: '1.5rem', background: 'rgba(0,0,0,0.2)', borderRadius: '12px' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Info size={20} /> Description</h3>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>{activity.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ActivityDetail;
