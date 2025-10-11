# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    # Portfolio — Frontend

    Este repositório contém o frontend do portfolio pessoal de Kayo Weiber, construído com React + TypeScript e empacotado com Vite.

    Resumo rápido
    - Framework: React 19 + TypeScript
    - Bundler/dev server: Vite
    - Estilização: Tailwind CSS
    - Internacionalização: i18next (pt-BR / en-US)

    Este README descreve como rodar o projeto localmente, scripts disponíveis, orientação para build e deploy, estrutura do projeto e notas úteis para contribuição.

    ## Requisitos
    - Node.js (recomendado 18.x ou superior)
    - npm (ou pnpm/yarn — este README usa npm nos exemplos)

    ## Scripts úteis (extraído de `package.json`)
    - npm run dev — Inicia o servidor de desenvolvimento (Vite) com HMR.
    - npm run build — Roda o TypeScript build e gera os artefatos do Vite em `dist`.
    - npm run preview — Faz o preview da pasta `dist` localmente usando o servidor do Vite.
    - npm run lint — Executa o ESLint em todo o projeto.
    - npm run predeploy — Executa `build` antes do deploy (hook local configurado).
    - npm run deploy — Publica a pasta `dist` no GitHub Pages utilizando `gh-pages`.

    Exemplo rápido para desenvolvimento

    1. Instale dependências:

    ```bash
    npm install
    ```

    2. Rode o servidor de desenvolvimento:

    ```bash
    npm run dev
    ```

    Abra http://localhost:5173 (ou a porta mostrada no terminal).

    ## Build e Deploy

    Gerar build de produção:

    ```bash
    npm run build
    ```

    Verificar o resultado localmente:

    ```bash
    npm run preview
    ```

    Deploy para GitHub Pages (já configurado no `package.json`):

    ```bash
    npm run deploy
    ```

    Observação: o script `deploy` utiliza a dependência `gh-pages` e publica o conteúdo de `dist` na branch `gh-pages` do repositório. Certifique-se de que o campo `homepage` no `package.json` está correto (ex.: "https://www.kayoweiber.com.br").

    ## Variáveis de ambiente

    Atualmente não há arquivo `.env` obrigatório no repositório, mas se você usar serviços (ex.: EmailJS) no envio de formulários, crie um `.env` local com as chaves necessárias e não o comite.

    Sugestão de variáveis (exemplos — ajuste conforme a sua conta):

    - VITE_EMAILJS_SERVICE_ID=
    - VITE_EMAILJS_TEMPLATE_ID=
    - VITE_EMAILJS_PUBLIC_KEY=

    No código, variáveis com prefixo `VITE_` ficam disponíveis via `import.meta.env.VITE_*`.

    ## Estrutura do projeto

    Principais arquivos e diretórios:

    - `index.html` — entrada HTML do Vite.
    - `src/main.tsx` — ponto de entrada React.
    - `src/App.tsx` — componente raiz do aplicativo.
    - `src/index.css` — estilos globais (Tailwind + personalizações).
    - `src/components/` — componentes reutilizáveis (Header, Footer, Cards, Modais, etc.).
    - `src/features/` — seções específicas como `Hero`.
    - `src/hooks/` — hooks customizados (ex.: `useTypingEffect.ts`).
    - `src/i18n/` — arquivos de tradução (`ptBR.json`, `enUS.json`) e configuração.
    - `src/utils/` — utilitários (ex.: `ScrollToHashElement.tsx`).

    Pontos notáveis:
    - O projeto tem suporte a internacionalização via `i18next`.
    - Tailwind é configurado via `tailwind.config.js` e `postcss`.

    ## Dependências principais

    - react, react-dom
    - typescript
    - vite, @vitejs/plugin-react
    - tailwindcss, postcss, autoprefixer
    - i18next, react-i18next
    - framer-motion (animações)
    - react-router-dom (se navegação for necessária)

    Consulte `package.json` para a lista completa de dependências e versões.

    ## Linting e qualidade

    O projeto inclui ESLint. Execute:

    ```bash
    npm run lint
    ```

    Recomenda-se configurar seu editor (VS Code) para rodar ESLint e formatação automática ao salvar. Se desejar, adicione regras específicas ao `eslint.config.js` ou expanda a configuração para checagem tipo-aware (TypeScript) seguindo a seção original deste template.

    ## Internacionalização (i18n)

    As traduções estão em `src/i18n/ptBR.json` e `src/i18n/enUS.json`. A configuração de i18next está em `src/i18n/index.ts`.

    Como adicionar uma nova chave de tradução:

    1. Adicione a chave ao(s) arquivo(s) JSON de idioma.
    2. Use o hook `useTranslation()` do `react-i18next` dentro do componente.

    ## Como contribuir

    1. Fork o repositório e crie uma branch a partir de `feature-melhorias` ou `main`.
    2. Abra um Pull Request descrevendo a alteração com screenshots quando aplicável.
    3. Mantenha commits pequenos e com mensagens claras.

    Sugestões de contribuição de baixo risco:
    - Adicionar testes unitários básicos (Jest/Vitest) para componentes principais.
    - Automatizar lint e build em CI (GitHub Actions).
    - Adicionar checks de acessibilidade (axe-core) e Lighthouse.

    ## Notas finais e dicas

    - Para rodar com outro package manager (pnpm/yarn), use os comandos equivalentes (`pnpm install`, `pnpm dev`, etc.).
    - Se estiver usando Windows e problemas com scripts aparecem, verifique se as variáveis de ambiente e caminhos estão corretos.
    - Para alterar a porta do Vite, exporte `PORT` ou passe `--port` para o script `dev`.

    ## Contato

    Autor: Kayo Weiber — https://www.kayoweiber.com.br

    Licença: este repositório segue a licença padrão do projeto (adicione LICENSE se desejar).
