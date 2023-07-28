import { Pokemon, PokemonByNameOrIdResult } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2" }),
  endpoints: (builder) => ({
    getAllPokemon: builder.query<Pokemon, { offset: number; limit: number }>({
      query: ({ offset, limit }) => `/pokemon?offset=${offset}&limit=${limit}`,
    }),

    getPokemonByNameOrId: builder.query<
      PokemonByNameOrIdResult,
      { idOrName: string | number }
    >({
      query: ({ idOrName }) => `/pokemon/${idOrName}/`,
    }),
  }),
});

export const { useGetAllPokemonQuery, useLazyGetPokemonByNameOrIdQuery } =
  pokemonApi;
