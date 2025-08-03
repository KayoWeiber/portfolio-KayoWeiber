import { useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToHashElement = () => {
  const location = useLocation();

  // Memoizamos o valor do hash para evitar re-execuções desnecessárias.
  const hash = useMemo(() => location.hash.replace('#', ''), [location]);

  // Este efeito executa sempre que o hash na URL muda.
  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash);
      if (element) {
        // Usamos um pequeno timeout para garantir que o DOM foi atualizado
        // antes de tentarmos rolar.
        setTimeout(() => {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest',
          });
        }, 100);
      }
    }
  }, [hash]); // A dependência é o próprio hash.

  return null; // Este componente não renderiza nada na tela.
};

export default ScrollToHashElement;