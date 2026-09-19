import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import DemoBooking from './DemoBooking.tsx'
import Phase1 from './Phase1.tsx'
import Phase2 from './Phase2.tsx'
import Phase3 from './Phase3.tsx'
import './phase3.css'
import './phase1.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <>{window.location.pathname.startsWith('/demo') ? <DemoBooking onBack={() => window.location.href='/'} onExplore={() => window.location.href='/'} /> : window.location.pathname.startsWith('/operations') ? <Phase3 /> : window.location.pathname.startsWith('/people') ? <Phase2 /> : window.location.pathname.startsWith('/app') ? <Phase1 /> : <App />}</>
  </StrictMode>,
)
