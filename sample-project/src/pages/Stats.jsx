import React, { useContext, useEffect, useMemo } from 'react';
import { DatasetContext } from '../context/DatasetContext';
import { BarChart3, Activity, Clock, Flame } from 'lucide-react';

const Stats = () => {
  const { state, fetchDataset } = useContext(DatasetContext);

  useEffect(() => {
    fetchDataset();
  }, [fetchDataset]);

  // Use the 'reduce' method to calculate statistics as per requirements
  const stats = useMemo(() => {
    if (!state.data || state.data.length === 0) return null;

    const initialStats = { totalDuration: 0, totalCalories: 0, count: 0, types: {} };
    
    return state.data.reduce((acc, curr) => {
      acc.totalDuration += (Number(curr.duration) || 0);
      acc.totalCalories += (Number(curr.calories) || 0);
      acc.count += 1;
      
      const type = curr.type || 'Unknown';
      acc.types[type] = (acc.types[type] || 0) + 1;
      
      return acc;
    }, initialStats);
  }, [state.data]);

  if (state.loading) return <div className="spinner"></div>;

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1>Dataset Statistics</h1>
        <p>Aggregate metrics computed dynamically using reduce.</p>
      </div>

      {!stats ? (
        <div className="glass-card" style={{ textAlign: 'center' }}>
          <p>No data available to calculate statistics.</p>
        </div>
      ) : (
        <>
          <div className="stats-grid">
            <div className="glass-card stat-card" style={{ background: 'rgba(59, 130, 246, 0.1)' }}>
              <Activity size={40} style={{ margin: '0 auto 1rem', color: 'var(--accent-primary)' }} />
              <div className="stat-value">{stats.count}</div>
              <div className="stat-label">Total Activities</div>
            </div>
            
            <div className="glass-card stat-card" style={{ background: 'rgba(139, 92, 246, 0.1)' }}>
              <Clock size={40} style={{ margin: '0 auto 1rem', color: 'var(--accent-secondary)' }} />
              <div className="stat-value" style={{ backgroundImage: 'linear-gradient(to right, #8b5cf6, #d946ef)' }}>
                {stats.totalDuration}
              </div>
              <div className="stat-label">Total Minutes</div>
            </div>
            
            <div className="glass-card stat-card" style={{ background: 'rgba(239, 68, 68, 0.1)' }}>
              <Flame size={40} style={{ margin: '0 auto 1rem', color: '#ef4444' }} />
              <div className="stat-value" style={{ backgroundImage: 'linear-gradient(to right, #ef4444, #f97316)' }}>
                {stats.totalCalories}
              </div>
              <div className="stat-label">Total Calories</div>
            </div>
          </div>

          <div className="glass-card" style={{ marginTop: '2rem' }}>
            <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <BarChart3 size={24} color="var(--accent-primary)" /> Activity Types Distribution
            </h2>
            <div className="grid">
              {Object.entries(stats.types).map(([type, count]) => (
                <div key={type} style={{ padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '1.1rem', fontWeight: '500' }}>{type}</span>
                  <span className="badge" style={{ fontSize: '1.1rem' }}>{count}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Stats;
