function Form() {
  return (
    <form action="#" className="prompt-form">
      <div className="prompt-container">
        <textarea
          className="prompt-input"
          placeholder="Descreva sua imaginação em detalhes..."
          spellCheck="false"
          autoFocus
          required
        ></textarea>
        <button type="button" className="prompt-btn" title="Get Random Prompt">
          <i className="fa-solid fa-dice"></i>
        </button>
      </div>

      <div className="prompt-actions">
        <div className="select-wrapper">
          <select className="custom-select" id="model-select" required>
            <option value="" selected disabled>
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
          <select className="custom-select" id="count-select" required>
            <option value="" selected disabled>
              Image Count
            </option>
            <option value="1">1 Image</option>
            <option value="2">2 Images</option>
            <option value="3">3 Images</option>
            <option value="4">4 Images</option>
          </select>
        </div>
        <div className="select-wrapper">
          <select className="custom-select" id="ratio-select" required>
            <option value="" selected disabled>
              Aspect Ratio
            </option>
            <option value="1/1">Square (1:1)</option>
            <option value="16/9">Landscape (16:9)</option>
            <option value="9/16">Portrait (9:16)</option>
          </select>
        </div>
        <button type="submit" className="generate-btn">
          <i className="fa-solid fa-wand-sparkles"></i>
          Generate
        </button>
      </div>
    </form>
  );
}

export default Form;
