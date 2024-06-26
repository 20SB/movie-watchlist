// src/pages/Home.js
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    Box,
    Button,
    Text,
    VStack,
    HStack,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    IconButton,
    useMediaQuery,
} from "@chakra-ui/react";
import { deleteMovie, toggleWatched } from "../redux/moviesSlice";
import { Link } from "react-router-dom";
import { HamburgerIcon } from "@chakra-ui/icons";

const Home = () => {
    console.log("rendering home");
    const movies = useSelector((state) => state.movies.movies);
    console.log("movies", movies);
    const dispatch = useDispatch();
    const [isMobile] = useMediaQuery("(max-width: 768px)");

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
                        position={"relative"}
                    >
                        {isMobile && (
                            <Menu>
                                <MenuButton
                                    as={IconButton}
                                    icon={<HamburgerIcon />}
                                    position={"absolute"}
                                    right={2}
                                />
                                <MenuList>
                                    <MenuItem
                                        onClick={() =>
                                            dispatch(toggleWatched(movie))
                                        }
                                    >
                                        {movie.watched
                                            ? "Watched"
                                            : "Not Watched"}
                                    </MenuItem>
                                    <Link to={`/edit/${movie.id}`}>
                                        <MenuItem>Edit</MenuItem>
                                    </Link>
                                    <MenuItem
                                        onClick={() =>
                                            dispatch(deleteMovie(movie.id))
                                        }
                                    >
                                        Delete
                                    </MenuItem>
                                    <Link to={`/movie/${movie.id}`}>
                                        <MenuItem>Details</MenuItem>
                                    </Link>
                                </MenuList>
                            </Menu>
                        )}
                        <Text fontSize="2xl">{movie.title}</Text>
                        <Text fontSize="sm">{movie.genre}</Text>
                        <Text pt={6} pb={2}>
                            {movie.description}
                        </Text>
                        <Text fontSize="sm">
                            Release Year: {movie.releaseYear}
                        </Text>
                        {!isMobile && (
                            <HStack spacing={2} justifyContent={"flex-end"}>
                                <Button
                                    onClick={() =>
                                        dispatch(toggleWatched(movie))
                                    }
                                >
                                    {movie.watched ? "Watched" : "Not Watched"}
                                </Button>
                                <Link to={`/edit/${movie.id}`}>
                                    <Button>Edit</Button>
                                </Link>
                                <Button
                                    onClick={() =>
                                        dispatch(deleteMovie(movie.id))
                                    }
                                >
                                    Delete
                                </Button>
                                <Link to={`/movie/${movie.id}`}>
                                    <Button>Details</Button>
                                </Link>
                            </HStack>
                        )}
                    </Box>
                ))}
            </VStack>
        </Box>
    );
};

export default Home;
