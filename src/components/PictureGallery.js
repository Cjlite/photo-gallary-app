import React, { useState, useEffect } from "react";
import axios from "axios";
import "./PictureGallery.css";

function PictureGallery() {
  const [query, setQuery] = useState("");
  const [pictures, setPictures] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = "-BXo6pmVi6gSAt3uSbdC5HEG3a1ICm-lunpmwTYnOV4";
  const BASE_URL = "https://api.unsplash.com/search/photos";

  const searchPictures = async () => {
    try {
      setError(null);
      setLoading(true);

      const response = await axios.get(BASE_URL, {
        params: { page: 1, query, per_page: 10 },
        headers: {
          Authorization: `Client-ID ${API_KEY}`,
        },
      });
      setPictures(response.data.results);
    } catch (error) {
      setError("Error fetching pictures. Please try again.");
      console.error("Error fetching pictures:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query) {
      searchPictures();
    } else {
      setPictures([]);
    }
  }, [query]);

  return (
    <div className="picture-gallery">
      <h1>Unsplash Picture Gallery</h1>
      <div className="search-box">
        <input
          type="text"
          placeholder="Enter a category name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={searchPictures}>Search</button>
        <button onClick={() => setQuery("")}>Clear</button>
      </div>

      {loading && <p className="loading">Loading...</p>}

      {error && <p className="error">{error}</p>}

      <div className="picture-grid">
        {pictures.map((picture) => (
          <div className="picture-card" key={picture.id}>
            <img src={picture.urls.small} alt={picture.alt_description} />
            <div className="author-info">
              <img
                src={picture.user.profile_image.small}
                alt={picture.user.name}
                className="author-photo"
              />
              <p className="author-name">Author: {picture.user.username}</p>
            </div>
            <p className="description">Description: {picture.description || "N/A"}</p>
            <p className="view-link">
              <a href={picture.links.html} target="_blank" rel="noopener noreferrer">
                View on Unsplash
              </a>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PictureGallery;
