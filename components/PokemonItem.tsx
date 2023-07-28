import { SinglePokemon } from "@/types";
import React from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useLazyGetPokemonByNameOrIdQuery } from "@/features/apiSlice";
import { Box, CircularProgress } from "@mui/material";
import { useState } from "react";
import PokemonDetail from "./PokemonDetail";

const PokemonItem = ({ item }: { item: SinglePokemon }) => {
  const [open, setOpen] = useState(false);
  const [getPokemonByIdOrName, { data, error, isLoading }] =
    useLazyGetPokemonByNameOrIdQuery();

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
          backgroundColor: "#b43757",
          color: "#fff",
        }}
      >
        {" "}
        {error?.data}
      </Box>
    );
  }

  return (
    <>
      <Card
        onClick={() => {
          getPokemonByIdOrName({
            idOrName: item.name,
          });
          setOpen(true);
        }}
        sx={{ minWidth: 250, cursor: "pointer", background: "#cfe8fc" }}
      >
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Name
          </Typography>
          <Typography variant="h5" component="div">
            {item.name}
          </Typography>
        </CardContent>
      </Card>

      {data && <PokemonDetail open={open} setOpen={setOpen} data={data} />}
    </>
  );
};

export default PokemonItem;
