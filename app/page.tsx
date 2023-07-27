"use client";

import Image from "next/image";
import styles from "./page.module.css";
import Container from "@mui/material/Container";
import { styled, alpha } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";
import { Box, Button, InputBase, Pagination, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useGetAllPokemonQuery } from "@/features/apiSlice";
import PokemonList from "@/components/PokemonList";
import { ChangeEvent, useState } from "react";
import { useEffect } from "react";
import { LocalStateWrapper, useLocalState } from "@/context";
import AppBar from "@mui/material/AppBar";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),

    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),

    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function Home() {
  const [pageNum, setPageNum] = useState(1);
  const [offSet, setOffSet] = useState(0);
  const { data, error, isLoading } = useGetAllPokemonQuery({
    offset: offSet,
    limit: 20,
  });

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "10px",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "10px",
        }}
      >
        {" "}
        An error occurred
      </Box>
    );
  }

  const changePage = (e: ChangeEvent<unknown>, page: number) => {
    // console.log(page);
    setPageNum(page);
    const offset = (page - 1) * 20;
    setOffSet(offset);
  };

  console.log(offSet);

  return (
    // <LocalStateWrapper>
    <Container fixed>
      <Box
        sx={{
          height: "100vh",
          bgcolor: "#fff",
          marginTop: "20px",
        }}
      >
        <AppBar position="static" sx={{ padding: "10px" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Pagination
              onChange={changePage}
              color="primary"
              count={data?.count}
              page={pageNum}
            />

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>

              <Button variant="contained" color="success">
                Search
              </Button>
            </Box>
          </Box>
        </AppBar>

        <Box
          sx={{
            marginTop: "20px",

            bgcolor: "#fff",
            height: "auto",

            color: "#000",
            padding: "10px",
          }}
        >
          {data ? (
            <PokemonList data={data} />
          ) : (
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              No Result
            </Typography>
          )}
        </Box>
      </Box>
    </Container>
    // </LocalStateWrapper> */}
  );
}
