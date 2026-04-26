# Portfolio Pessoal - Kayo Weiber

Frontend do portfolio pessoal de Kayo Weiber, criado para apresentar projetos, stack tecnica, certificacoes e facilitar contato profissional.

Versao online: [https://www.kayoweiber.com.br/](https://www.kayoweiber.com.br/)

## Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- i18next / react-i18next
- React Router
- React Icons

## Estrutura

- `frontend/`: aplicacao Vite/React.
- `frontend/src/components/`: componentes de interface.
- `frontend/src/features/`: secoes principais, como Hero.
- `frontend/src/data/`: dados compartilhados de navegacao e tecnologias.
- `frontend/src/types/`: tipos compartilhados.
- `frontend/src/i18n/`: traducoes PT-BR e EN-US.
- `frontend/public/`: imagens, certificados e assets publicos.

## Como rodar

Na raiz do repositorio:

```bash
npm run dev
```

Ou diretamente no frontend:

```bash
cd frontend
npm install
npm run dev
```

## Variaveis de ambiente

Copie `frontend/.env.example` para `frontend/.env` quando quiser sobrescrever a URL da API de contato:

```bash
VITE_CONTACT_API_URL=...
```

Se a variavel nao for definida, o frontend usa a URL de producao como fallback.

## Scripts

Na raiz:

- `npm run dev`: inicia o Vite dentro de `frontend`.
- `npm run build`: executa o build do frontend.
- `npm run lint`: executa o ESLint.
- `npm run preview`: abre preview do build.
- `npm run deploy`: publica via `gh-pages`.

No diretorio `frontend`, os mesmos scripts existem no `package.json` local.

## Backend de contato

O formulario envia mensagens para uma API separada:
[portfolio-contact-backend](https://github.com/KayoWeiber/portfolio-contact-backend).

Para desenvolvimento local, rode o backend separado e defina:

```bash
VITE_CONTACT_API_URL=http://localhost:3001/api/contact
```

## Qualidade

Antes de publicar alteracoes, rode:

```bash
npm run lint
npm run build
```

## Contato

- Email: [caioveiber598@gmail.com](mailto:caioveiber598@gmail.com)
- LinkedIn: [linkedin.com/in/kayo-weiber-134067280](https://www.linkedin.com/in/kayo-weiber-134067280/)
