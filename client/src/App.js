// App.js
import React, { useState } from 'react';
import Header from './components/Header';
import UrlShortener from './components/UrlShortener';
import HistorySection from './components/HistorySection';
import './App.css';

function App() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');
  const [shortenedUrlsHistory, setShortenedUrlsHistory] = useState([]);

  const handleShorten = async () => {
    // Implement the logic to send the original URL to the back-end for shortening
    // You need to set up a back-end server to handle URL shortening and redirection

    // For demonstration purposes, let's assume a hypothetical API endpoint
    try {
      const response = await fetch('http://localhost:3000/api/v1/url/link', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ originalUrl }),
      });

      if (response.ok) {
        const data = await response.json();
        setShortenedUrl(data.shorturl);
        setShortenedUrlsHistory([...shortenedUrlsHistory, data]);
      } else {
        console.error('Failed to shorten URL');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="app-container">
      <Header />

      <main>
        <h1>URL Shortener</h1>

        <UrlShortener
          onShorten={handleShorten}
          shortenedUrl={shortenedUrl}
          originalUrl={originalUrl}
          onChange={setOriginalUrl}
        />

        {shortenedUrlsHistory.length > 0 && (
          <HistorySection shortenedUrlsHistory={shortenedUrlsHistory} />
        )}
      </main>

      <footer>
        <p>&copy; 2024 URL Shortener App</p>
      </footer>
    </div>
  );
}

export default App;
