import { createSlice } from "@reduxjs/toolkit";

// Load from localStorage if available, else use empty array
const loadUrls = () => {
  try {
    const stored = localStorage.getItem("urls");
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    console.error("Failed to load from localStorage", e);
    return [];
  }
};

const saveUrls = (urls) => {
  try {
    localStorage.setItem("urls", JSON.stringify(urls));
  } catch (e) {
    console.error("Failed to save to localStorage", e);
  }
};

const urlSlice = createSlice({
  name: "urls",
  initialState: loadUrls(),
  reducers: {
    shortenUrl: (state, action) => {
      state.push(action.payload);
      saveUrls(state); // persist every time we add
    },
    // Optional: clear all URLs
    clearUrls: (state) => {
      state.length = 0;
      saveUrls(state);
    },
  },
});

export const { shortenUrl, clearUrls } = urlSlice.actions;
export default urlSlice.reducer;
