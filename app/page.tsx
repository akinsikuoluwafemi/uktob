"use client";

import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
import { Box, Typography } from "@mui/material";
import { useGetAllPokemonQuery } from "@/features/apiSlice";
import PokemonList from "@/components/PokemonList";
import { useLocalState } from "@/context";
import Navbar from "@/components/Navbar";

export default function Home() {
  const { offSet } = useLocalState();
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

  return (
    <Container fixed>
      <Box
        sx={{
          height: "100vh",
          bgcolor: "#fff",
          marginTop: "20px",
        }}
      >
        <Navbar count={data?.count} />

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
  );
}
