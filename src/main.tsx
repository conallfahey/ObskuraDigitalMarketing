import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import ComfortMovingCaseStudy from './pages/ComfortMovingCaseStudy.tsx'
import ProposalPage from './pages/ProposalPage.tsx'
import ThankYouPage from './pages/ThankYouPage.tsx'
import WorkIndex from './pages/WorkIndex.tsx'
import TeamPage from './pages/TeamPage.tsx'
import SiteNav from './components/SiteNav.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <SiteNav />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/work-index" element={<WorkIndex />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/case-studies/comfort-moving-chicago" element={<ComfortMovingCaseStudy />} />
        <Route path="/case-studies/comfort-moving-crm" element={<Navigate to="/case-studies/comfort-moving-chicago#crm" replace />} />
        <Route path="/proposals/umbrella-restoration" element={<ProposalPage />} />
        <Route path="/thank-you" element={<ThankYouPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
