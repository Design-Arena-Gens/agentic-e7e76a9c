'use client'

import { useState } from 'react'

export default function Home() {
  const [structure, setStructure] = useState('stack')
  const [items, setItems] = useState([])
  const [inputValue, setInputValue] = useState('')

  const push = () => {
    if (inputValue.trim()) {
      setItems([...items, inputValue])
      setInputValue('')
    }
  }

  const pop = () => {
    if (items.length > 0) {
      setItems(items.slice(0, -1))
    }
  }

  const enqueue = () => {
    if (inputValue.trim()) {
      setItems([...items, inputValue])
      setInputValue('')
    }
  }

  const dequeue = () => {
    if (items.length > 0) {
      setItems(items.slice(1))
    }
  }

  const clear = () => {
    setItems([])
    setInputValue('')
  }

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>DS - Data Structures Visualizer</h1>
        <p style={styles.subtitle}>Visualize and interact with common data structures</p>
      </header>

      <div style={styles.controls}>
        <div style={styles.selectGroup}>
          <label style={styles.label}>Select Structure:</label>
          <select
            value={structure}
            onChange={(e) => { setStructure(e.target.value); clear(); }}
            style={styles.select}
          >
            <option value="stack">Stack (LIFO)</option>
            <option value="queue">Queue (FIFO)</option>
            <option value="array">Array</option>
          </select>
        </div>

        <div style={styles.inputGroup}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                structure === 'queue' ? enqueue() : push()
              }
            }}
            placeholder="Enter value..."
            style={styles.input}
          />

          <div style={styles.buttonGroup}>
            {structure === 'stack' && (
              <>
                <button onClick={push} style={styles.button}>Push</button>
                <button onClick={pop} style={{...styles.button, ...styles.buttonDanger}}>Pop</button>
              </>
            )}
            {structure === 'queue' && (
              <>
                <button onClick={enqueue} style={styles.button}>Enqueue</button>
                <button onClick={dequeue} style={{...styles.button, ...styles.buttonDanger}}>Dequeue</button>
              </>
            )}
            {structure === 'array' && (
              <>
                <button onClick={push} style={styles.button}>Add</button>
                <button onClick={pop} style={{...styles.button, ...styles.buttonDanger}}>Remove</button>
              </>
            )}
            <button onClick={clear} style={{...styles.button, ...styles.buttonSecondary}}>Clear</button>
          </div>
        </div>
      </div>

      <div style={styles.visualization}>
        <div style={styles.structureInfo}>
          <h3 style={styles.structureName}>
            {structure === 'stack' && 'Stack (LIFO - Last In First Out)'}
            {structure === 'queue' && 'Queue (FIFO - First In First Out)'}
            {structure === 'array' && 'Array'}
          </h3>
          <p style={styles.itemCount}>Items: {items.length}</p>
        </div>

        <div style={styles.itemsContainer}>
          {items.length === 0 ? (
            <div style={styles.emptyState}>No items yet. Add some!</div>
          ) : (
            <div style={{
              ...styles.itemsList,
              flexDirection: structure === 'stack' ? 'column-reverse' : 'row'
            }}>
              {items.map((item, index) => (
                <div
                  key={index}
                  style={{
                    ...styles.item,
                    ...(structure === 'stack' && index === items.length - 1 ? styles.itemHighlight : {}),
                    ...(structure === 'queue' && index === 0 ? styles.itemHighlight : {})
                  }}
                >
                  <span style={styles.itemIndex}>{index}</span>
                  <span style={styles.itemValue}>{item}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div style={styles.operationHint}>
            {structure === 'stack' && '← Top (next pop)'}
            {structure === 'queue' && 'Front (next dequeue) →'}
          </div>
        )}
      </div>
    </div>
  )
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '20px',
  },
  header: {
    textAlign: 'center',
    color: 'white',
    marginBottom: '40px',
  },
  title: {
    fontSize: '3rem',
    margin: '0 0 10px 0',
    fontWeight: '700',
  },
  subtitle: {
    fontSize: '1.2rem',
    margin: 0,
    opacity: 0.9,
  },
  controls: {
    maxWidth: '800px',
    margin: '0 auto 30px',
    background: 'white',
    borderRadius: '12px',
    padding: '25px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
  },
  selectGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontWeight: '600',
    color: '#333',
  },
  select: {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    borderRadius: '8px',
    border: '2px solid #e0e0e0',
    outline: 'none',
    cursor: 'pointer',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  input: {
    padding: '12px',
    fontSize: '16px',
    borderRadius: '8px',
    border: '2px solid #e0e0e0',
    outline: 'none',
  },
  buttonGroup: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
  },
  button: {
    flex: 1,
    minWidth: '100px',
    padding: '12px 20px',
    fontSize: '16px',
    fontWeight: '600',
    color: 'white',
    background: '#667eea',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  buttonDanger: {
    background: '#e74c3c',
  },
  buttonSecondary: {
    background: '#95a5a6',
  },
  visualization: {
    maxWidth: '800px',
    margin: '0 auto',
    background: 'white',
    borderRadius: '12px',
    padding: '25px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
    minHeight: '300px',
  },
  structureInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    paddingBottom: '15px',
    borderBottom: '2px solid #e0e0e0',
  },
  structureName: {
    margin: 0,
    color: '#333',
    fontSize: '1.5rem',
  },
  itemCount: {
    margin: 0,
    color: '#667eea',
    fontSize: '1.2rem',
    fontWeight: '600',
  },
  itemsContainer: {
    minHeight: '200px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyState: {
    color: '#999',
    fontSize: '1.2rem',
    textAlign: 'center',
  },
  itemsList: {
    display: 'flex',
    gap: '12px',
    padding: '20px',
    flexWrap: 'wrap',
    width: '100%',
  },
  item: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    padding: '15px 20px',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '5px',
    minWidth: '80px',
    boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
    transition: 'transform 0.3s ease',
  },
  itemHighlight: {
    boxShadow: '0 6px 20px rgba(231, 76, 60, 0.5)',
    border: '3px solid #e74c3c',
  },
  itemIndex: {
    fontSize: '12px',
    opacity: 0.8,
    fontWeight: '600',
  },
  itemValue: {
    fontSize: '18px',
    fontWeight: '700',
  },
  operationHint: {
    textAlign: 'center',
    color: '#e74c3c',
    fontWeight: '600',
    marginTop: '15px',
    fontSize: '14px',
  },
}
