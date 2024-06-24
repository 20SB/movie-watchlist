// src/pages/Home.js
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Button, Text, VStack, HStack } from "@chakra-ui/react";
import { deleteMovie, toggleWatched } from "../redux/moviesSlice";
import { Link } from "react-router-dom";

const Home = () => {
    const movies = useSelector((state) => state.movies.movies);
    const dispatch = useDispatch();

    return (
        <Box p={4}>
            <VStack spacing={4}>
                {movies.map((movie) => (
                    <Box
                        key={movie.id}
                        p={4}
                        borderWidth={1}
                        borderRadius={8}
                        width="100%"
                    >
                        <Text fontSize="xl">{movie.title}</Text>
                        <Text>{movie.description}</Text>
                        <Text>Release Year: {movie.releaseYear}</Text>
                        <Text>Genre: {movie.genre}</Text>
                        <HStack spacing={2}>
                            <Button
                                onClick={() =>
                                    dispatch(toggleWatched({ id: movie.id }))
                                }
                            >
                                {movie.watched ? "Unwatch" : "Watch"}
                            </Button>
                            <Link to={`/edit/${movie.id}`}>
                                <Button>Edit</Button>
                            </Link>
                            <Button
                                onClick={() =>
                                    dispatch(deleteMovie({ id: movie.id }))
                                }
                            >
                                Delete
                            </Button>
                        </HStack>
                    </Box>
                ))}
                <Link to="/add">
                    <Button>Add Movie</Button>
                </Link>
            </VStack>
        </Box>
    );
};

export default Home;
