// Import React and ReactDOM libraries
import React from 'react';
import ReactDOM from 'react-dom/client'; // For React 18+

// Import your main app component
import App from './App';

// Import the styles (CSS or SCSS)
import './index.css'; // If you're using Tailwind CSS or another CSS framework

// Create a root element in the DOM
const root = document.getElementById('root');

// Render your React app to the root DOM node
if (root) {
  const reactRoot = ReactDOM.createRoot(root);
  reactRoot.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

