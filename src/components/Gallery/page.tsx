import React from "react";

interface GalleryProps {
  gallery: string[];
  aspectRatio: string;
}

const Gallery: React.FC<GalleryProps> = ({ gallery, aspectRatio }) => {
  return (
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
              <p className="status-text">Generating...</p>
            </div>
          ) : img === "error" ? (
            <div className="status-container">
              <i className="fa-solid fa-triangle-exclamation"></i>
              <p className="status-text">Generation failed! Check console.</p>
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
  );
};

export default Gallery;
