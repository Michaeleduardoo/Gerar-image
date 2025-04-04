import React, { useEffect, useRef, useState } from "react";
import Header from "./Header/page";
import PromptForm from "./PromptForm/page";
import Gallery from "./Gallery/page";
const API_KEY = "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"; // Hugging Face API Key

const allMessage: string[] = [
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
  const [, setLoadingCount] = useState<number>(0);

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
      allMessage[Math.floor(Math.random() * allMessage.length)].trim();
    if (promptInputRef.current && promptBtnRef.current) {
      let i = 0;
      let currentText = "";
      promptBtnRef.current.disabled = true;
      promptBtnRef.current.style.opacity = "0.5";

      setPromptText(""); // limpa antes de iniciar

      const typeInterval = setInterval(() => {
        if (i < prompt.length) {
          currentText += prompt.charAt(i);
          setPromptText(currentText);
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
    <>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <div className="main-content">
        <PromptForm
          promptText={promptText}
          setPromptText={setPromptText}
          setSelectedModel={setSelectedModel}
          setImageCount={setImageCount}
          setAspectRatio={setAspectRatio}
          handleSubmit={handleSubmit}
          handleRandomPrompt={handleRandomPrompt}
          promptInputRef={promptInputRef}
          promptBtnRef={promptBtnRef}
        />
        <Gallery gallery={gallery} aspectRatio={aspectRatio} />
      </div>
    </>
  );
};

export default App;
