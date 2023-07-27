import { PokemonAbility } from "@/types";
import React from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const PokemonItem = ({ item }: { item: PokemonAbility }) => {
  return (
    <Card
      onClick={() => console.log(item)}
      sx={{ minWidth: 250, cursor: "pointer", background: "#cfe8fc" }}
    >
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Ability Name
        </Typography>
        <Typography variant="h5" component="div">
          {item.name}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PokemonItem;
