function Header() {
  return (
    <header className="header">
      <div className="logo-wrapper">
        <div className="logo">
          <i className="fa-solid fa-wand-magic-sparkles"></i>
        </div>
        <h1>Gerador de imagens de IA</h1>
      </div>
      <button className="theme-toggle">
        <i className="fa-solid fa-moon"></i>
      </button>
    </header>
  );
}

export default Header;
