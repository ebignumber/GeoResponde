
export function Report() {
  const containerStyle = {
    padding: '40px 20px',
    maxWidth: '800px',
    margin: '0 auto',
    flex: 1,
    color: '#e2e8f0',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  };

  const headerStyle = {
    textAlign: 'center' as const,
    marginBottom: '40px'
  };

  const titleStyle = {
    fontSize: '48px',
    fontWeight: 'bold',
    margin: '0 0 10px 0',
    color: '#f8fafc'
  };

  const subtitleStyle = {
    fontSize: '24px',
    color: '#94a3b8',
    margin: 0
  };

  const cardStyle = {
    backgroundColor: '#1e293b',
    border: '1px solid #334155',
    borderRadius: '12px',
    padding: '40px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
  };

  const pStyle = {
    fontSize: '18px',
    lineHeight: '1.6',
    color: '#cbd5e1',
    marginBottom: '32px'
  };

  const statusStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: '#334155',
    padding: '8px 16px',
    borderRadius: '20px',
    fontWeight: 'bold',
    color: '#f8fafc',
    marginBottom: '32px'
  };

  const listStyle = {
    paddingLeft: '24px',
    fontSize: '16px',
    color: '#94a3b8',
    lineHeight: '1.8'
  };

  return (
    <div style={containerStyle}>
      <header style={headerStyle}>
        <h1 style={titleStyle}>Report</h1>
        <p style={subtitleStyle}>Federated Reporting</p>
      </header>

      <div style={cardStyle}>
        <div style={statusStyle}>
          <span>🚧</span>
          <span>In Development</span>
        </div>

        <p style={pStyle}>
          GeoResponde will soon allow reports to be routed directly to the appropriate humanitarian organizations instead of creating another isolated reporting platform.
        </p>

        <h3 style={{ fontSize: '20px', color: '#f8fafc', marginBottom: '16px' }}>Possible future capabilities:</h3>
        <ul style={listStyle}>
          <li>Structured field reports</li>
          <li>Organization routing</li>
          <li>Validation workflows</li>
        </ul>
      </div>
    </div>
  );
}
