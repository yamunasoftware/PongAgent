import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './main/app.js'

// Render Root Element:
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
root.render(<App />);