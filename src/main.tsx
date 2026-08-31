import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'

const redirectPath = new URLSearchParams(window.location.search).get('redirect');
if (redirectPath && redirectPath.startsWith('/')) {
  const appBase = '/portfolio';
  window.history.replaceState(null, '', `${appBase}${redirectPath}`);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename="/portfolio">
      <App/>
    </BrowserRouter>
  </StrictMode>,
)
