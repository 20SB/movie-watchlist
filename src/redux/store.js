// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./moviesSlice";

export const store = configureStore({
    reducer: {
        movies: moviesReducer,
    },
});
