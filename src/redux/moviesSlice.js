// src/redux/moviesSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    movies: [],
};

const moviesSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {
        addMovie: (state, action) => {
            state.movies.push(action.payload);
        },
        editMovie: (state, action) => {
            const index = state.movies.findIndex(
                (movie) => movie.id === action.payload.id
            );
            state.movies[index] = action.payload;
        },
        deleteMovie: (state, action) => {
            state.movies = state.movies.filter(
                (movie) => movie.id !== action.payload.id
            );
        },
        toggleWatched: (state, action) => {
            const index = state.movies.findIndex(
                (movie) => movie.id === action.payload.id
            );
            state.movies[index].watched = !state.movies[index].watched;
        },
        rateMovie: (state, action) => {
            const index = state.movies.findIndex(
                (movie) => movie.id === action.payload.id
            );
            state.movies[index].rating = action.payload.rating;
        },
        reviewMovie: (state, action) => {
            const index = state.movies.findIndex(
                (movie) => movie.id === action.payload.id
            );
            state.movies[index].review = action.payload.review;
        },
    },
});

export const {
    addMovie,
    editMovie,
    deleteMovie,
    toggleWatched,
    rateMovie,
    reviewMovie,
} = moviesSlice.actions;
export default moviesSlice.reducer;
