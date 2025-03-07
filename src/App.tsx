import { Routes, Route } from 'react-router-dom';
import { HomePage } from "@/pages/home/HomePage.tsx";
import AproposPage from "@/pages/footer/AproposPage.tsx";
import ContactPage from "@/pages/footer/ContactPage.tsx";
import MentionsLegalesPage from "@/pages/footer/MentionsLegalePage.tsx";
import CvConstructPage from "@/pages/cv/CvConstructPage.tsx";




function App() {
  return (
      <>
          <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/apropos" element={<AproposPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/mentions-legales" element={<MentionsLegalesPage />} />
              <Route path="/cv" element={<CvConstructPage />} />
          </Routes>
      </>
  )
}

export default App;
