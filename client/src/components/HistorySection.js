import React from 'react';

const HistorySection = ({ shortenedUrlsHistory }) => {
  return (
    <section className="history-section">
      <h2>Shortened URLs History</h2>
      <ul>
        {shortenedUrlsHistory.map((item, index) => (
          <li key={index}>
            <span>{item.url}</span>
            <span> ➜ </span>
            <a href={item.shortenedUrl} target="_blank" rel="noopener noreferrer">
              {item.shorturl}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default HistorySection;
