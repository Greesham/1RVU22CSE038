import React, { useState } from "react";
import logEvent from "../middleware/logger";
import "./UrlShortenerPage.css"; // import css file

const UrlShortenerPage = () => {
  const [url, setUrl] = useState("");
  const [validity, setValidity] = useState(30); // expiry in minutes
  const [customCode, setCustomCode] = useState("");
  const [shortenedUrls, setShortenedUrls] = useState([]);

  const validateUrl = (input) => {
    try {
      new URL(input);
      return true;
    } catch {
      return false;
    }
  };

  const handleShorten = () => {
    if (!validateUrl(url)) {
      logEvent("ERROR", { message: "Invalid URL entered", url });
      return alert("❌ Please enter a valid URL");
    }

    const shortCode =
      customCode.trim() !== ""
        ? customCode
        : Math.random().toString(36).substring(2, 7);

    const shortUrl = `http://localhost:3000/${shortCode}`;

    const newEntry = {
      original: url,
      short: shortUrl,
      createdAt: new Date().toLocaleString(),
      expiry: new Date(Date.now() + validity * 60000).toLocaleString(),
      clicks: 0,
    };

    setShortenedUrls([...shortenedUrls, newEntry]);
    logEvent("URL_SHORTENED", newEntry);

    const existing = JSON.parse(localStorage.getItem("urls")) || [];
    existing.push(newEntry);
    localStorage.setItem("urls", JSON.stringify(existing));

    setUrl("");
    setCustomCode("");
    setValidity(30);
  };

  return (
    <div className="shortener-container">
      <h2>URL Shortener</h2>

      <input
        type="text"
        placeholder="Enter Original URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <input
        type="number"
        placeholder="Validity (minutes)"
        value={validity}
        onChange={(e) => setValidity(Number(e.target.value))}
      />

      <input
        type="text"
        placeholder="Custom Shortcode (optional)"
        value={customCode}
        onChange={(e) => setCustomCode(e.target.value)}
      />

      <button onClick={handleShorten}>Shorten URL</button>

      <div className="shortened-list">
        {shortenedUrls.map((item, index) => (
          <p key={index}>
            <b>{item.original}</b> →{" "}
            <a href={item.short} target="_blank" rel="noreferrer">
              {item.short}
            </a>{" "}
            (Expires: {item.expiry})
          </p>
        ))}
      </div>
    </div>
  );
};

export default UrlShortenerPage;
