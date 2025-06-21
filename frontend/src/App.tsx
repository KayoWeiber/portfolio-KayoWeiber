import Header from "./components/Header";
import Hero from "./features/Hero";

function App() {
  return (
    <div>
      <Header />
      {/* Outras seções do site */}
      <main className="pt-20">
        {/* Conteúdo principal aqui */}
         <Hero />
      </main>
    </div>
  );
}

export default App;
