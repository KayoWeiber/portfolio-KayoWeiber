import Header from "./components/Header";
import Hero from "./features/Hero";

function App() {
  return (
    <div className="min-h-screen bg-animate-gradient">
  <Header />
  <main className="pt-20">
    <Hero />
    {/* Outras seções */}
  </main>
</div>

  );
}

export default App;
