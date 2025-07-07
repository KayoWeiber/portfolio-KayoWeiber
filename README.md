# Portfólio Pessoal - Kayo Weiber

Este repositório contém o código-fonte do **frontend** do meu portfólio pessoal, criado com o objetivo de apresentar minhas habilidades como desenvolvedor, destacar projetos e facilitar o contato profissional.

O backend responsável pelo formulário de contato está em um [repositório separado](https://github.com/KayoWeiber/portfolio-contact-backend).

> **Status:** 🚧 Em constante evolução e melhorias.

🔗 **Acesse a versão online:** [https:www.kayoweiber.com.br/](https:www.kayoweiber.com.br/)

---

## 🚀 Tecnologias Utilizadas

- **Frontend:**
    - **React.js** com **TypeScript**
    - **Tailwind CSS** para responsividade, design e animações.
    - **Framer Motion** para animações fluidas.
    - **i18next** para tradução dinâmica (PT-BR / EN-US).
    - **React Icons** para a biblioteca de ícones.
    - **Vite** como ferramenta de build e desenvolvimento.
- **Backend:**
    - **Node.js** com **Express** para a API REST.
    - **Nodemailer** para o serviço de envio de e-mails.
    - **CORS** para gerenciamento de permissões de acesso.

---

## 🎯 Funcionalidades

- Layout moderno, limpo e totalmente responsivo.
- Troca de idiomas dinâmica entre Português e Inglês.
- Animações de entrada e interações ao rolar a página.
- *Scrollspy* na barra de navegação que destaca a seção ativa.
- Seção "Portfólio" com um carrossel interativo de projetos.
- Modal com detalhes do projeto, incluindo navegação por imagens.
- Formulário de contato funcional com backend próprio para envio de e-mail.

---

## 🧠 Aprendizados do Projeto

- Manipulação avançada de hooks do React (`useEffect`, `useState`, `useRef`).
- Construção de uma API RESTful com Node.js e Express.
- Integração entre frontend e backend, incluindo tratamento de CORS.
- Boas práticas de organização de componentes, tipagem e componentização.
- Gerenciamento de variáveis de ambiente para proteger dados sensíveis.
- Foco em acessibilidade, responsividade e performance.

---

## 📌 Como Rodar Localmente

Para rodar o projeto completo localmente, você precisará configurar e executar o **backend** (servidor) e o **frontend** (interface do usuário) em terminais separados.

### Parte 1: Configurando o Backend

O backend é responsável por receber os dados do formulário e enviar o e-mail.

**1. Clone o repositório do backend:**
```bash
git clone [https://github.com/KayoWeiber/portfolio-contact-backend.git](https://github.com/KayoWeiber/portfolio-contact-backend.git)
cd portfolio-contact-backend
```
**2. Instale as dependências:**
```bash
npm install
```
**3. Configure as variáveis de ambiente:**

Crie um arquivo .env na raiz do projeto portfolio-contact-backend e adicione as credenciais do seu serviço de e-mail (ex: Gmail, Mailgun).
```bash
EMAIL_USER= seuemail@gmail.com
EMAIL_PASS= sua senha de e-mail
EMAIL_TO= destinatario@exemplo.com
```
**4. Rode o servidor backend:**
```bash
node server.js
```
O servidor estará rodando em http://localhost:3001.

### Parte 2: Configurando o Frontend

Agora, em um novo terminal, configure a interface do usuário.

**1. Clone o repositório do frontend (este repositório):**
```bash
git clone [https://github.com/KayoWeiber/portfolio-KayoWeiber.git](https://github.com/KayoWeiber/portfolio-KayoWeiber.git)
cd portfolio-KayoWeiber
```

**2. Instale as dependências:**
```bash
npm install
```
**3. Aponte o frontend para o backend local:**

Para que o formulário de contato funcione localmente, você precisa alterar a URL da API no código do frontend.

Abra o arquivo onde a função fetch é chamada (ex: src/components/ContactForm.tsx).

Localize a linha que contém a URL da API de produção.

Altere de:
https://portfolio-contact-backend-no6y.onrender.com/api/contact

Para:
http://localhost:3001/api/contact

**4. Rode o servidor frontend:**
```bash
npm run dev
```
A aplicação React será iniciada, geralmente em http://localhost:5173. Agora o portfólio completo está rodando em sua máquina.
---


## 🤝 Como Contribuir

Feedbacks e contribuições são sempre bem-vindos! Sinta-se à vontade para abrir uma *issue* com sugestões ou um *pull request* com melhorias em qualquer um dos repositórios.

---

## 📬 Contato

- **Email:** [caioveiber598@gmail.com](mailto:caioveiber598@gmail.com)
- **LinkedIn:** [https://www.linkedin.com/in/kayo-weiber-134067280/](https://www.linkedin.com/in/kayo-weiber-134067280/)

---

Feito com ❤️ por **Kayo Weiber**.