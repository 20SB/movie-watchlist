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
import { Box, Flex } from "@chakra-ui/react";

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchMovies());
    }, [dispatch]);

    return (
        <Flex direction={"column"} height={"100vh"}>
            <Navbar />
            <Box flexGrow={1} height={"100%"} overflowY={"auto"}>
                <Routes>
                    <Route path="/" Component={Home} />
                    <Route path="/add" Component={MovieForm} />
                    <Route path="/edit/:id" Component={MovieForm} />
                    <Route path="/movie/:id" Component={MovieDetails} />
                    <Route
                        path="/rate-review/:id"
                        element={<RateReviewForm />}
                    />
                </Routes>
            </Box>
        </Flex>
    );
};

export default App;
