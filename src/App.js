// src/App.js
import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import MovieForm from "./pages/MovieForm";
import MovieDetails from "./pages/MovieDetails";
import RateReviewForm from "./pages/RateReviewForm";
import { useDispatch } from "react-redux";
import { fetchMovies } from "./redux/moviesSlice";
import { Navbar } from "./components/Navbar";

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchMovies());
    }, [dispatch]);

    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" Component={Home} />
                <Route path="/add" Component={MovieForm} />
                <Route path="/edit/:id" Component={MovieForm} />
                <Route path="/movie/:id" Component={MovieDetails} />
                <Route path="/rate-review/:id" element={<RateReviewForm />} />
            </Routes>
        </>
    );
};

export default App;
