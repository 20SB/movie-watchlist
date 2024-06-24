// src/pages/MovieDetails.js
import React from "react";
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { Box, Text, VStack, HStack, Button } from "@chakra-ui/react";

const MovieDetails = () => {
    const { id } = useParams();
    const movie = useSelector((state) =>
        state.movies.movies.find((movie) => movie.id === id)
    );

    if (!movie) {
        return <Text>Movie not found</Text>;
    }

    return (
        <Box p={4}>
            <VStack spacing={4}>
                <Text fontSize="2xl">{movie.title}</Text>
                <Text>{movie.description}</Text>
                <Text>Release Year: {movie.releaseYear}</Text>
                <Text>Genre: {movie.genre}</Text>
                <Text>Watched: {movie.watched ? "Yes" : "No"}</Text>
                <Text>Rating: {movie.rating || "Not rated"}</Text>
                <Text>Review: {movie.review || "No review"}</Text>
                <HStack spacing={2}>
                    <Link to={`/edit/${movie.id}`}>
                        <Button>Edit</Button>
                    </Link>
                    <Link to={`/rate-review/${movie.id}`}>
                        <Button>Rate & Review</Button>
                    </Link>
                </HStack>
            </VStack>
        </Box>
    );
};

export default MovieDetails;
