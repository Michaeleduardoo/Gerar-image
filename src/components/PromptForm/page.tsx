import React from "react";

interface PromptFormProps {
  promptText: string;
  setPromptText: React.Dispatch<React.SetStateAction<string>>;
  setSelectedModel: (val: string) => void;
  setImageCount: (val: number) => void;
  setAspectRatio: (val: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  handleRandomPrompt: () => void;
  promptInputRef: React.RefObject<HTMLTextAreaElement | null>;
  promptBtnRef: React.RefObject<HTMLButtonElement | null>;
}

const PromptForm: React.FC<PromptFormProps> = ({
  promptText,
  setPromptText,
  setSelectedModel,
  setImageCount,
  setAspectRatio,
  handleSubmit,
  handleRandomPrompt,
  promptInputRef,
  promptBtnRef,
}) => {
  return (
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
              imagens
            </option>
            <option value="1">1 imagem</option>
            <option value="2">2 Imagens</option>
            <option value="3">3 Imagens</option>
            <option value="4">4 Imagens</option>
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
  );
};

export default PromptForm;
