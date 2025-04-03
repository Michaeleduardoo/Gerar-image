import React, { useEffect, useRef, useState } from "react";

const API_KEY = "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";

const examplePrompts: string[] = [
  "Um estádio de futebol lotado, com torcedores vibrando e fogos de artifício no céu",
  "Um aquário gigante com tubarões e raias nadando",
  "Um jogo de tabuleiro mágico onde as peças se movem sozinhas",
  "Um país tropical com praias paradisíacas e coqueiros balançando ao vento",
  "Um castelo de gelo brilhando sob a luz da lua cheia",
  "Uma feira de invenções com robôs e máquinas voadoras em exposição",
  "Um trem a vapor antigo atravessando montanhas cobertas de neve",
  "Uma cidade submersa com ruínas de uma civilização perdida",
  "Um laboratório futurista onde cientistas criam novas formas de vida",
  "Uma cidade suspensa no céu, com pontes ligando torres flutuantes",
  "Uma praia cósmica com areia brilhante e uma aurora no céu noturno",
  "Um mercado medieval com tendas coloridas e artistas de rua",
  "Uma cidade cyberpunk com letreiros neon e carros voadores à noite",
  "Uma floresta de bambu tranquila com um templo antigo escondido",
  "Uma tartaruga gigante carregando uma vila em suas costas no oceano",
];

const getImageDimensions = (aspectRatio: string, baseSize = 512) => {
  const [width, height] = aspectRatio.split("/").map(Number);
  const scaleFactor = baseSize / Math.sqrt(width * height);
  let calculatedWidth = Math.round(width * scaleFactor);
  let calculatedHeight = Math.round(height * scaleFactor);
  calculatedWidth = Math.floor(calculatedWidth / 16) * 16;
  calculatedHeight = Math.floor(calculatedHeight / 16) * 16;
  return { width: calculatedWidth, height: calculatedHeight };
};

