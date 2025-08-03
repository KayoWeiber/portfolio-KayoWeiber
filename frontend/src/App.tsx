import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/footer";
import Hero from "./features/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Portfolio from "./components/Portfolio";
import Contact from "./components/Contact";
import Courses from "./components/Courses";
import ScrollToHashElement from "./utils/ScrollToHashElement"; // Importe o novo componente

function App() {
  return (
    <Router>
      <ScrollToHashElement /> {/* Adicione o componente aqui */}
      <div className="min-h-screen bg-animate-gradient">
        <Header />
        <main className="pt-20">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  {/* Lembre-se que cada um desses componentes precisa ter um `id`
                      correspondente ao `href` em `navLinks`. Ex: <Hero id="home" /> */}
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
      </div>
    </Router>
  );
}

export default App;
