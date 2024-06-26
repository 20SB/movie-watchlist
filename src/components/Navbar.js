import { Button, Flex, Heading } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";

export const Navbar = () => {
    return (
        <Flex p={4} justify={"space-between"}>
            <Link to="/">
                <Heading as="h3" size="lg">
                    My Movie list
                </Heading>
            </Link>
            <Link to="/add">
                <Button leftIcon={<IoMdAdd />}>Add Movie</Button>
            </Link>
        </Flex>
    );
};
