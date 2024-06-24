// src/App.js
import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import MovieForm from "./pages/MovieForm";
import MovieDetails from "./pages/MovieDetails";

const App = () => {
    return (
        <Routes>
            <Route path="/" exact component={Home} />
            <Route path="/add" component={MovieForm} />
            <Route path="/edit/:id" component={MovieForm} />
            <Route path="/movie/:id" component={MovieDetails} />
        </Routes>
    );
};

export default App;
