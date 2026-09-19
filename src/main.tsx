import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Phase1 from './Phase1.tsx'
import './phase1.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <>{window.location.pathname.startsWith('/app') ? <Phase1 /> : <App />}</>
  </StrictMode>,
)
