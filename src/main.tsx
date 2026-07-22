import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import ComfortMovingCaseStudy from './pages/ComfortMovingCaseStudy.tsx'
import ComfortMovingCrmCaseStudy from './pages/ComfortMovingCrmCaseStudy.tsx'
import ProposalPage from './pages/ProposalPage.tsx'
import WorkIndex from './pages/WorkIndex.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/work-index" element={<WorkIndex />} />
        <Route path="/case-studies/comfort-moving-chicago" element={<ComfortMovingCaseStudy />} />
        <Route path="/case-studies/comfort-moving-crm" element={<ComfortMovingCrmCaseStudy />} />
        <Route path="/proposals/umbrella-restoration" element={<ProposalPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
