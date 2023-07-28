import { useLocalState } from "@/context";
import {
  AppBar,
  Button,
  CircularProgress,
  InputBase,
  Pagination,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { ChangeEvent, FormEvent, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import { useLazyGetPokemonByNameOrIdQuery } from "@/features/apiSlice";
import SearchedData from "./SearchedData";
import { useSnackbar } from "notistack";

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

const Navbar = ({ count }: { count: number | undefined }) => {
  const { enqueueSnackbar } = useSnackbar();

  const { handlePage, pageNum } = useLocalState();

  const [open, setOpen] = React.useState(false);

  const [searchValue, setSearchValue] = useState<string | number>(1);

  const [getPokemonByIdOrName, { data, error, isLoading, isSuccess, isError }] =
    useLazyGetPokemonByNameOrIdQuery();

  const handleSearch = () => {
    // remove spaces
    let value =
      typeof searchValue === "string"
        ? searchValue.replace(/\s/g, "").toLowerCase()
        : searchValue;
    getPokemonByIdOrName({
      idOrName: value,
    });

    handleClickOpen();
  };

  const handleClickOpen = () => {
    if (isSuccess) {
      setOpen(true);
      enqueueSnackbar("Search Complete", { variant: "success" });
    }
    if (isError) {
      enqueueSnackbar("No data found", { variant: "error" });
    }
  };

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

  const changePage = (_e: ChangeEvent<unknown>, page: number) => {
    handlePage(page);
  };

  return (
    <>
      <AppBar
        position="static"
        sx={{
          padding: "10px",
          display: "flex",
          flexWrap: "wrap",
          "@media (max-width: 425px)": {
            flexDirection: "column",
            gap: "10px",
            alignItems: "flex-start",
          },
        }}
      >
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
            count={count}
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
                onChange={(e) => {
                  setSearchValue(e.target.value);
                }}
              />
            </Search>

            <Button
              disabled={searchValue.toString().length < 1}
              onClick={handleSearch}
              variant="contained"
              color="success"
            >
              Search
            </Button>
          </Box>
        </Box>
      </AppBar>

      {data && <SearchedData open={open} setOpen={setOpen} data={data} />}
    </>
  );
};

export default Navbar;
