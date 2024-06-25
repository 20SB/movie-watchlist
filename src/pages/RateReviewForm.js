// src/pages/RateReviewForm.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    VStack,
} from "@chakra-ui/react";
import { rateMovie, reviewMovie } from "../redux/moviesSlice";

const RateReviewForm = () => {
    const { id } = useParams();
    const movie = useSelector((state) =>
        state.movies.movies.find((movie) => movie.id === id)
    );
    const [rating, setRating] = useState(movie?.rating || "");
    const [review, setReview] = useState(movie?.review || "");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(rateMovie({ id, rating }));
        dispatch(reviewMovie({ id, review }));
        navigate(`/movie/${id}`);
    };

    return (
        <Box p={4}>
            <VStack spacing={4} as="form" onSubmit={handleSubmit}>
                <FormControl>
                    <FormLabel>Rating</FormLabel>
                    <Input
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        required
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Review</FormLabel>
                    <Textarea
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        required
                    />
                </FormControl>
                <Button type="submit">Submit</Button>
            </VStack>
        </Box>
    );
};

export default RateReviewForm;
