import React, { useState } from 'react';

function App() {
  // State for counter
  const [count, setCount] = useState(0);
  
  // State for text input
  const [text, setText] = useState('');

  // Counter functions
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const resetCounter = () => setCount(0);

  // Text input function
  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  // Clear text function
  const clearText = () => setText('');

  // Inline styles (will work regardless of Tailwind)
  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #eff6ff 0%, #e0e7ff 100%)',
      padding: '2rem',
      fontFamily: 'Arial, sans-serif'
    },
    maxWidth: {
      maxWidth: '42rem',
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      gap: '2rem'
    },
    header: {
      textAlign: 'center'
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      color: '#1f2937',
      marginBottom: '0.5rem'
    },
    subtitle: {
      color: '#6b7280'
    },
    card: {
      background: 'white',
      borderRadius: '0.75rem',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      padding: '1.5rem',
      border: '1px solid #e5e7eb'
    },
    cardTitle: {
      fontSize: '1.5rem',
      fontWeight: '600',
      color: '#1f2937',
      marginBottom: '1rem',
      display: 'flex',
      alignItems: 'center'
    },
    counterDisplay: {
      textAlign: 'center',
      marginBottom: '1rem'
    },
    counterNumber: {
      fontSize: '4rem',
      fontWeight: 'bold',
      color: '#4f46e5',
      marginBottom: '1rem'
    },
    buttonGroup: {
      display: 'flex',
      justifyContent: 'center',
      gap: '0.75rem',
      flexWrap: 'wrap'
    },
    button: {
      padding: '0.5rem 1.5rem',
      borderRadius: '0.5rem',
      fontWeight: '500',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.2s',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
    },
    decreaseBtn: {
      backgroundColor: '#ef4444',
      color: 'white'
    },
    resetBtn: {
      backgroundColor: '#6b7280',
      color: 'white'
    },
    increaseBtn: {
      backgroundColor: '#10b981',
      color: 'white'
    },
    clearBtn: {
      backgroundColor: '#f97316',
      color: 'white'
    },
    inputGroup: {
      display: 'flex',
      gap: '0.5rem',
      marginBottom: '1rem'
    },
    input: {
      flex: 1,
      padding: '0.5rem 1rem',
      border: '1px solid #d1d5db',
      borderRadius: '0.5rem',
      fontSize: '1rem',
      outline: 'none'
    },
    previewBox: {
      background: '#f9fafb',
      border: '1px solid #e5e7eb',
      borderRadius: '0.5rem',
      padding: '1rem',
      minHeight: '4rem',
      marginBottom: '1rem'
    },
    previewLabel: {
      fontSize: '0.875rem',
      color: '#6b7280',
      marginBottom: '0.5rem'
    },
    previewText: {
      fontSize: '1.125rem',
      color: '#1f2937'
    },
    placeholder: {
      fontStyle: 'italic',
      color: '#9ca3af'
    },
    charCount: {
      fontSize: '0.875rem',
      color: '#6b7280'
    },
    stateMonitor: {
      background: 'linear-gradient(135deg, #faf5ff 0%, #fdf2f8 100%)',
      border: '1px solid #e9d5ff',
      borderRadius: '0.75rem',
      padding: '1.5rem',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
    },
    stateHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '1rem'
    },
    stateTitle: {
      fontSize: '1.25rem',
      fontWeight: 'bold',
      color: '#7c3aed',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    liveBadge: {
      background: '#dcfce7',
      color: '#166534',
      padding: '0.25rem 0.75rem',
      borderRadius: '9999px',
      fontSize: '0.75rem',
      fontWeight: '600'
    },
    stateGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '1rem'
    },
    stateCard: {
      background: 'white',
      borderRadius: '0.5rem',
      padding: '1rem',
      border: '1px solid #e9d5ff',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
    },
    stateCardHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '0.5rem'
    },
    stateLabel: {
      fontSize: '0.875rem',
      fontWeight: '500',
      color: '#6b7280'
    },
    pulse: {
      width: '0.5rem',
      height: '0.5rem',
      borderRadius: '50%',
      animation: 'pulse 2s infinite'
    },
    counterValue: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: '#4f46e5',
      marginBottom: '0.25rem'
    },
    textValue: {
      fontSize: '1.125rem',
      fontWeight: '600',
      color: '#10b981',
      marginBottom: '0.25rem'
    },
    stateInfo: {
      fontSize: '0.75rem',
      color: '#6b7280',
      marginBottom: '0.5rem'
    },
    tags: {
      display: 'flex',
      gap: '0.5rem',
      fontSize: '0.75rem'
    },
    tag: {
      padding: '0.25rem 0.5rem',
      borderRadius: '0.25rem'
    },
    blueTag: {
      background: '#dbeafe',
      color: '#1e40af'
    },
    greenTag: {
      background: '#dcfce7',
      color: '#166534'
    },
    '@media (max-width: 768px)': {
      stateGrid: {
        gridTemplateColumns: '1fr'
      }
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.maxWidth}>
        
        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.title}>
            React State Management Demo
          </h1>
          <h1>By Code Storm 👨‍💻⚡</h1>
          <p style={styles.subtitle}>
            Counter and Live Text Preview with useState
          </p>
        </div>

        {/* Counter Section */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>
            🔢 Counter
          </h2>
          
          <div style={styles.counterDisplay}>
            <div style={styles.counterNumber}>
              {count}
            </div>
            
            <div style={styles.buttonGroup}>
              <button
                onClick={decrement}
                style={{...styles.button, ...styles.decreaseBtn}}
                onMouseOver={(e) => e.target.style.backgroundColor = '#dc2626'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#ef4444'}
              >
                Decrease (-1)
              </button>
              
              <button
                onClick={resetCounter}
                style={{...styles.button, ...styles.resetBtn}}
                onMouseOver={(e) => e.target.style.backgroundColor = '#4b5563'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#6b7280'}
              >
                Reset
              </button>
              
              <button
                onClick={increment}
                style={{...styles.button, ...styles.increaseBtn}}
                onMouseOver={(e) => e.target.style.backgroundColor = '#059669'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#10b981'}
              >
                Increase (+1)
              </button>
            </div>
          </div>
        </div>

        {/* Live Text Preview Section */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>
            ✏️ Live Text Preview
          </h2>
          
          <div>
            <div style={styles.inputGroup}>
              <input
                type="text"
                value={text}
                onChange={handleTextChange}
                placeholder="Type something here..."
                style={styles.input}
                onFocus={(e) => e.target.style.borderColor = '#4f46e5'}
                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
              />
              
              <button
                onClick={clearText}
                style={{...styles.button, ...styles.clearBtn}}
                onMouseOver={(e) => e.target.style.backgroundColor = '#ea580c'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#f97316'}
              >
                Clear
              </button>
            </div>
            
            <div style={styles.previewBox}>
              <p style={styles.previewLabel}>Live Preview:</p>
              <p style={styles.previewText}>
                {text || <span style={styles.placeholder}>Start typing to see preview...</span>}
              </p>
            </div>
            
            <div style={styles.charCount}>
              Character count: {text.length}
            </div>
          </div>
        </div>

        {/* Enhanced State Information */}
        <div style={styles.stateMonitor}>
          <div style={styles.stateHeader}>
            <h3 style={styles.stateTitle}>
              🧠 React State Monitor
            </h3>
            <div style={styles.liveBadge}>
              Live Updates
            </div>
          </div>
          
          <div style={window.innerWidth > 768 ? styles.stateGrid : {display: 'flex', flexDirection: 'column', gap: '1rem'}}>
            {/* Counter State Card */}
            <div style={styles.stateCard}>
              <div style={styles.stateCardHeader}>
                <span style={styles.stateLabel}>Counter State</span>
                <div style={{...styles.pulse, backgroundColor: '#3b82f6'}}></div>
              </div>
              <div style={styles.counterValue}>{count}</div>
              <div style={styles.stateInfo}>
                Type: {typeof count} | Value: {count}
              </div>
              <div style={{...styles.stateInfo, color: '#9ca3af'}}>
                {count === 0 ? "Initial state" : count > 0 ? "Positive value" : "Negative value"}
              </div>
            </div>
            
            {/* Text State Card */}
            <div style={styles.stateCard}>
              <div style={styles.stateCardHeader}>
                <span style={styles.stateLabel}>Text State</span>
                <div style={{...styles.pulse, backgroundColor: '#10b981'}}></div>
              </div>
              <div style={styles.textValue}>
                {text ? `"${text}"` : "Empty string"}
              </div>
              <div style={styles.stateInfo}>
                Type: {typeof text} | Length: {text.length}
              </div>
              <div style={styles.tags}>
                <span style={{...styles.tag, ...styles.blueTag}}>
                  {text.length} chars
                </span>
                <span style={{...styles.tag, ...styles.greenTag}}>
                  {text.trim().split(/\s+/).filter(word => word).length} words
                </span>
              </div>
            </div>
          </div>
        </div>
        
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: .5;
          }
        }
      `}</style>
    </div>
  );
}

export default App;