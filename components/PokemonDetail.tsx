import { PokemonByNameOrIdResult } from "@/types";
import {
  Backdrop,
  Box,
  Divider,
  Fade,
  List,
  ListItem,
  ListItemText,
  Modal,
  Typography,
} from "@mui/material";
import React from "react";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  border: "1px solid #000",
  borderRadius: "10px",

  boxShadow: 24,
  p: 4,
};

const PokemonDetail = ({
  open,
  setOpen,
  data,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
  data: PokemonByNameOrIdResult;
}) => {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={() => setOpen(false)}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Typography
            sx={{ ml: 2, flex: 1, color: "#000" }}
            variant="h6"
            component="div"
          >
            Name: {data?.name.toUpperCase()}
          </Typography>
          <List>
            <ListItem button>
              <ListItemText
                sx={{ color: "#000" }}
                primary=" ID"
                secondary={data?.id}
              />
              <ListItemText
                sx={{ color: "#000" }}
                primary="Base Experience"
                secondary={data?.base_experience}
              />
              <ListItemText
                sx={{ color: "#000" }}
                primary="Order"
                secondary={data?.order}
              />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemText
                sx={{ color: "#000" }}
                primary="Height"
                secondary={data?.height}
              />
              <ListItemText
                sx={{ color: "#000" }}
                primary="Weight"
                secondary={data?.weight}
              />
            </ListItem>
            <Divider />

            <ListItem
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
                color: "#000",
              }}
              button
            >
              <p>Ability: </p>
              {data.abilities.map((ability) => {
                return (
                  <ListItemText
                    sx={{ display: "flex", color: "#000" }}
                    secondary={ability.ability.name}
                  />
                );
              })}
            </ListItem>
            <Divider />

            <ListItem
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
                color: "#000",
              }}
              button
            >
              <p>Forms: </p>
              {data.forms.map((form) => {
                return (
                  <ListItemText
                    sx={{ display: "flex", color: "#000" }}
                    secondary={form.name}
                  />
                );
              })}
            </ListItem>
            <Divider />

            <ListItem
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
                color: "#000",
              }}
              button
            >
              <p>Types: </p>
              {data.types.map((type) => {
                return (
                  <ListItemText
                    sx={{ display: "flex", color: "#000" }}
                    secondary={type.type.name}
                  />
                );
              })}
            </ListItem>
            <Divider />

            <ListItem
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
                color: "#000",
              }}
              button
            >
              <p>Stats: </p>
              {data.stats.map((stat) => {
                return (
                  <ListItemText
                    sx={{ display: "flex", color: "#000" }}
                    secondary={stat.base_stat}
                  />
                );
              })}
            </ListItem>
            <Divider />
          </List>
        </Box>
      </Fade>
    </Modal>
  );
};

export default PokemonDetail;
