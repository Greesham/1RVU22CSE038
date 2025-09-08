import React, { useEffect, useState } from "react";
import "./UrlStatsPage.css";

const UrlStatsPage = () => {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("urls")) || [];
    setUrls(stored);
  }, []);

  return (
    <div className="stats-container">
      <h2>📊 URL Statistics</h2>
      {urls.length === 0 ? (
        <p>No shortened URLs yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Original URL</th>
              <th>Short URL</th>
              <th>Created At</th>
              <th>Expiry</th>
              <th>Clicks</th>
            </tr>
          </thead>
          <tbody>
            {urls.map((item, index) => (
              <tr key={index}>
                <td>{item.original}</td>
                <td>
                  <a href={item.short} target="_blank" rel="noreferrer">
                    {item.short}
                  </a>
                </td>
                <td>{item.createdAt}</td>
                <td>{item.expiry}</td>
                <td>{item.clicks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UrlStatsPage;
