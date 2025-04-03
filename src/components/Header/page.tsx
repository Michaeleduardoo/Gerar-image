import React, { useEffect, useState } from "react";

const Header: React.FC = () => {
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const theme = savedTheme === "dark" || (!savedTheme && systemPrefersDark);
    setIsDarkTheme(theme);
    document.body.classList.toggle("dark-theme", theme);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkTheme;
    setIsDarkTheme(newTheme);
    document.body.classList.toggle("dark-theme", newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
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
        <i className={`fa-solid ${isDarkTheme ? "fa-sun" : "fa-moon"}`}></i>
      </button>
    </header>
  );
};

export default Header;
