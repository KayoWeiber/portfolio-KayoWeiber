import Header from "./components/Header";
import Hero from "./features/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Portfolio from "./components/Portfolio";
import Contact from "./components/Contact";

function App() {
  return (
    <div className="min-h-screen bg-animate-gradient">
      <Header />
      <main className="pt-20">
        <Hero />
        <About />
        <Services />
        <Portfolio />
        <Contact />
        
        {/* Outras seções */}
      </main>
    </div>
  );
}

export default App;
