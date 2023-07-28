import { Pokemon, SinglePokemon } from "@/types";
import { Box } from "@mui/system";
import React from "react";
import PokemonItem from "./PokemonItem";

const PokemonList = ({ data }: { data: Pokemon | undefined }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "10px",
        flexWrap: "wrap",
      }}
    >
      {data?.results.map((item: SinglePokemon) => (
        <PokemonItem item={item} />
      ))}
    </Box>
  );
};

export default PokemonList;
