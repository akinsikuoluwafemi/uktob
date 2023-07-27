import { Pokemon } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2" }),
  endpoints: (builder) => ({
    getAllPokemon: builder.query<Pokemon, { offset: number; limit: number }>({
      query: ({ offset, limit }) => `/ability?offset=${offset}&limit=${limit}`,
    }),
  }),
});

export const { useGetAllPokemonQuery } = pokemonApi;
