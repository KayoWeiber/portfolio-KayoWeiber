import Header from "./components/Header";
import Hero from "./features/Hero";
import About from "./components/About";
import Services from "./components/Services";

function App() {
  return (
    <div className="min-h-screen bg-animate-gradient">
      <Header />
      <main className="pt-20">
        <Hero />
        <About />
        <Services />
        
        {/* Outras seções */}
      </main>
    </div>
  );
}

export default App;
