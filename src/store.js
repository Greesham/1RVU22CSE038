import { configureStore } from "@reduxjs/toolkit";
import urlReducer from "./urlSlice";
import logger from "./middleware/logger";

const store = configureStore({
  reducer: {
    urls: urlReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(logger),
});

export default store;
