import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import Editor from './component/Editor';
import './App.css';

function App() {
  const [theme, setTheme] = useState('dark');
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div className="layout">
      <header>
        <h1>Architect Log</h1>
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--text)',
          }}
        >
          {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
        </button>
      </header>
      <main>
        <Editor />
        <div style={{ textAlign: 'right', marginTop: '1rem' }}>
          <button
            style={{
              padding: '0.6rem 1.2rem',
              borderRadius: '8px',
              background: 'var(--primary)',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Post
          </button>
        </div>
      </main>
    </div>
  );
}
export default App;
