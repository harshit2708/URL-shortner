import React from 'react';

const UrlShortener = ({ onShorten, shortenedUrl, originalUrl, onChange }) => {
  return (
    <section className="url-shortener-section">
      <div className="input-container">
        <label>Enter URL:</label>
        <input
          type="text"
          value={originalUrl}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
      <div className="button-container">
        <button onClick={onShorten}>Shorten</button>
      </div>

      {shortenedUrl && (
        <div className="result-container">
          <p>Shortened URL:</p>
          <a href={shortenedUrl} target="_blank" rel="noopener noreferrer">
            {shortenedUrl}
          </a>
        </div>
      )}
    </section>
  );
};

export default UrlShortener;
