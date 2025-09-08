import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { shortenUrl } from "./urlSlice";

function Home() {
  const [url, setUrl] = useState("");
  const [timer, setTimer] = useState("");
  const [customCode, setCustomCode] = useState("");
  const dispatch = useDispatch();
  const urls = useSelector((state) => state.urls);

  const handleShorten = () => {
    if (!url.trim()) return;

    // normalize input
    let normalizedUrl = url.trim();
    if (!/^https?:\/\//i.test(normalizedUrl)) {
      normalizedUrl = "https://" + normalizedUrl;
    }

    // expiry
    const expiryMinutes = timer ? parseInt(timer, 10) : 30;
    const expiryTime = new Date(Date.now() + expiryMinutes * 60 * 1000).toISOString();

    // shortcode
    let shortcode = customCode || Math.random().toString(36).slice(2, 7);
    while (urls.find((u) => u.short === shortcode)) {
      shortcode = Math.random().toString(36).slice(2, 7);
    }

    const newUrl = {
      original: normalizedUrl,
      short: shortcode,
      expiry: expiryTime,
    };

    if (urls.length >= 5) {
      alert("You can only shorten up to 5 URLs at once!");
      return;
    }

    dispatch(shortenUrl(newUrl));

    setUrl("");
    setTimer("");
    setCustomCode("");
  };

  return (
    <div className="container">
      <div className="box">
        <h1>🔗 URL Shortener</h1>

        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL..."
        />
        <input
          type="number"
          value={timer}
          onChange={(e) => setTimer(e.target.value)}
          placeholder="Expiry (minutes, default 30)"
        />
        <input
          type="text"
          value={customCode}
          onChange={(e) => setCustomCode(e.target.value)}
          placeholder="Custom shortcode (optional)"
        />

        <button onClick={handleShorten}>Shorten URL</button>

        {urls.length > 0 && (
          <div className="links">
            <h2>Your Shortened Links</h2>
            {urls.map((u, idx) => (
              <div key={idx} className="link-item">
                <p><strong>Original:</strong> {u.original}</p>
                <p>
                  <strong>Shortened:</strong>{" "}
                  <a
                    href={`${window.location.origin}/${u.short}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {window.location.origin}/{u.short}
                  </a>
                </p>
                <p>
                  <small>Expires at: {new Date(u.expiry).toLocaleTimeString()}</small>
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
