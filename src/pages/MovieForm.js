// src/pages/MovieForm.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    VStack,
} from "@chakra-ui/react";
import { addMovie, editMovie } from "../redux/moviesSlice";

const MovieForm = () => {
    const { id } = useParams();
    const movie =
        useSelector((state) =>
            state.movies.movies.find((movie) => movie.id === id)
        ) || {};
    const [title, setTitle] = useState(movie.title || "");
    const [description, setDescription] = useState(movie.description || "");
    const [releaseYear, setReleaseYear] = useState(movie.releaseYear || "");
    const [genre, setGenre] = useState(movie.genre || "");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        if (id) {
            dispatch(editMovie({ title, description, releaseYear, genre }, id));
        } else {
            dispatch(
                addMovie({
                    title,
                    description,
                    releaseYear,
                    genre,
                    watched: false,
                })
            );
        }
        navigate("/");
    };

    return (
        <Box p={4}>
            <VStack spacing={4} as="form" onSubmit={handleSubmit}>
                <FormControl>
                    <FormLabel>Title</FormLabel>
                    <Input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Description</FormLabel>
                    <Textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Release Year</FormLabel>
                    <Input
                        value={releaseYear}
                        onChange={(e) => setReleaseYear(e.target.value)}
                        required
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Genre</FormLabel>
                    <Input
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                        required
                    />
                </FormControl>
                <Button type="submit">Save</Button>
            </VStack>
        </Box>
    );
};

export default MovieForm;
