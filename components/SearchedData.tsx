import {
  AppBar,
  Box,
  Dialog,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Slide,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { TransitionProps } from "@mui/material/transitions";
import { PokemonByNameOrIdResult } from "@/types";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const SearchedData = ({
  open,
  setOpen,
  data,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
  data: PokemonByNameOrIdResult;
}) => {
  console.log(data);
  return (
    <Dialog
      fullScreen
      open={open}
      onClose={() => setOpen(false)}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => setOpen(false)}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Name: {data?.name.toUpperCase()}
          </Typography>
        </Toolbar>
      </AppBar>
      <List>
        <ListItem button>
          <ListItemText primary=" ID" secondary={data?.id} />
          <ListItemText
            primary="Base Experience"
            secondary={data?.base_experience}
          />
          <ListItemText primary="Order" secondary={data?.order} />
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemText primary="Height" secondary={data?.height} />
          <ListItemText primary="Weight" secondary={data?.weight} />
        </ListItem>
        <Divider />

        <ListItem
          sx={{ display: "flex", alignItems: "center", gap: "20px" }}
          button
        >
          <p>Ability: </p>
          {data.abilities.map((ability) => {
            return (
              <ListItemText
                sx={{ display: "flex" }}
                secondary={ability.ability.name}
              />
            );
          })}
        </ListItem>
        <Divider />

        <ListItem
          sx={{ display: "flex", alignItems: "center", gap: "20px" }}
          button
        >
          <p>Forms: </p>
          {data.forms.map((form) => {
            return (
              <ListItemText sx={{ display: "flex" }} secondary={form.name} />
            );
          })}
        </ListItem>
        <Divider />

        <ListItem
          sx={{ display: "flex", alignItems: "center", gap: "20px" }}
          button
        >
          <p>Types: </p>
          {data.types.map((type) => {
            return (
              <ListItemText
                sx={{ display: "flex" }}
                secondary={type.type.name}
              />
            );
          })}
        </ListItem>
        <Divider />

        <ListItem
          sx={{ display: "flex", alignItems: "center", gap: "20px" }}
          button
        >
          <p>Stats: </p>
          {data.stats.map((stat) => {
            return (
              <ListItemText
                sx={{ display: "flex" }}
                secondary={stat.base_stat}
              />
            );
          })}
        </ListItem>
        <Divider />
      </List>
    </Dialog>
  );
};

export default SearchedData;
