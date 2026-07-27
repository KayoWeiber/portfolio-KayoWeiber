import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Hero from "./features/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Portfolio from "./components/Portfolio";
import Contact from "./components/Contact";
import Courses from "./components/Courses";
import Terminal from "./components/Terminal";
import KonamiEasterEgg from "./components/KonamiEasterEgg";
import CustomCursor from "./components/CustomCursor";
import ScrollToHashElement from "./utils/ScrollToHashElement";
import { useKonamiCode } from "./hooks/useKonamiCode";

function App() {
  const { isActive: isKonamiActive, dismiss: dismissKonami } = useKonamiCode();

  return (
    <MotionConfig reducedMotion="user">
      <Router>
        <ScrollToHashElement />
        <div className="min-h-screen bg-animate-gradient">
          <Header />
          <main id="content" role="main" tabIndex={-1} className="pt-20">
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Hero />
                    <About />
                    <Services />
                    <Portfolio />
                    <Contact />
                  </>
                }
              />
              <Route path="/cursos" element={<Courses />} />
            </Routes>
          </main>
          <Footer />
          <Terminal />
          <CustomCursor />
          {isKonamiActive && <KonamiEasterEgg onDismiss={dismissKonami} />}
        </div>
      </Router>
    </MotionConfig>
  );
}

export default App;
