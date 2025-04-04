import React from "react";

interface HeaderProps {
  theme: string;
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => {
  return (
    <header className="header">
      <div className="logo-wrapper">
        <div className="logo">
          <i className="fa-solid fa-wand-magic-sparkles"></i>
        </div>
        <h1>Gerador de imagens de IA</h1>
      </div>
      <button className="theme-toggle" onClick={toggleTheme}>
        <i
          className={`fa-solid ${theme === "dark" ? "fa-sun" : "fa-moon"}`}
        ></i>
      </button>
    </header>
  );
};

export default Header;
