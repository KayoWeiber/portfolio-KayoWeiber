# Portfolio - Frontend

Aplicacao React + TypeScript criada com Vite para o portfolio pessoal de Kayo Weiber.

## Requisitos

- Node.js 18 ou superior
- npm

## Desenvolvimento

```bash
npm install
npm run dev
```

O Vite informara a URL local, normalmente `http://localhost:5173`.

## Build e preview

```bash
npm run build
npm run preview
```

## Ambiente

Crie um `.env` a partir de `.env.example` para customizar a API de contato:

```bash
VITE_CONTACT_API_URL=http://localhost:3001/api/contact
```

## Scripts

- `npm run dev`: servidor de desenvolvimento.
- `npm run build`: checagem TypeScript e build de producao.
- `npm run lint`: ESLint.
- `npm run preview`: preview local da pasta `dist`.
- `npm run deploy`: publica `dist` com `gh-pages`.

## Organizacao

- `src/components`: componentes reutilizaveis e secoes da interface.
- `src/features`: experiencias principais da pagina inicial.
- `src/hooks`: hooks customizados.
- `src/data`: dados compartilhados da UI.
- `src/types`: contratos TypeScript compartilhados.
- `src/i18n`: traducoes e configuracao do i18next.
- `public`: imagens de projetos, certificados, favicon e CNAME.

## Checklist antes do deploy

```bash
npm run lint
npm run build
```
