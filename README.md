# 🧠 Gerador de Imagens de IA

Projeto em React + TypeScript que utiliza a API da Hugging Face para gerar imagens com inteligência artificial a partir de prompts de texto. Permite ao usuário selecionar o modelo de geração, número de imagens e proporção.

## 📸 Preview

![image](https://github.com/user-attachments/assets/1a6f127c-bc50-4f67-b100-ecb054c6dff1)



---

## 🚀 Funcionalidades

- Campo de entrada para prompt com efeito de digitação
- Seleção de modelo (ex: `FLUX.1-dev`)
- Escolha da quantidade de imagens (ex: 1, 2, 3...)
- Seleção de proporção da imagem (1:1, 16:9, 9:16...)
- Galeria dinâmica com exibição das imagens geradas
- Design moderno com tema escuro e responsivo
- Download de imagens geradas

---

### 🛠️ Tecnologias Utilizadas

<div style="display: flex; gap: 20px; align-items: center;">

<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" height="40" alt="React"/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" height="40" alt="TypeScript"/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vite/vite-original.svg" height="40" alt="Vite"/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg" height="40" alt="Sass"/>

</div>

---

## 📂 Estrutura de Pastas

```
src/
├── components/
│   ├── Gallery/
│   ├── Header/
│   ├── PromptForm/
│   └── Sass/
│   └── App.tsx
├── favicon/
├── main.tsx
```

---

## 🔑 Como obter a Hugging Face API Key

Para que o gerador de imagens funcione corretamente, é necessário possuir uma chave de API da Hugging Face. Siga os passos abaixo:

### 1. Acesse o site da Hugging Face
👉 [https://huggingface.co](https://huggingface.co)

### 2. Crie uma conta ou faça login
- Clique em **"Sign Up"** para criar uma conta, ou
- Clique em **"Log In"** se já tiver uma conta.

### 3. Acesse a página de tokens
- Vá até seu perfil e clique em **"Settings"**.
- No menu lateral, selecione **"Access Tokens"**  
  ou acesse diretamente: [huggingface.co/settings/tokens](https://huggingface.co/settings/tokens)

### 4. Gere um novo token
- Clique em **"New token"**
- Dê um nome ao token (ex: `gerador-imagens`)
- Escolha o escopo **Read** (apenas leitura)
- Clique em **"Generate"**

⚠️ **Importante:** copie o token gerado imediatamente. Você não poderá vê-lo novamente.

### 5. Adicione o token no seu projeto
- Adicona aqui 👉 const API_KEY = "API Key";

---

## ▶️ Teste Agora

- Faça o download do código, configure sua API da Hugging Face e teste localmente o gerador de imagens com IA!


