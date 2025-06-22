import Header from "./components/Header";
import Hero from "./features/Hero";
import About from "./components/About";

function App() {
  return (
    <div className="min-h-screen bg-animate-gradient">
      <Header />
      <main className="pt-20">
        <Hero />
        <About />
        {/* Outras seções */}
      </main>
    </div>
  );
}

export default App;
