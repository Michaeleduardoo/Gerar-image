import React, { useEffect } from "react";

const Header: React.FC = () => {
  useEffect(() => {
    const themeToggle = document.querySelector(".theme-toggle");
    if (!themeToggle) return; // Verifica se o botão existe

    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    const isDarkTheme =
      savedTheme === "dark" || (!savedTheme && systemPrefersDark);

    document.body.classList.toggle("dark-theme", isDarkTheme);

    // Garantir que o ícone seja atualizado corretamente
    const icon = themeToggle.querySelector("i");
    if (icon) {
      icon.className = isDarkTheme ? "fa-solid fa-sun" : "fa-solid fa-moon";
    }
  }, []);

  // Função para alternar entre os temas
  const toggleTheme = () => {
    const themeToggle = document.querySelector(".theme-toggle");
    if (!themeToggle) return; // Verifica se o botão existe

    const isDarkTheme = document.body.classList.toggle("dark-theme");
    localStorage.setItem("theme", isDarkTheme ? "dark" : "light");

    const icon = themeToggle.querySelector("i");
    if (icon) {
      icon.className = isDarkTheme ? "fa-solid fa-sun" : "fa-solid fa-moon";
    }
  };

  return (
    <header className="header">
      <div className="logo-wrapper">
        <div className="logo">
          <i className="fa-solid fa-wand-magic-sparkles"></i>
        </div>
        <h1>Gerador de imagens de IA</h1>
      </div>
      <button className="theme-toggle" onClick={toggleTheme}>
        <i className="fa-solid fa-moon"></i>
      </button>
    </header>
  );
};

export default Header;
