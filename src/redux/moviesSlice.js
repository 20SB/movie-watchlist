// src/redux/moviesSlice.js
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    movies: [],
    status: "idle", // for loading state management
    error: null, // for error handling
};

const moviesSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {
        addMovieStart(state) {
            state.status = "loading";
            state.error = null;
        },
        addMovieSuccess(state, action) {
            state.status = "idle";
            state.movies.push(action.payload);
        },
        addMovieFailure(state, action) {
            state.status = "idle";
            state.error = action.payload;
        },
        editMovieStart(state) {
            state.status = "loading";
            state.error = null;
        },
        editMovieSuccess(state, action) {
            state.status = "idle";
            const index = state.movies.findIndex(
                (movie) => movie.id === action.payload.id
            );
            if (index !== -1) {
                state.movies[index] = action.payload;
            }
        },
        editMovieFailure(state, action) {
            state.status = "idle";
            state.error = action.payload;
        },
        deleteMovieStart(state) {
            state.status = "loading";
            state.error = null;
        },
        deleteMovieSuccess(state, action) {
            state.status = "idle";
            state.movies = state.movies.filter(
                (movie) => movie.id !== action.payload.id
            );
        },
        deleteMovieFailure(state, action) {
            state.status = "idle";
            state.error = action.payload;
        },
        toggleWatchedStart(state) {
            state.status = "loading";
            state.error = null;
        },
        toggleWatchedSuccess(state, action) {
            state.status = "idle";
            const index = state.movies.findIndex(
                (movie) => movie.id === action.payload.id
            );
            if (index !== -1) {
                state.movies[index].watched = action.payload.watched;
            }
        },
        toggleWatchedFailure(state, action) {
            state.status = "idle";
            state.error = action.payload;
        },
        rateMovieStart(state) {
            state.status = "loading";
            state.error = null;
        },
        rateMovieSuccess(state, action) {
            state.status = "idle";
            const index = state.movies.findIndex(
                (movie) => movie.id === action.payload.id
            );
            if (index !== -1) {
                state.movies[index].rating = action.payload.rating;
            }
        },
        rateMovieFailure(state, action) {
            state.status = "idle";
            state.error = action.payload;
        },
        reviewMovieStart(state) {
            state.status = "loading";
            state.error = null;
        },
        reviewMovieSuccess(state, action) {
            state.status = "idle";
            const index = state.movies.findIndex(
                (movie) => movie.id === action.payload.id
            );
            if (index !== -1) {
                state.movies[index].review = action.payload.review;
            }
        },
        reviewMovieFailure(state, action) {
            state.status = "idle";
            state.error = action.payload;
        },
        fetchMoviesStart(state) {
            state.status = "loading";
            state.error = null;
        },
        fetchMoviesSuccess(state, action) {
            state.status = "idle";
            state.movies = action.payload;
        },
        fetchMoviesFailure(state, action) {
            state.status = "idle";
            state.error = action.payload;
        },
    },
});

export const {
    addMovieStart,
    addMovieSuccess,
    addMovieFailure,
    editMovieStart,
    editMovieSuccess,
    editMovieFailure,
    deleteMovieStart,
    deleteMovieSuccess,
    deleteMovieFailure,
    toggleWatchedStart,
    toggleWatchedSuccess,
    toggleWatchedFailure,
    rateMovieStart,
    rateMovieSuccess,
    rateMovieFailure,
    reviewMovieStart,
    reviewMovieSuccess,
    reviewMovieFailure,
    fetchMoviesStart,
    fetchMoviesSuccess,
    fetchMoviesFailure,
} = moviesSlice.actions;

export default moviesSlice.reducer;

// Thunk action creators for handling API requests
export const addMovie = (movieData) => async (dispatch) => {
    dispatch(addMovieStart());
    try {
        const timestamp = new Date().toISOString();
        const response = await axios.post(
            "https://movie-watchlist-e5b47-default-rtdb.asia-southeast1.firebasedatabase.app/movies.json",
            { ...movieData, createdAt: timestamp, updatedAt: timestamp }
        );
        dispatch(
            addMovieSuccess({
                ...movieData,
                id: response.data.name,
                createdAt: timestamp,
                updatedAt: timestamp,
            })
        );
    } catch (error) {
        dispatch(addMovieFailure(error.message));
    }
};

export const editMovie = (movieData, movieId) => async (dispatch) => {
    dispatch(editMovieStart());
    try {
        const timestamp = new Date().toISOString();
        await axios.put(
            `https://movie-watchlist-e5b47-default-rtdb.asia-southeast1.firebasedatabase.app/movies/${movieId}.json`,
            { ...movieData, updatedAt: timestamp }
        );
        dispatch(editMovieSuccess({ ...movieData, id: movieId }));
    } catch (error) {
        dispatch(editMovieFailure(error.message));
    }
};

export const deleteMovie = (movieId) => async (dispatch) => {
    dispatch(deleteMovieStart());
    try {
        await axios.delete(
            `https://movie-watchlist-e5b47-default-rtdb.asia-southeast1.firebasedatabase.app/movies/${movieId}.json`
        );
        dispatch(deleteMovieSuccess({ id: movieId }));
    } catch (error) {
        dispatch(deleteMovieFailure(error.message));
    }
};

export const toggleWatched = (movieData) => async (dispatch) => {
    dispatch(toggleWatchedStart());
    try {
        const timestamp = new Date().toISOString();
        await axios.patch(
            `https://movie-watchlist-e5b47-default-rtdb.asia-southeast1.firebasedatabase.app/movies/${movieData.id}.json`,
            { watched: !movieData.watched, updatedAt: timestamp }
        );
        dispatch(
            toggleWatchedSuccess({
                id: movieData.id,
                watched: !movieData.watched,
            })
        );
    } catch (error) {
        dispatch(toggleWatchedFailure(error.message));
    }
};

export const rateMovie = (movieData) => async (dispatch) => {
    dispatch(rateMovieStart());
    try {
        const timestamp = new Date().toISOString();
        await axios.patch(
            `https://movie-watchlist-e5b47-default-rtdb.asia-southeast1.firebasedatabase.app/movies/${movieData.id}.json`,
            { rating: movieData.rating, updatedAt: timestamp }
        );
        dispatch(
            rateMovieSuccess({ id: movieData.id, rating: movieData.rating })
        );
    } catch (error) {
        dispatch(rateMovieFailure(error.message));
    }
};

export const reviewMovie = (movieData) => async (dispatch) => {
    dispatch(reviewMovieStart());
    try {
        const timestamp = new Date().toISOString();
        await axios.patch(
            `https://movie-watchlist-e5b47-default-rtdb.asia-southeast1.firebasedatabase.app/movies/${movieData.id}.json`,
            { review: movieData.review, updatedAt: timestamp }
        );
        dispatch(
            reviewMovieSuccess({ id: movieData.id, review: movieData.review })
        );
    } catch (error) {
        dispatch(reviewMovieFailure(error.message));
    }
};

export const fetchMovies = () => async (dispatch) => {
    dispatch(fetchMoviesStart());
    try {
        const response = await axios.get(
            "https://movie-watchlist-e5b47-default-rtdb.asia-southeast1.firebasedatabase.app/movies.json"
        );
        const movies = Object.keys(response.data).map((key) => ({
            id: key,
            ...response.data[key],
        }));
        dispatch(fetchMoviesSuccess(movies));
    } catch (error) {
        dispatch(fetchMoviesFailure(error.message));
    }
};
