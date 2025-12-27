import { createRoot } from 'react-dom/client'
//important to import index.css here for both bootstrap and TAILWINDCSS
import './index.css'
import App from './App.jsx'

import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './UserContext.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <UserProvider>
      <App />
    </UserProvider>
  </BrowserRouter>
    
)