const App: React.FC = () => {
  const [theme, setTheme] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [imageCount, setImageCount] = useState(1);
  const [aspectRatio, setAspectRatio] = useState("1/1");
  const [promptText, setPromptText] = useState("");
  const [gallery, setGallery] = useState<string[]>([]);
  const [loadingCount, setLoadingCount] = useState<number>(0);

  const promptInputRef = useRef<HTMLTextAreaElement>(null);
  const promptBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const isDarkTheme =
      savedTheme === "dark" || (!savedTheme && systemPrefersDark);
    setTheme(isDarkTheme ? "dark" : "light");
    document.body.classList.toggle("dark-theme", isDarkTheme);
  }, []);

  const toggleTheme = () => {
    const isDark = !document.body.classList.contains("dark-theme");
    document.body.classList.toggle("dark-theme", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
    setTheme(isDark ? "dark" : "light");
  };

  const updateImageCard = (index: number, imageUrl: string) => {
    setGallery((prev) => {
      const updated = [...prev];
      updated[index] = imageUrl;
      return updated;
    });
  };

  const generateImages = async (
    model: string,
    count: number,
    ratio: string,
    prompt: string
  ) => {
    const MODEL_URL = `https://api-inference.huggingface.co/models/${model}`;
    const { width, height } = getImageDimensions(ratio);
    const promises = Array.from({ length: count }, async (_, i) => {
      try {
        const response = await fetch(MODEL_URL, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
            "x-use-cache": "false",
          },
          body: JSON.stringify({
            inputs: prompt,
            parameters: { width, height },
          }),
        });
        if (!response.ok) throw new Error((await response.json())?.error);
        const blob = await response.blob();
        updateImageCard(i, URL.createObjectURL(blob));
      } catch (error) {
        console.error(error);
        updateImageCard(i, "error");
      }
    });
    await Promise.allSettled(promises);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedPrompt = promptText.trim();
    if (!selectedModel || !trimmedPrompt || !aspectRatio || !imageCount) return;
    setGallery(Array(imageCount).fill("loading"));
    setLoadingCount(imageCount);
    generateImages(selectedModel, imageCount, aspectRatio, trimmedPrompt);
  };

  const handleRandomPrompt = () => {
    const prompt =
      examplePrompts[Math.floor(Math.random() * examplePrompts.length)];
    setPromptText("");
    if (promptInputRef.current && promptBtnRef.current) {
      let i = 0;
      promptBtnRef.current.disabled = true;
      promptBtnRef.current.style.opacity = "0.5";
      const typeInterval = setInterval(() => {
        if (i < prompt.length) {
          setPromptText((prev) => prev + prompt.charAt(i));
          i++;
        } else {
          clearInterval(typeInterval);
          promptBtnRef.current!.disabled = false;
          promptBtnRef.current!.style.opacity = "0.8";
        }
      }, 10);
    }
  };

  return (
    <div className="container">
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
      <div className="main-content">
        <form onSubmit={handleSubmit} className="prompt-form">
          <div className="prompt-container">
            <textarea
              ref={promptInputRef}
              className="prompt-input"
              placeholder="Descreva sua imaginação em detalhes..."
              spellCheck={false}
              required
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
            ></textarea>
            <button
              type="button"
              className="prompt-btn"
              title="Get Random Prompt"
              ref={promptBtnRef}
              onClick={handleRandomPrompt}
            >
              <i className="fa-solid fa-dice"></i>
            </button>
          </div>
          <div className="prompt-actions">
            <div className="select-wrapper">
              <select
                className="custom-select"
                required
                onChange={(e) => setSelectedModel(e.target.value)}
              >
                <option value="" disabled selected>
                  Select Model
                </option>
                <option value="black-forest-labs/FLUX.1-dev">FLUX.1-dev</option>
                <option value="black-forest-labs/FLUX.1-schnell">
                  FLUX.1-schnell
                </option>
                <option value="stabilityai/stable-diffusion-xl-base-1.0">
                  Stable Diffusion XL
                </option>
                <option value="runwayml/stable-diffusion-v1-5">
                  Stable Diffusion v1.5
                </option>
                <option value="stabilityai/stable-diffusion-3-medium-diffusers">
                  Stable Diffusion 3
                </option>
              </select>
            </div>
            <div className="select-wrapper">
              <select
                className="custom-select"
                required
                onChange={(e) => setImageCount(Number(e.target.value))}
              >
                <option value="" disabled selected>
                  Image Count
                </option>
                <option value="1">1 Image</option>
                <option value="2">2 Images</option>
                <option value="3">3 Images</option>
                <option value="4">4 Images</option>
              </select>
            </div>
            <div className="select-wrapper">
              <select
                className="custom-select"
                required
                onChange={(e) => setAspectRatio(e.target.value)}
              >
                <option value="" disabled selected>
                  Aspect Ratio
                </option>
                <option value="1/1">Square (1:1)</option>
                <option value="16/9">Landscape (16:9)</option>
                <option value="9/16">Portrait (9:16)</option>
              </select>
            </div>
            <button type="submit" className="generate-btn">
              <i className="fa-solid fa-wand-sparkles"></i> Generate
            </button>
          </div>
        </form>
        <div className="gallery-grid">
          {gallery.map((img, index) => (
            <div
              className={`img-card ${
                img === "loading" ? "loading" : img === "error" ? "error" : ""
              } animate-in`}
              key={index}
              style={{ aspectRatio }}
            >
              {img === "loading" ? (
                <div className="status-container">
                  <div className="spinner"></div>
                  <i className="fa-solid fa-triangle-exclamation"></i>
                  <p className="status-text">Generating...</p>
                </div>
              ) : img === "error" ? (
                <div className="status-container">
                  <i className="fa-solid fa-triangle-exclamation"></i>
                  <p className="status-text">
                    Generation failed! Check console.
                  </p>
                </div>
              ) : (
                <>
                  <img className="result-img" src={img} alt="Generated" />
                  <div className="img-overlay">
                    <a
                      href={img}
                      className="img-download-btn"
                      title="Download Image"
                      download
                    >
                      <i className="fa-solid fa-download"></i>
                    </a>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
