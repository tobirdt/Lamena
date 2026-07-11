import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ScrollManager } from './components/ScrollManager'
import { SmoothScroll } from './components/SmoothScroll'
import { privacySections, termsSections } from './data/legal'
import { HomePage } from './pages/HomePage'
import { LegalPage } from './pages/LegalPage'
import { NotFoundPage } from './pages/NotFoundPage'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <SmoothScroll />
      <ScrollManager />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/privacy"
          element={<LegalPage eyebrow="Privacy & Legal" title="Privacy Policy" sections={privacySections} />}
        />
        <Route
          path="/terms"
          element={<LegalPage eyebrow="Terms" title="Terms & Conditions" sections={termsSections} />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
